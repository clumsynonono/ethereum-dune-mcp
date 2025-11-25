# Ethereum Dune MCP Server / 以太坊Dune MCP服务器

> **📚 Documentation | 文档**: [English](./README_BILINGUAL_ENHANCED.md) | [中文文档](./README_BILINGUAL_ENHANCED.md) | [Setup Guide](./SETUP_GUIDE_BILINGUAL.md) | [查询配置](./CONFIGURE_QUERIES_BILINGUAL.md)

一个专为以太坊研究社区（RIG - Research and Implementation Group）设计的 MCP (Model Context Protocol) 服务器，提供 EIP-1559、Blob (EIP-4844) 和 MEV 相关的数据分析工具，由 Dune Analytics 提供数据支持。

**English:** A specialized MCP server designed for Ethereum research and analytics, focusing on EIP-1559, Blob transactions (EIP-4844), and MEV analysis powered by Dune Analytics.

## 功能特性

### 📊 EIP-1559 分析
- **Base Fee 历史**: 追踪以太坊基础费用变化
- **ETH 燃烧统计**: 查看通过 EIP-1559 燃烧的 ETH 总量
- **Priority Fee 统计**: 分析用户支付的优先费用
- **费用市场分析**: 全面了解当前 gas 价格动态

### 🔵 Blob (EIP-4844) 分析
- **Blob 统计**: 追踪 blob 交易数量和趋势
- **Blob Gas 价格**: 监控 blob 数据的成本
- **L2 使用分析**: 查看各个 Layer 2 的 blob 使用情况
- **交易模式分析**: 分析 blob 交易的模式

### ⚡ MEV 分析
- **MEV-Boost 统计**: 监控通过 MEV-Boost 的区块构建
- **Builder 统计**: 分析区块构建者的市场份额
- **Relay 统计**: 查看 MEV relay 的性能
- **Searcher 活动**: 追踪 MEV searcher 的盈利情况
- **MEV 趋势**: 分析历史 MEV 提取趋势

## 快速开始

### 1. 安装依赖

```bash
cd ethereum-rig-mcp
npm install
```

### 2. 配置 Dune API

创建 `.env` 文件并添加你的 Dune API key：

```bash
cp .env.example .env
# 编辑 .env 文件，填入你的 API key
```

获取免费的 Dune API key：https://dune.com/settings/api

### 3. 配置 Dune Query IDs（重要！）

**好消息**：已经为你整合了三大顶级 Dune dashboards！

#### ✅ 已配置的查询（可直接使用）

- **MEV Builder Stats** (Query ID: 1279809) - 可以直接使用 `get_builder_stats` 工具
- **MEV Builder Lifetime Stats** (Query ID: 1298718) - 可以直接使用 `get_builder_lifetime_stats` 工具

#### 📝 需要你配置的查询

编辑 `src/utils/queryConfig.ts` 文件，从以下 dashboards 获取更多 Query IDs：

**EIP-1559 Dashboards**：
- https://dune.com/msilb7/EIP1559-Base-Fee-x-Tip-by-Block
- https://ultrasound.money

**Blob Dashboards**：
- https://dune.com/glxyresearch_team/eip-4844-blobs
- https://dune.com/0xRob/blobs
- https://dune.com/ephema/eip-4844-the-impact-of-blobs

**MEV Dashboards**：
- https://dune.com/ChainsightAnalytics/mev-after-ethereum-merge
- https://dune.com/CometShock/mev-boost-builder-stats
- https://dune.com/lsquared/mev-boost-detailed

**详细配置教程**：查看 `CONFIGURE_QUERIES.md` 文件，有完整的图文步骤说明。

### 4. 构建项目

```bash
npm run build
```

### 5. 配置 Claude Code

在 Claude Code 的 MCP 设置中添加此服务器：

**方式 1: 编辑 `~/.claude.json`（推荐）**

```json
{
  "mcpServers": {
    "ethereum-rig": {
      "command": "node",
      "args": ["/Users/fengsheng_1/ethereum-rig-mcp/dist/index.js"]
    }
  }
}
```

**方式 2: 使用 Claude Code UI**

1. 打开 Claude Code 设置
2. 找到 MCP Servers 部分
3. 添加新服务器：
   - Name: `ethereum-rig`
   - Command: `node`
   - Args: `["/Users/fengsheng_1/ethereum-rig-mcp/dist/index.js"]`

### 6. 重启 Claude Code

配置完成后，重启 Claude Code 使配置生效。

## 使用示例

在 Claude Code 中，你可以这样使用工具：

```
获取最近7天的 base fee 历史
```

```
分析最近30天的 MEV 趋势
```

```
查看各个 L2 的 blob 使用情况
```

```
获取过去24小时燃烧的 ETH 数量
```

## 可用工具

### EIP-1559 工具
- `get_base_fee_history` - 获取 base fee 历史数据
- `get_burned_eth_stats` - 获取 ETH 燃烧统计
- `get_priority_fee_stats` - 获取 priority fee 统计
- `analyze_fee_market` - 分析当前费用市场

### Blob 工具
- `get_blob_stats` - 获取 blob 统计数据
- `get_blob_gas_price` - 获取 blob gas 价格
- `get_blob_usage_by_l2` - 获取各 L2 的 blob 使用情况
- `analyze_blob_transactions` - 分析 blob 交易模式

### MEV 工具
- `get_mev_boost_stats` - 获取 MEV-Boost 统计
- `get_builder_stats` - 获取 builder 统计 ✅ **已配置可用**
- `get_builder_lifetime_stats` - 获取 builder 终身统计 ✅ **已配置可用**
- `get_relay_stats` - 获取 relay 统计
- `get_searcher_activity` - 获取 searcher 活动
- `analyze_mev_trends` - 分析 MEV 趋势

### 自定义查询
- `custom_dune_query` - 执行自定义 Dune 查询

## 开发

### 运行开发模式

```bash
npm run dev
```

### 监听文件变化

```bash
npm run watch
```

### 项目结构

```
ethereum-rig-mcp/
├── src/
│   ├── index.ts              # MCP 服务器主入口
│   ├── types/
│   │   └── index.ts          # TypeScript 类型定义
│   ├── utils/
│   │   ├── duneClient.ts     # Dune API 客户端
│   │   ├── cache.ts          # 缓存管理
│   │   └── queryConfig.ts    # Query ID 配置
│   └── tools/
│       ├── eip1559Tools.ts   # EIP-1559 工具
│       ├── blobTools.ts      # Blob 工具
│       └── mevTools.ts       # MEV 工具
├── dist/                     # 编译输出目录
├── package.json
├── tsconfig.json
└── .env                      # 环境变量（不提交到 git）
```

## 缓存策略

为了优化性能和节省 Dune API 配额：
- 默认缓存时间：5 分钟
- 优先尝试获取最新缓存结果
- 如果缓存不可用，才执行新查询
- 支持自定义缓存时长

## 注意事项

1. **API 限制**: Dune 免费 API 有调用次数限制，建议合理使用缓存
2. **Query 配置**: 必须在 `queryConfig.ts` 中配置实际的 query ID 才能使用相应功能
3. **数据延迟**: Dune 数据可能有一定延迟，取决于具体查询
4. **错误处理**: 如果 query 未配置，工具会返回配置说明而不是错误

## 故障排除

### MCP 服务器无法启动

检查：
1. 是否安装了依赖：`npm install`
2. 是否构建了项目：`npm run build`
3. `.env` 文件是否存在且包含有效的 `DUNE_API_KEY`

### 工具返回 "Query not configured"

这是正常的！你需要：
1. 访问推荐的 Dune dashboard
2. 找到合适的查询
3. 在 `src/utils/queryConfig.ts` 中填入 query ID
4. 重新构建：`npm run build`

### Claude Code 找不到工具

1. 确认 `~/.claude.json` 中的路径正确
2. 重启 Claude Code
3. 检查 MCP 服务器是否正常运行

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 相关资源

- [Dune Analytics](https://dune.com/)
- [MCP Protocol](https://modelcontextprotocol.io/)
- [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)
- [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)
- [Flashbots](https://www.flashbots.net/)
