# AI × Ethereum Builder Commons — Chinese-Speaking Pilot

**Status:** Phase 0 starter available · Learner validation and external technical review pending

**Lead:** Clare Yang, [C-Star AI Hub](../../README.md)

## Problem and evidence

This pilot is for Chinese-speaking builders who already use AI to write or debug small programs and have yet to build an Ethereum application. We want to find out whether a short exercise helps them review a transaction request, explain what a wallet authorizes, and verify what happened onchain before they build with smart contracts or agents.

The curriculum starts from existing work: [ethereum.org's Chinese transaction guide](https://ethereum.org/zh/developers/docs/transactions/) explains transaction fields, [WTF Solidity](https://github.com/AmazingAng/WTF-Solidity) teaches Solidity in Chinese, and [Speedrun Ethereum](https://speedrunethereum.com/) offers wallet labs and hands-on challenges. Our hypothesis is that some AI-assisted beginners still need a focused exercise connecting generated instructions, human approval, and receipt evidence. We will observe people using existing materials before deciding where a new lesson helps.

Clare organized the August 22, 2026 [AI × Midnight Builder Meetup in Hangzhou](../../events/2026-08-22-ai-midnight-builder-meetup-hangzhou.md), with estimated attendance of 30–40. This is evidence of organizing an AI and privacy event. Ethereum learning, project completion, and retention still need their own evidence.

## Phase 0 · A transaction learners can explain

Start with the [Chinese tutorial and runnable starter](starter/README.md). The code previews a zero-value self-send on a local Anvil development chain, requires explicit confirmation, and reads the resulting transaction and receipt. A separate read-only command inspects existing Sepolia transactions. Learners practice checking the network, sender, recipient, value, calldata, and receipt status. Ethereum's public transaction and receipt interfaces let another learner or educator reproduce those checks.

The first pilot is a single small session. The [pilot protocol](PILOT.md) covers recruitment, comparison with existing resources, acceptance criteria, follow-up, risks, and resource assumptions. The starter has automated tests. A named external technical reviewer and learner cohort are pending.

## Phase 1 · Conditional 12-week builder program

Expand only after the Phase 0 review and continuation criteria in the pilot protocol are met. The proposed four workshops would cover transaction verification, a small tested contract and app, human approval of an agent-proposed operation, and independent prototype reproduction. The public outputs would include reviewed Chinese modules, reusable code, and an aggregate report. Cohort and completion targets will be set from observed capacity and outcomes before scheduling.

## Ownership and maintenance

Clare owns recruitment, delivery, evidence collection, and publication. A technical collaborator (to be confirmed) would review exercises, reproduce the demo independently, and help teach. The starter uses Node.js with no package dependencies and a local Anvil node. Educators can reuse the tutorial, code and pilot protocol independently under the repository's [license](../../LICENSE.md) (CC BY 4.0 for original teaching materials and MIT for original code).

Keep setup problems and corrections in GitHub issues or pull requests using the [contribution guide](../../CONTRIBUTING.md). If facilitator capacity is unavailable, pause cohort delivery and keep the self-study material available. Publish known limitations and the last verified tool versions when updating the lesson.

## Feedback and contact

For [ESP Office Hours](https://esp.ethereum.foundation/applicants/office-hours), we would like feedback on the transaction review exercise, relevant Chinese-language resources and communities, and what evidence would justify a larger pilot. C-Star runs this independently.

Clare Yang · [GitHub](https://github.com/0xClareYang) · [X](https://x.com/0xClareYang)
