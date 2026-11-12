# Privacy Boundary Lab · 中文复现实验

本实验用固定脚本模拟 AI Agent 将一段内部备注误放进交易提案。你会预览并确认两笔 Anvil 本地零金额自转账，再读取回执和交易输入，验证删去备注后链上还能看到什么。脚本只连接本地 RPC，使用模拟数据和本地开发账户。

## Observe · 运行基线与改进版本

安装 Node.js 22+ 和 [Anvil](https://getfoundry.sh/introduction/installation/)。在一个终端启动全新的本地节点。不要使用 fork、现有钱包或公共网络。

```text
anvil --host 127.0.0.1 --port 8545 --chain-id 31337
```

在仓库根目录另开终端，无需安装 npm 包：

```text
cd initiatives/ai-ethereum-builder-commons/starter
node privacy-lab.mjs
```

先按 Enter 验证取消。再运行一次，核对发送者与接收者相同、金额为零、链 ID 为 31337，以及两段待发送数据。输入 `RUN LOCAL COMPARISON` 会批准两笔本地交易。本地节点用预置开发账户签名。

## Explain · 谁能看到什么

| 边界 | 在这个实验中的表现 |
| --- | --- |
| 应用 / Agent | 这里用固定脚本模拟。应用已接触内部备注。若真实系统把备注发给模型或写入日志，缩减 calldata 不会消除这些副本。 |
| RPC | 节点看到完整请求，包括 calldata。这里请求只发给本机；使用第三方 RPC 时，运营方也会看到请求。 |
| 链上观察者 | 有链访问权的人能读取交易输入。十六进制是编码。基线输入最后 28 字节可解码成 `DEMO_ONLY:private-agent-note`。 |
| 权限与签名 | 请求由应用提出，本地校验限定账号、零金额和数据格式。操作员确认后才交给 Anvil 签名。校验和人工确认是授权控制，不能改变已经提交的数据的可见性。 |

## Improve · 在构造交易时去掉备注

基线是 16 字节随机参考编号加上 28 字节的模拟备注。改进版只发送同一个参考编号。编号独立生成，与备注内容无关。编号、地址、费用和时间仍可能把两笔交易联系起来。已公开的基线数据不会因第二笔交易而消失。

## Verify · 检查实际落链的数据

命令输出两笔交易的哈希、回执状态、区块和从节点读回的 calldata。预期结果：

| 版本 | 回执状态 | calldata 字节数 | 是否包含模拟备注 |
| --- | --- | ---: | --- |
| baseline | success | 44 | 是 |
| minimized | success | 16 | 否 |

用输出中的任一哈希再次执行 `node demo.mjs local-receipt HASH`，独立检查 `data` 字段。遇到错误时先检查本地节点，避免在不清楚第一笔是否已被提交时盲目重跑。

用 `node --test starter.test.mjs` 运行测试。要运行真实 Anvil 集成测试，先设 `ANVIL_BIN` 为 Anvil 路径或 PATH 中的命令名，详见[交易入门的测试说明](README.md)。集成测试对比实际出块数据并验证取消不消耗 nonce。缺少 Anvil 时会明确跳过集成测试。

维护者复现环境：Windows、Node.js 24.22.1、Anvil 1.7.1。本实验尚待外部复现。

复核清单：能否找到原始备注、说明谁看得见、解释为何两笔仍可关联，以及指出确认动作在哪一步发生？验证范围是本地 RPC 与出块结果。它不覆盖公网上的传播、真实钱包界面、合约事件、模型供应商和生产环境权限隔离。

## Real-World Motivation

- [Binance 2026 年 10 月事件初步披露](https://www.binance.com/en/square/post/384336744180903)提醒开发者把工作站、内部工具和签名服务之间的信任边界纳入风险模型。
- [Sygnia 对 Bybit 2025 年事件的调查](https://www.sygnia.co/blog/sygnia-investigation-bybit-hack/)记录了签名者环境中的恶意 Safe 界面代码。签名前应核对实际载荷及来源，不能只依赖界面文字。
- [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)的签名授权可为外部账户设置代码委托。它与一次交易的人为批准、应用层 allow/deny 及 calldata 可见性是不同的边界。本实验不发送这种授权。

前两项是签名与基础设施安全案例。实验只比较应用主动写入的交易数据，未复现上述事件。

## 下一步探索

计划用模拟 Agent 生成的结构化交易提案做发送前检查，尝试指出哪些字段携带不必要的敏感信息。这项检查尚未实现。
