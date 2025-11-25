# Ethereum Dune MCP Server / 以太坊 Dune MCP 服务器

[English](#english) | [中文](#chinese)

---

<a name="english"></a>
## English

A Model Context Protocol (MCP) server designed for Ethereum data analytics, providing EIP-1559, Blob (EIP-4844), and MEV-related data analysis tools powered by Dune Analytics.

### Features

#### 📊 EIP-1559 Analysis
- **Base Fee History**: Track Ethereum base fee variations
- **ETH Burn Statistics**: View total ETH burned through EIP-1559
- **Priority Fee Statistics**: Analyze user-paid priority fees
- **Fee Market Analysis**: Comprehensive understanding of current gas price dynamics

#### 🔵 Blob (EIP-4844) Analysis
- **Blob Statistics**: Track blob transaction counts and trends
- **Blob Gas Price**: Monitor blob data costs
- **L2 Usage Analysis**: View blob usage by Layer 2 networks
- **Transaction Pattern Analysis**: Analyze blob transaction patterns

#### ⚡ MEV Analysis
- **MEV-Boost Statistics**: Monitor block building through MEV-Boost
- **Builder Statistics**: Analyze block builder market share
- **Relay Statistics**: View MEV relay performance
- **Searcher Activity**: Track MEV searcher profitability
- **MEV Trends**: Analyze historical MEV extraction trends

### Quick Start

#### 1. Install Dependencies

```bash
cd ethereum-dune-mcp
npm install
```

#### 2. Configure Dune API

Create a `.env` file and add your Dune API key:

```bash
cp .env.example .env
# Edit .env file and fill in your API key
```

Get a free Dune API key: https://dune.com/settings/api

#### 3. Configure Dune Query IDs (Important!)

**Good News**: Top Dune dashboards are already integrated!

##### ✅ Pre-configured Queries (Ready to Use)

- **MEV Builder Stats** (Query ID: 1279809) - Use with `get_builder_stats` tool
- **MEV Builder Lifetime Stats** (Query ID: 1298718) - Use with `get_builder_lifetime_stats` tool

##### 📝 Queries Requiring Configuration

Edit `src/utils/queryConfig.ts` to get more Query IDs from these dashboards:

**EIP-1559 Dashboards**:
- https://dune.com/msilb7/EIP1559-Base-Fee-x-Tip-by-Block
- https://ultrasound.money

**Blob Dashboards**:
- https://dune.com/glxyresearch_team/eip-4844-blobs
- https://dune.com/0xRob/blobs
- https://dune.com/ephema/eip-4844-the-impact-of-blobs

**MEV Dashboards**:
- https://dune.com/ChainsightAnalytics/mev-after-ethereum-merge
- https://dune.com/CometShock/mev-boost-builder-stats
- https://dune.com/lsquared/mev-boost-detailed

**Detailed Configuration Tutorial**: See `CONFIGURE_QUERIES.md` for complete step-by-step instructions.

#### 4. Build the Project

```bash
npm run build
```

#### 5. Configure Claude Desktop

Add this server to your Claude Desktop MCP settings:

**Method 1: Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (Recommended)**

```json
{
  "mcpServers": {
    "ethereum-dune": {
      "command": "node",
      "args": ["/absolute/path/to/ethereum-dune-mcp/dist/index.js"]
    }
  }
}
```

**Method 2: Use Claude Desktop UI**

1. Open Claude Desktop settings
2. Find the MCP Servers section
3. Add new server:
   - Name: `ethereum-dune`
   - Command: `node`
   - Args: `["/absolute/path/to/ethereum-dune-mcp/dist/index.js"]`

#### 6. Restart Claude Desktop

Restart Claude Desktop for the configuration to take effect.

### Usage Examples

In Claude Desktop, you can use the tools like this:

```
Get the base fee history for the past 7 days
```

```
Analyze MEV trends for the past 30 days
```

```
View blob usage by different L2s
```

```
Get the amount of ETH burned in the past 24 hours
```

### Available Tools

#### EIP-1559 Tools
- `get_base_fee_history` - Get base fee history
- `get_burned_eth_stats` - Get ETH burn statistics
- `get_priority_fee_stats` - Get priority fee statistics
- `analyze_fee_market` - Analyze current fee market

#### Blob Tools
- `get_blob_stats` - Get blob statistics
- `get_blob_gas_price` - Get blob gas price
- `get_blob_usage_by_l2` - Get blob usage by L2
- `analyze_blob_transactions` - Analyze blob transaction patterns

#### MEV Tools
- `get_mev_boost_stats` - Get MEV-Boost statistics
- `get_builder_stats` - Get builder statistics ✅ **Pre-configured**
- `get_builder_lifetime_stats` - Get builder lifetime statistics ✅ **Pre-configured**
- `get_relay_stats` - Get relay statistics
- `get_searcher_activity` - Get searcher activity
- `analyze_mev_trends` - Analyze MEV trends

#### Custom Queries
- `custom_dune_query` - Execute custom Dune queries

### Development

#### Run in Development Mode

```bash
npm run dev
```

#### Watch for File Changes

```bash
npm run watch
```

### Project Structure

```
ethereum-dune-mcp/
├── src/
│   ├── index.ts              # MCP server main entry
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   ├── utils/
│   │   ├── duneClient.ts     # Dune API client
│   │   ├── cache.ts          # Cache management
│   │   └── queryConfig.ts    # Query ID configuration
│   └── tools/
│       ├── eip1559Tools.ts   # EIP-1559 tools
│       ├── blobTools.ts      # Blob tools
│       └── mevTools.ts       # MEV tools
├── dist/                     # Compiled output directory
├── package.json
├── tsconfig.json
└── .env                      # Environment variables (not committed to git)
```

### Caching Strategy

To optimize performance and save Dune API quota:
- Default cache duration: 5 minutes
- Priority on retrieving latest cached results
- New queries only executed when cache unavailable
- Supports custom cache duration

### Important Notes

1. **API Limits**: Free Dune API has rate limits, use caching wisely
2. **Query Configuration**: Must configure actual query IDs in `queryConfig.ts` for functionality
3. **Data Latency**: Dune data may have some delay depending on the query
4. **Error Handling**: Tools return configuration instructions rather than errors when queries are not configured

### Troubleshooting

#### MCP Server Won't Start

Check:
1. Dependencies installed: `npm install`
2. Project built: `npm run build`
3. `.env` file exists with valid `DUNE_API_KEY`

#### Tools Return "Query not configured"

This is expected! You need to:
1. Visit recommended Dune dashboard
2. Find suitable query
3. Fill in query ID in `src/utils/queryConfig.ts`
4. Rebuild: `npm run build`

#### Claude Desktop Can't Find Tools

1. Confirm path in config file is correct
2. Restart Claude Desktop
3. Check if MCP server is running properly

### Contributing

Issues and Pull Requests are welcome!

### License

MIT License

### Related Resources

- [Dune Analytics](https://dune.com/)
- [MCP Protocol](https://modelcontextprotocol.io/)
- [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)
- [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)
- [Flashbots](https://www.flashbots.net/)

---

<a name="chinese"></a>
## 中文

一个专为以太坊数据分析设计的 MCP (Model Context Protocol) 服务器，提供 EIP-1559、Blob (EIP-4844) 和 MEV 相关的数据分析工具，由 Dune Analytics 提供数据支持。

### 功能特性

#### 📊 EIP-1559 分析
- **Base Fee 历史**: 追踪以太坊基础费用变化
- **ETH 燃烧统计**: 查看通过 EIP-1559 燃烧的 ETH 总量
- **Priority Fee 统计**: 分析用户支付的优先费用
- **费用市场分析**: 全面了解当前 gas 价格动态

#### 🔵 Blob (EIP-4844) 分析
- **Blob 统计**: 追踪 blob 交易数量和趋势
- **Blob Gas 价格**: 监控 blob 数据的成本
- **L2 使用分析**: 查看各个 Layer 2 的 blob 使用情况
- **交易模式分析**: 分析 blob 交易的模式

#### ⚡ MEV 分析
- **MEV-Boost 统计**: 监控通过 MEV-Boost 的区块构建
- **Builder 统计**: 分析区块构建者的市场份额
- **Relay 统计**: 查看 MEV relay 的性能
- **Searcher 活动**: 追踪 MEV searcher 的盈利情况
- **MEV 趋势**: 分析历史 MEV 提取趋势

### 快速开始

#### 1. 安装依赖

```bash
cd ethereum-dune-mcp
npm install
```

#### 2. 配置 Dune API

创建 `.env` 文件并添加你的 Dune API key：

```bash
cp .env.example .env
# 编辑 .env 文件，填入你的 API key
```

获取免费的 Dune API key：https://dune.com/settings/api

#### 3. 配置 Dune Query IDs（重要！）

**好消息**：已经为你整合了顶级 Dune dashboards！

##### ✅ 已配置的查询（可直接使用）

- **MEV Builder Stats** (Query ID: 1279809) - 可以直接使用 `get_builder_stats` 工具
- **MEV Builder Lifetime Stats** (Query ID: 1298718) - 可以直接使用 `get_builder_lifetime_stats` 工具

##### 📝 需要你配置的查询

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

#### 4. 构建项目

```bash
npm run build
```

#### 5. 配置 Claude Desktop

在 Claude Desktop 的 MCP 设置中添加此服务器：

**方式 1: 编辑 `~/Library/Application Support/Claude/claude_desktop_config.json`（推荐）**

```json
{
  "mcpServers": {
    "ethereum-dune": {
      "command": "node",
      "args": ["/绝对路径/ethereum-dune-mcp/dist/index.js"]
    }
  }
}
```

**方式 2: 使用 Claude Desktop UI**

1. 打开 Claude Desktop 设置
2. 找到 MCP Servers 部分
3. 添加新服务器：
   - Name: `ethereum-dune`
   - Command: `node`
   - Args: `["/绝对路径/ethereum-dune-mcp/dist/index.js"]`

#### 6. 重启 Claude Desktop

配置完成后，重启 Claude Desktop 使配置生效。

### 使用示例

在 Claude Desktop 中，你可以这样使用工具：

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

### 可用工具

#### EIP-1559 工具
- `get_base_fee_history` - 获取 base fee 历史数据
- `get_burned_eth_stats` - 获取 ETH 燃烧统计
- `get_priority_fee_stats` - 获取 priority fee 统计
- `analyze_fee_market` - 分析当前费用市场

#### Blob 工具
- `get_blob_stats` - 获取 blob 统计数据
- `get_blob_gas_price` - 获取 blob gas 价格
- `get_blob_usage_by_l2` - 获取各 L2 的 blob 使用情况
- `analyze_blob_transactions` - 分析 blob 交易模式

#### MEV 工具
- `get_mev_boost_stats` - 获取 MEV-Boost 统计
- `get_builder_stats` - 获取 builder 统计 ✅ **已配置可用**
- `get_builder_lifetime_stats` - 获取 builder 终身统计 ✅ **已配置可用**
- `get_relay_stats` - 获取 relay 统计
- `get_searcher_activity` - 获取 searcher 活动
- `analyze_mev_trends` - 分析 MEV 趋势

#### 自定义查询
- `custom_dune_query` - 执行自定义 Dune 查询

### 开发

#### 运行开发模式

```bash
npm run dev
```

#### 监听文件变化

```bash
npm run watch
```

### 项目结构

```
ethereum-dune-mcp/
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

### 缓存策略

为了优化性能和节省 Dune API 配额：
- 默认缓存时间：5 分钟
- 优先尝试获取最新缓存结果
- 如果缓存不可用，才执行新查询
- 支持自定义缓存时长

### 注意事项

1. **API 限制**: Dune 免费 API 有调用次数限制，建议合理使用缓存
2. **Query 配置**: 必须在 `queryConfig.ts` 中配置实际的 query ID 才能使用相应功能
3. **数据延迟**: Dune 数据可能有一定延迟，取决于具体查询
4. **错误处理**: 如果 query 未配置，工具会返回配置说明而不是错误

### 故障排除

#### MCP 服务器无法启动

检查：
1. 是否安装了依赖：`npm install`
2. 是否构建了项目：`npm run build`
3. `.env` 文件是否存在且包含有效的 `DUNE_API_KEY`

#### 工具返回 "Query not configured"

这是正常的！你需要：
1. 访问推荐的 Dune dashboard
2. 找到合适的查询
3. 在 `src/utils/queryConfig.ts` 中填入 query ID
4. 重新构建：`npm run build`

#### Claude Desktop 找不到工具

1. 确认配置文件中的路径正确
2. 重启 Claude Desktop
3. 检查 MCP 服务器是否正常运行

### 贡献

欢迎提交 Issue 和 Pull Request！

### 许可证

MIT License

### 相关资源

- [Dune Analytics](https://dune.com/)
- [MCP Protocol](https://modelcontextprotocol.io/)
- [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)
- [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)
- [Flashbots](https://www.flashbots.net/)
