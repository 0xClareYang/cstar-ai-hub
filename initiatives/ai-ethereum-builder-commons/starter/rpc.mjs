export const LOCAL_CHAIN = '0x7a69';
export const SEPOLIA_CHAIN = '0xaa36a7';
export const LOCAL_URL = 'http://127.0.0.1:8545';
export const SEPOLIA_URL = 'https://ethereum-sepolia-rpc.publicnode.com';

const address = /^0x[0-9a-f]{40}$/i;
const hashPattern = /^0x[0-9a-f]{64}$/i;

export function createRpc(url, fetchImpl = fetch) {
  let id = 0;
  return async (method, params = []) => {
    const requestId = ++id;
    let response;
    try {
      response = await fetchImpl(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: requestId, method, params }),
        redirect: 'error',
        signal: AbortSignal.timeout(12000),
      });
    } catch {
      throw new Error(`${method}: RPC connection failed or timed out`);
    }
    if (!response.ok) throw new Error(`${method}: HTTP ${response.status}`);
    const body = await response.json();
    if (body?.id !== requestId || body.jsonrpc !== '2.0') {
      throw new Error(`${method}: invalid JSON-RPC response`);
    }
    if (body.error || !Object.hasOwn(body, 'result')) {
      throw new Error(`${method}: RPC rejected the request (code ${Number(body.error?.code)})`);
    }
    return body.result;
  };
}

async function requireChain(rpc, expected) {
  if (await rpc('eth_chainId') !== expected) {
    throw new Error(`Wrong network. Expected chain ID ${expected}.`);
  }
}

export async function prepareLocal(rpc) {
  await requireChain(rpc, LOCAL_CHAIN);
  const [account] = await rpc('eth_accounts');
  if (!address.test(account)) throw new Error('No Anvil test account is available.');
  if (await rpc('eth_getCode', [account, 'latest']) !== '0x') {
    throw new Error('The test account has executable code. Start a fresh Anvil node.');
  }
  return Object.freeze({ from: account, to: account, value: '0x0', data: '0x', gas: '0x5208' });
}

export const confirmation = 'SEND LOCAL ZERO';

export async function sendLocal(rpc, proposal, answer) {
  if (answer !== confirmation) return null;
  const current = await prepareLocal(rpc);
  for (const key of Object.keys(current)) {
    if (current[key] !== proposal[key]) throw new Error('Reviewed proposal changed. Start again.');
  }
  // Construct the actual payload from the fixed policy, never from caller input.
  const hash = await rpc('eth_sendTransaction', [current]);
  if (!hashPattern.test(hash)) throw new Error('Node did not return a valid transaction hash.');
  return hash;
}

export async function inspectTransaction(rpc, chain, hash) {
  if (!hashPattern.test(hash)) throw new Error('Expected a 0x-prefixed 32-byte transaction hash.');
  const expectedHash = hash.toLowerCase();
  await requireChain(rpc, chain);
  const receipt = await rpc('eth_getTransactionReceipt', [expectedHash]);
  if (!receipt) return { status: 'pending-or-unknown', hash: expectedHash };

  const tx = await rpc('eth_getTransactionByHash', [expectedHash]);
  await requireChain(rpc, chain);
  if (!tx || !hashPattern.test(receipt.blockHash) || tx.blockHash !== receipt.blockHash ||
      tx.blockNumber !== receipt.blockNumber || tx.hash?.toLowerCase() !== expectedHash ||
      receipt.transactionHash?.toLowerCase() !== expectedHash ||
      tx.from?.toLowerCase() !== receipt.from?.toLowerCase() ||
      tx.to?.toLowerCase() !== receipt.to?.toLowerCase() ||
      (tx.chainId != null && tx.chainId !== chain)) {
    throw new Error('Transaction and receipt do not agree. Recheck the hash and RPC.');
  }
  if (receipt.status !== '0x0' && receipt.status !== '0x1') {
    throw new Error('Receipt has no recognized execution status.');
  }

  return {
    chainId: chain,
    hash: expectedHash,
    status: receipt.status === '0x1' ? 'success' : 'reverted',
    blockNumber: Number(BigInt(receipt.blockNumber)),
    blockHash: receipt.blockHash,
    from: tx.from,
    to: tx.to,
    valueWei: BigInt(tx.value).toString(),
    data: tx.input,
    gasUsed: Number(BigInt(receipt.gasUsed)),
  };
}
