import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import test from 'node:test';
import {
  confirmation, createRpc, inspectTransaction, LOCAL_CHAIN, prepareLocal, sendLocal,
  SEPOLIA_CHAIN,
} from './rpc.mjs';

const account = '0x' + '1'.repeat(40);
const hash = '0x' + '2'.repeat(64);
const blockHash = '0x' + '3'.repeat(64);
const recipient = '0x' + '4'.repeat(40);

function fixture(overrides = {}) {
  const replies = {
    eth_chainId: LOCAL_CHAIN,
    eth_accounts: [account],
    eth_getCode: '0x',
    eth_sendTransaction: hash,
    ...overrides,
  };
  const calls = [];
  return { calls, rpc: async (method, params) => {
    assert.ok(Object.hasOwn(replies, method), `Unexpected call: ${method}`);
    calls.push([method, params]);
    return replies[method];
  } };
}

test('refusal and blank input make no RPC calls', async () => {
  const { rpc, calls } = fixture();
  for (const answer of ['', 'no', 'send local zero']) {
    assert.equal(await sendLocal(rpc, {}, answer), null);
  }
  assert.deepEqual(calls, []);
});

test('only a fresh, approved zero-value self-send reaches the node', async () => {
  const { rpc, calls } = fixture();
  const proposal = await prepareLocal(rpc);
  assert.ok(Object.isFrozen(proposal));
  assert.equal(await sendLocal(rpc, proposal, confirmation), hash);
  assert.deepEqual(calls.at(-1), ['eth_sendTransaction', [{
    from: account, to: account, value: '0x0', data: '0x', gas: '0x5208',
  }]]);
});

test('a modified recipient, value, or calldata is rejected before sending', async () => {
  const { rpc, calls } = fixture();
  const proposal = await prepareLocal(rpc);
  for (const change of [{ to: recipient }, { value: '0x1' }, { data: '0x12' }]) {
    await assert.rejects(sendLocal(rpc, { ...proposal, ...change }, confirmation), /changed/);
  }
  assert.equal(calls.some(([method]) => method === 'eth_sendTransaction'), false);
});

test('wrong chain, changed account, and executable test account block writes', async () => {
  const proposal = await prepareLocal(fixture().rpc);
  for (const overrides of [
    { eth_chainId: SEPOLIA_CHAIN }, { eth_chainId: '0x1' },
    { eth_accounts: [recipient] }, { eth_getCode: '0x6000' },
  ]) {
    const { rpc, calls } = fixture(overrides);
    await assert.rejects(sendLocal(rpc, proposal, confirmation), /network|changed|executable/);
    assert.equal(calls.some(([method]) => method === 'eth_sendTransaction'), false);
  }
});

test('Sepolia read path validates chain and hash and makes only read calls', async () => {
  const tx = { hash, blockHash, blockNumber: '0x1', from: account, to: recipient,
    value: '0x0', input: '0x', chainId: SEPOLIA_CHAIN };
  const receipt = { ...tx, transactionHash: hash, status: '0x1', gasUsed: '0x5208' };
  const { rpc, calls } = fixture({
    eth_chainId: SEPOLIA_CHAIN,
    eth_getTransactionReceipt: receipt,
    eth_getTransactionByHash: tx,
  });
  await assert.rejects(inspectTransaction(rpc, SEPOLIA_CHAIN, '0x123'), /32-byte/);
  assert.deepEqual(calls, []);
  assert.equal((await inspectTransaction(rpc, SEPOLIA_CHAIN, hash)).status, 'success');
  assert.deepEqual(calls.map(([method]) => method), [
    'eth_chainId', 'eth_getTransactionReceipt', 'eth_getTransactionByHash', 'eth_chainId',
  ]);
  await assert.rejects(inspectTransaction(fixture().rpc, SEPOLIA_CHAIN, hash), /Wrong network/);
});

test('missing receipts stay unknown and inconsistent evidence is rejected', async () => {
  const missing = fixture({ eth_getTransactionReceipt: null });
  assert.equal((await inspectTransaction(missing.rpc, LOCAL_CHAIN, hash)).status, 'pending-or-unknown');
  const mismatch = fixture({
    eth_getTransactionReceipt: { transactionHash: hash, blockHash },
    eth_getTransactionByHash: { hash, blockHash: '0x' + '0'.repeat(64) },
  });
  await assert.rejects(inspectTransaction(mismatch.rpc, LOCAL_CHAIN, hash), /do not agree/);
});

test('transport rejects RPC errors and disallows redirects', async () => {
  const rpc = createRpc('http://127.0.0.1:8545', async (_url, options) => {
    const request = JSON.parse(options.body);
    assert.equal(options.redirect, 'error');
    return Response.json({ jsonrpc: '2.0', id: request.id, error: { code: -32000 } });
  });
  await assert.rejects(rpc('eth_chainId'), /-32000/);
});

test('Anvil mines the approved self-send and reports a real local revert', {
  skip: !process.env.ANVIL_BIN && 'Set ANVIL_BIN to run the local integration test',
  timeout: 20000,
}, async (t) => {
  const node = spawn(process.env.ANVIL_BIN, ['--host', '127.0.0.1', '--port', '0',
    '--chain-id', '31337', '--accounts', '2'], { stdio: ['ignore', 'pipe', 'pipe'] });
  t.after(() => node.kill());
  node.stderr.resume();
  // Anvil's startup output contains throwaway keys. Extract only the listening port.
  const ready = new Promise((resolve, reject) => {
    let output = '';
    node.stdout.setEncoding('utf8');
    node.stdout.on('data', (chunk) => {
      output = (output + chunk).slice(-1024);
      const match = output.match(/Listening on 127\.0\.0\.1:(\d+)/);
      if (match) resolve(match[1]);
    });
    node.once('error', reject);
    node.once('exit', (code) => reject(new Error(`Anvil exited before startup (${code})`)));
  });
  const port = await Promise.race([ready, delay(8000, null, { ref: false })]);
  assert.ok(port, 'Anvil did not report a listening port');
  const rpc = createRpc(`http://127.0.0.1:${port}`);
  const proposal = await prepareLocal(rpc);
  const id = await sendLocal(rpc, proposal, confirmation);
  const result = await inspectTransaction(rpc, LOCAL_CHAIN, id);
  assert.equal(result.status, 'success');
  assert.equal(result.from.toLowerCase(), result.to.toLowerCase());
  assert.equal(result.valueWei, '0');
  assert.equal(result.data, '0x');
  assert.equal(result.gasUsed, 21000);

  // Test fixture only: install PUSH1 0 PUSH1 0 REVERT and invoke it with test gas.
  const [, target] = await rpc('eth_accounts');
  await rpc('anvil_setCode', [target, '0x60006000fd']);
  const failed = await rpc('eth_sendTransaction', [{ from: proposal.from, to: target,
    value: '0x0', gas: '0x10000' }]);
  assert.equal((await inspectTransaction(rpc, LOCAL_CHAIN, failed)).status, 'reverted');
});
