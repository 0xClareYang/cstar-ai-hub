import { createInterface } from 'node:readline/promises';
import {
  confirmation, createRpc, inspectTransaction, LOCAL_CHAIN, LOCAL_URL,
  prepareLocal, sendLocal, SEPOLIA_CHAIN, SEPOLIA_URL,
} from './rpc.mjs';

async function main([command, hash, ...extra]) {
  if (command === 'local' && hash === undefined) {
    const rpc = createRpc(LOCAL_URL);
    const proposal = await prepareLocal(rpc);
    const fees = await rpc('eth_gasPrice');
    console.log(JSON.stringify({
      chainId: LOCAL_CHAIN,
      ...proposal,
      estimatedFeeWei: (BigInt(proposal.gas) * BigInt(fees)).toString(),
    }, null, 2));

    const prompt = createInterface({ input: process.stdin, output: process.stdout });
    let answer;
    try {
      answer = await prompt.question(`Review the local request. Type ${confirmation} to send: `);
    } finally {
      prompt.close();
    }
    const submitted = await sendLocal(rpc, proposal, answer);
    if (!submitted) {
      console.log('Cancelled. No transaction was sent.');
      return;
    }
    // Print the hash first so a read failure never encourages an automatic retry.
    console.log(`Submitted on the local node: ${submitted}`);
    console.log(JSON.stringify(await inspectTransaction(rpc, LOCAL_CHAIN, submitted), null, 2));
    return;
  }

  if ((command === 'local-receipt' || command === 'sepolia-receipt') && hash && !extra.length) {
    const isLocal = command === 'local-receipt';
    const url = isLocal ? new URL(LOCAL_URL) : new URL(process.env.SEPOLIA_RPC_URL || SEPOLIA_URL);
    if (!isLocal && url.protocol !== 'https:') throw new Error('Sepolia RPC must use HTTPS.');
    const chain = isLocal ? LOCAL_CHAIN : SEPOLIA_CHAIN;
    console.log(JSON.stringify(await inspectTransaction(createRpc(url), chain, hash), null, 2));
    return;
  }

  throw new Error('Usage: node demo.mjs local | local-receipt HASH | sepolia-receipt HASH');
}

try {
  await main(process.argv.slice(2));
} catch (error) {
  console.error(error instanceof TypeError ? 'Invalid RPC configuration or response.' : error.message);
  process.exitCode = 1;
}
