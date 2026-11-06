import { randomBytes } from 'node:crypto';
import { createInterface } from 'node:readline/promises';
import { pathToFileURL } from 'node:url';
import { createRpc, inspectTransaction, LOCAL_CHAIN, LOCAL_URL, prepareLocal } from './rpc.mjs';

const marker = Buffer.from('DEMO_ONLY:private-agent-note').toString('hex');
export const APPROVAL = 'RUN LOCAL COMPARISON';

export async function plan(rpc) {
  const { from, to, value } = await prepareLocal(rpc);
  // An opaque exercise ID is independent of the note; it is not a hash of it.
  const reference = randomBytes(16).toString('hex');
  return Object.freeze({ from, to, value, baseline: '0x' + reference + marker,
    minimized: '0x' + reference });
}

export async function compare(rpc, reviewed, answer, onSubmitted = () => {}) {
  if (answer !== APPROVAL) return null;
  const evidence = {};
  for (const variant of ['baseline', 'minimized']) {
    const { from, to, value } = await prepareLocal(rpc);
    if (from !== reviewed.from || to !== reviewed.to || value !== reviewed.value) {
      throw new Error('Local account changed. Review the experiment again.');
    }
    const minimal = reviewed.minimized;
    const data = reviewed[variant];
    if (!/^0x[0-9a-f]{32}$/.test(minimal) || reviewed.baseline !== minimal + marker) {
      throw new Error('Only the fixed synthetic comparison payloads are allowed.');
    }
    const hash = await rpc('eth_sendTransaction', [{ from, to, value, data, gas: '0x10000' }]);
    onSubmitted(variant, hash);
    const observed = await inspectTransaction(rpc, LOCAL_CHAIN, hash);
    if (observed.status !== 'success' || observed.data !== data ||
        observed.from.toLowerCase() !== from.toLowerCase() ||
        observed.to.toLowerCase() !== to.toLowerCase() || observed.valueWei !== '0') {
      throw new Error(`Unexpected local result for ${variant}. Inspect ${hash}; do not retry blindly.`);
    }
    evidence[variant] = {
      ...observed,
      calldataBytes: (observed.data.length - 2) / 2,
      syntheticNoteVisible: observed.data.includes(marker),
    };
  }
  return evidence;
}

async function main() {
  const rpc = createRpc(LOCAL_URL);
  const reviewed = await plan(rpc);
  console.log(JSON.stringify({ chainId: LOCAL_CHAIN, ...reviewed }, null, 2));
  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  let answer;
  try {
    answer = await prompt.question(`Review both local payloads. Type ${APPROVAL} to send: `);
  } finally {
    prompt.close();
  }
  const evidence = await compare(rpc, reviewed, answer, (variant, hash) => {
    console.log(`Submitted locally (${variant}): ${hash}`);
  });
  console.log(evidence ? JSON.stringify(evidence, null, 2) : 'Cancelled. No transaction was sent.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    await main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
