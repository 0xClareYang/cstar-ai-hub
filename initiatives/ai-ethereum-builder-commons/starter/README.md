# Ethereum 交易安全与验证入门

这个练习面向已经会用 AI 辅助写脚本、还没做过 Ethereum 应用的开发者。完成后，你应该能说明钱包批准了什么、交易哈希和回执有什么区别，以及如何发现网络或交易字段不符合预期。

## 安装与启动

需要 Node.js 22 或更新版本，以及 [Foundry 的 Anvil](https://getfoundry.sh/introduction/installation/)。从仓库根目录进入练习目录。脚本使用 Node.js 内置的 Fetch 和 JSON-RPC，无需 npm 安装。

```text
cd initiatives/ai-ethereum-builder-commons/starter
```

在另一个终端启动全新的本地开发链，保持运行。不要加 fork 参数，也不要将 RPC 暴露到局域网。Anvil 的预置账户和私钥只适用于本地练习，请勿导入常用钱包或在公共网络复用。

```text
anvil --host 127.0.0.1 --port 8545 --chain-id 31337
```

## 1. 先核对，再发送

```text
node demo.mjs local
```

先按 Enter 取消一次。重新运行，逐项检查预览：

| 字段 | 应该看到什么 |
| --- | --- |
| chainId | `0x7a69`，即本地链 31337 |
| from / to | 同一个本地测试账户 |
| value | `0x0`，转账金额为零 |
| data | `0x`，没有调用数据 |
| gas / estimatedFeeWei | `0x5208`（21,000 gas），以及按当时 gas 价格算出的估算费用。金额为零仍会消耗 gas。 |

确认后手动输入 `SEND LOCAL ZERO`。脚本重新检查网络、账户和请求字段，只允许把固定请求交给本地 Anvil。Anvil 用已解锁的开发账户签名、广播并在本地出块。公共测试网的正常做法是由钱包持有私钥，你在钱包界面核对网络、发送者、接收者、金额、数据和费用，再决定签名。AI 生成的描述或代码不具备授权效力。

## 2. 用回执核对结果

复制脚本打印的交易哈希，再单独查询。将 `HASH` 替换为完整哈希。

```text
node demo.mjs local-receipt HASH
```

- `success` 表示节点返回状态 `0x1`。检查哈希、区块、收发地址、金额和数据是否符合你的预期。
- `reverted` 表示状态 `0x0`。交易已经被打包，执行失败，仍可能消耗 gas。普通回执不会给出可靠的完整失败原因。
- `pending-or-unknown` 表示该节点没有返回回执。核对网络和哈希后稍后再查。已取得哈希时先查结果，避免因一次查询失败重复发送。

思考题：如果 AI 建议把收款人改成另一个地址，或者加入一串不认识的 calldata，应该在哪里停下来？为什么 `success` 仍不能说明交易达到了你想要的目的？

## 3. 复核一笔真实 Sepolia 交易

以下是已存在的公共测试网交易，仅用于查询。无需钱包、测试币或账户。预期网络为 `0xaa36a7`（11155111），区块为 12077005，状态为 `success`。留意这笔交易的金额为零，却带有调用数据。

```text
node demo.mjs sepolia-receipt 0x70fbadf5e835aba15381b4c7bfe45d15f876c700f544fdd0758a303efdc714c1
```

可用 [Sepolia 区块浏览器](https://sepolia.etherscan.io/tx/0x70fbadf5e835aba15381b4c7bfe45d15f876c700f544fdd0758a303efdc714c1) 交叉核对。公开 RPC 限流时，可将环境变量 `SEPOLIA_RPC_URL` 指向你信任的 HTTPS Sepolia RPC。命令会把查询的哈希发送给该服务。

进阶练习可在独立的 Sepolia 测试钱包手动发送零金额交易，再用同一命令检查自己的哈希。先确认链 ID 为 11155111，只用免费测试 ETH 支付 gas。默认练习与自动化测试都无需执行此步骤。

## 4. 运行测试并理解边界

```text
node --test starter.test.mjs
```

要同时运行真实本地节点集成测试，先把 `ANVIL_BIN` 设为已安装的 Anvil 可执行文件路径，或设为 PATH 中的命令名 `anvil`，再运行同一条命令。PowerShell 示例为 `$env:ANVIL_BIN = 'anvil'`，bash 示例为 `export ANVIL_BIN=anvil`。测试会启动独立的临时节点，验证零金额自转账成功和测试夹具的真实 EVM 回滚。未设置时，这项测试会明确跳过。

维护验证记录（2026-11-06，Windows）：Node.js 24.22.1 与 Anvil 1.7.1，8 项测试通过，包含本地节点集成测试。上方 Sepolia 示例已通过公开 RPC 查询。

练习信任本机 Anvil 和查询所用的 RPC，未做轻客户端证明或最终性验证。脚本不会解析任意合约调用，也不会托管密钥、授权代币或提供生产钱包防护。确认口令只约束这个命令的正常交互，不是对有终端控制权的程序的安全隔离。外部技术审查尚未完成。

参考资料：[Ethereum 交易中文文档](https://ethereum.org/zh/developers/docs/transactions/) · [JSON-RPC](https://ethereum.org/developers/docs/apis/json-rpc/) · [Sepolia 网络](https://ethereum.org/developers/docs/networks/#sepolia)
