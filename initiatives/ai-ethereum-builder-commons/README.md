# Ethereum Privacy Builders Lab

C-Star AI Hub's Ethereum initiative for Chinese-speaking developers building with AI. Its first module, [Privacy Boundary Lab](starter/privacy-lab.md), shows how an agent-style transaction proposal can expose an internal note in Ethereum calldata, and how to verify that a smaller payload removes it.

## Problem and why Ethereum

AI-assisted developers can generate transaction code before they know what it sends, who can read the data, or what the signer authorizes. The specific learning gap is a hypothesis to test with developers. Ethereum makes the boundary observable: the RPC receives a transaction request, and anyone with access to the chain can read the mined transaction input and receipt. The [Ethereum privacy roadmap](https://ethereum.org/roadmap/privacy/) covers private reads, private writes and private proving. This lab studies data minimization at the application layer. The [Ethereum privacy app guide](https://ethereum.org/latest/privacy-apps-on-ethereum) offers a separate path for cryptographic techniques.

## Why C-Star and who does what

- **Clare Yang — Project Lead & Ecosystem Development.** Owns strategy, ecosystem outreach, community operations, recruitment, content coordination and delivery. She organized the [August 2026 AI × Midnight Builder Meetup in Hangzhou](../../events/2026-08-22-ai-midnight-builder-meetup-hangzhou.md), an AI and privacy event. [GitHub](https://github.com/0xClareYang) · [LinkedIn](https://www.linkedin.com/in/clare-yang-084795293)
- **PC (P-ercona) — Technical Lead & Builder Support.** Proposed responsibilities include the technical demo, curriculum, code review and learner support. The public CKB study repository documents local devnet and RPC checks and a transfer exercise that verifies change, fees and Cell status. This shows experience documenting reproducible blockchain exercises. Ethereum privacy work and review of this lab will be evidenced separately. [GitHub](https://github.com/P-ercona) · [CKB builder notes](https://github.com/P-ercona/ckbuilder-notes)

## Technical approach and first milestone

The lab uses a deterministic agent scenario with synthetic input and a fresh local Anvil chain. Learners **observe** a raw note in mined calldata, **explain** the visibility and signing boundary, **improve** the payload by sending only an unrelated reference, and **verify** both transactions through JSON-RPC. The tool restricts the destination, value and payload shape and requires one explicit confirmation for the two local sends. The [transaction starter](starter/README.md) remains optional background on wallets and receipts.

| Status | Evidence or acceptance |
| --- | --- |
| **Completed** | The [lab guide](starter/privacy-lab.md), runnable code and automated checks. The local test must reproduce two successful transactions, confirm the note appears only in the baseline, and reject an unapproved or invalid request. |
| **In Progress** | First milestone acceptance. An external developer should install from the guide, reproduce both outputs, identify who can read each field, and explain residual risks. Record tool versions and fixes through a GitHub issue or PR. |
| **Proposed** | Observe a small learner cohort using the [pilot protocol](PILOT.md). Consider four workshops over 12 weeks only if independent reproduction, learner outcomes and facilitator capacity support it. |

## Public goods and limitations

The reusable materials are the Chinese exercise, test suite, exposure checklist and pilot protocol. The repository [license](../../LICENSE.md) applies. Use the [contribution guide](../../CONTRIBUTING.md) to report setup failures or propose improvements. The exercise can be run independently of a workshop.

Addresses, fees, timing and the opaque reference remain visible and linkable. The sample does not run an external AI service, model RPC privacy, protect the signer or implement private transactions or EIP-7702 delegation. External review and learner outcomes are pending.

For [ESP Office Hours](https://esp.ethereum.foundation/applicants/office-hours), we would welcome feedback on existing application-layer privacy exercises and on what evidence would make this lesson useful to other Ethereum educators.
