# C-Star AI Hub｜Agent Privacy Lab

**Helping people stay in control as AI agents act.**

当 AI 开始调用工具、代表人执行任务，隐私也关乎人能否决定哪些数据可以被使用、哪些操作可以被授权，以及事后能否核查结果。我们希望人们在使用这些能力时，仍能理解并控制自己的数据与行动。

C-Star AI Hub 是面向华语开发者的早期 Agent Privacy 研究与实践项目。我们从开源实验和开发者反馈出发，研究邮件、文件、API 和链上交易等操作中，人如何理解数据去向、授权具体行为并核查结果。我们根据问题选择技术与合作场景。

**[从这里开始](START-HERE.md) · [查看资源](resources/README.md) · [活动记录](events/README.md) · [参与贡献](CONTRIBUTING.md)**

## 已完成 · 公开产出

- **[Privacy Boundary Lab](initiatives/ai-ethereum-builder-commons/starter/privacy-lab.md)** 用模拟 Agent 场景和两笔本地 Ethereum 交易，比较数据最小化前后的交易输入。维护者已跑通，中文教程、代码和测试已公开，外部独立复现待完成。 [专项介绍](initiatives/ai-ethereum-builder-commons/README.md)
- [AI Incident Relay](https://github.com/0xClareYang/ai-incident-relay)：独立的事实核查演示，记录 AI 回答中的主张、来源和证据。
- [Local AI 隐私实践教程研究提纲](resources/local-ai-privacy-practical-guide-outline.md)
- [AI × Midnight Builder Meetup Hangzhou 活动记录](events/2026-08-22-ai-midnight-builder-meetup-hangzhou.md)

公开资料遵循个人隐私、第三方版权和授权边界。

## 我们如何工作

**Data → Exposure → Authorization → Execution → Evidence**

设计实验时，依次检查任务需要什么数据、哪些信息会外传、谁批准及批准范围、实际调用了什么，以及凭什么核查结果和剩余风险。这是我们设计和复核实验的方法。

**Learn → Connect → Build → Open**

理解真实问题和已有技术，联系开发者与研究人员，用可运行的实验验证一个问题，再公开可共享的成果和测试方法。

## 已经开始

C-Star AI Hub 已建立微信公众号，作为目前主要的公开内容与社区入口，并开始围绕 AI Builder、Privacy 与开放技术进行社区实践。

2026 年 8 月 22 日，Clare 在杭州发起并组织了 **AI × Midnight Builder Meetup Hangzhou**，围绕 AI × Privacy 与 Builder 实践进行了线下交流。

→ [查看活动记录](events/2026-08-22-ai-midnight-builder-meetup-hangzhou.md)

## 未来探索 · 不同技术场景

本地 Ethereum 实验提供了可检查的交易输入和回执。下一步优先调查常见工具调用中的数据外传，Sentient 的开放 Agent 工具可作为参考。Midnight 的选择性披露是较远的研究方向，例如验证资格时只公开判断所需的信息。各方向的状态和技术边界见试点文档。 [案例与资料](initiatives/ai-ethereum-builder-commons/PILOT.md#research-contexts)

## 验证阶段 · 接下来 90 天

先验证是否存在一个反复出现、现有工具仍未充分解决的 Agent 数据暴露问题。目标是访谈 5–8 位开发者，邀请至少 1 位外部开发者独立复现实验，并公开一轮改进。后续是否做工具调用检查或小型测试会，取决于实际需求、外部试用和技术负责人能否投入。产品使用与付费需求目前仍待验证。 [试点与验收标准](initiatives/ai-ethereum-builder-commons/PILOT.md)

## 参与

- 第一次来到项目：阅读 [Start Here](START-HERE.md)
- 想学习：查看 [资源方向](resources/README.md)
- 想了解实践：查看 [活动记录](events/README.md)
- 想参与改进：阅读 [贡献指南](CONTRIBUTING.md)

一次贡献不一定需要很大。

它可以只是修正一个错误、补充一个可靠来源、验证一段教程，或者把一次实践整理成别人也能使用的资料。

## License

- 文档、研究与教育内容：[CC BY 4.0](licenses/CC-BY-4.0.txt)
- 代码：[MIT License](licenses/MIT.txt)
- Logo、活动照片、录音录像、个人资料及第三方材料不自动适用上述开放许可

完整说明见 [LICENSE.md](LICENSE.md)。

## Contact

- 微信公众号：**C-Star AI Hub**
- Founder GitHub：<https://github.com/0xClareYang>
