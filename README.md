# C-Star AI Hub | Agent Privacy Lab

[English](README.md) · [简体中文](README.zh-CN.md)

**Helping people stay in control as AI agents act.**

When an AI agent sends an email, shares a file, or calls an API, people need to know where their data goes, what they are approving, and how to verify what happened. C-Star AI Hub is an early-stage research and builder initiative exploring these questions through reproducible experiments, open technical resources, and collaboration with Chinese-speaking developers.

The research is independent of any one ecosystem. We choose technical settings based on what they let us observe and test.

[Project overview](deck/project-overview.en.md) · [Start here (中文)](START-HERE.md) · [Resources](resources/README.md) · [Events](events/README.md) · [Contribute](CONTRIBUTING.md)

## Completed

- **[Privacy Boundary Lab](initiatives/ai-ethereum-builder-commons/starter/privacy-lab.md)** compares two local Ethereum transactions in a simulated agent scenario. A synthetic note appears in the first transaction's calldata. The second omits it, and both inputs can be checked against the local node. Maintainers have run the experiment. The code, tests, and Chinese guide are public, and independent reproduction is pending. [English technical overview](initiatives/ai-ethereum-builder-commons/README.md)
- [AI Incident Relay](https://github.com/0xClareYang/ai-incident-relay) is a standalone fact-checking demo that records claims, sources, and evidence from AI responses.
- [Local AI privacy research outline](resources/local-ai-privacy-practical-guide-outline.md) outlines how to investigate where data goes in a local AI workflow.
- [AI × Midnight Builder Meetup Hangzhou](events/2026-08-22-ai-midnight-builder-meetup-hangzhou.md) documents the August 2026 community event organized by Clare Yang.

## How we work

**Data → Exposure → Authorization → Execution → Evidence.** For each experiment, we ask what data the task needs, what leaves the system, who approves what, what actually runs, and what evidence lets someone else check the result.

**Learn → Connect → Build → Open.** We study existing approaches, work with developers, test one concrete question, and publish what others can reproduce.

## Validation Pending

Our 90-day priority is to find out whether developers repeatedly encounter one data exposure problem that existing tools leave unresolved. We aim to interview **5–8 developers**, get **at least one independent reproduction**, and publish a round of improvements. Any tool prototype or small workshop depends on what we learn and who can support it. [Validation plan and milestones](initiatives/ai-ethereum-builder-commons/PILOT.md)

## Future Exploration

We plan to investigate data sent through everyday agent tool calls. Sentient's open agent tooling is a possible reference. Midnight's selective disclosure tools offer a separate question about proving eligibility while keeping underlying attributes private. These are research directions. [Research contexts and status](initiatives/ai-ethereum-builder-commons/PILOT.md#research-contexts)

## Get involved

Run the lab and share your tool versions, expected output, and any blockers. If you build agents or automation, a redacted example of a tool call that exposed more data than you intended can help inform the research. Use the [contribution guide](CONTRIBUTING.md) to report findings or propose fixes.

Contact [Clare Yang](https://github.com/0xClareYang) or find **C-Star AI Hub** on WeChat.

## License

Original documentation, research, and educational materials are available under [CC BY 4.0](licenses/CC-BY-4.0.txt), and original code under the [MIT License](licenses/MIT.txt). See [LICENSE.md](LICENSE.md) for terms covering media, personal information, and third-party materials.
