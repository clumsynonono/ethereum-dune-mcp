# Ethereum MCP Server / 以太坊MCP服务器

## Overview / 概述

**English:** A specialized MCP (Model Context Protocol) server designed for Ethereum research and analytics, focusing on EIP-1559, Blob transactions (EIP-4844), and MEV analysis powered by Dune Analytics.

**中文:** 专为以太坊研究社区设计的MCP（模型上下文协议）服务器，提供EIP-1559、Blob交易（EIP-4844）和MEV相关的数据分析工具，由Dune Analytics提供数据支持。

## Features / 功能特点

### EIP-1559 Analytics / EIP-1559分析
- **Base Fee History** / 基础费用历史 - Track historical base fee trends
- **Burned ETH Statistics** / ETH销毁统计 - Monitor ETH burned through transaction fees
- **Priority Fee Analysis** / 优先费用分析 - Analyze priority fee patterns and trends

### Blob Analytics / Blob分析
- **Blob Gas Price** / Blob gas价格 - Monitor blob transaction gas costs
- **L2 Blob Usage** / L2 Blob使用情况 - Analyze Layer 2 blob adoption
- **Blob Transaction Analysis** / Blob交易分析 - Deep dive into blob transaction patterns

### MEV Analytics / MEV分析
- **MEV Boost Statistics** / MEV Boost统计 - Track MEV-Boost adoption and performance
- **Builder Performance** / 构建者表现 - Analyze block builder statistics
- **Relay Analytics** / 中继分析 - Monitor MEV relay performance
- **Searcher Activity** / 搜索者活动 - Track searcher behavior and profitability

## Quick Start / 快速开始

### Prerequisites / 环境要求
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Dune Analytics API Key** (获取方式见配置指南)

### Installation / 安装步骤

```bash
# Clone the repository / 克隆仓库
git clone https://github.com/clumsynonono/ethereum-mcp.git
cd ethereum-mcp

# Install dependencies / 安装依赖
npm install

# Configure environment / 配置环境
cp .env.example .env
# Edit .env with your Dune API key / 编辑.env文件添加Dune API密钥

# Start the server / 启动服务器
npm run dev
```

### Configuration / 配置说明

1. **Dune API Setup / Dune API设置**
   - Visit [dune.com](https://dune.com) to create an account
   - Generate API key from settings
   - Add to `.env` file: `DUNE_API_KEY=your_api_key_here`

2. **Query Configuration / 查询配置**
   - Edit `src/utils/queryConfig.ts` to add custom query IDs
   - Follow `CONFIGURE_QUERIES.md` for detailed setup

## Usage Examples / 使用示例

### Basic Analytics / 基础分析
```typescript
// Get base fee history / 获取基础费用历史
const baseFeeData = await get_base_fee_history({
  days: 30,
  chain: "ethereum"
});

// Analyze MEV trends / 分析MEV趋势
const mevTrends = await analyze_mev_trends({
  timeframe: "7d",
  metric: "builder_profit"
});
```

### Custom Queries / 自定义查询
```typescript
// Execute custom Dune query / 执行自定义Dune查询
const customData = await custom_dune_query({
  query_id: 123456,
  parameters: {
    start_date: "2024-01-01",
    end_date: "2024-12-31"
  }
});
```

## Architecture / 架构设计

### Core Components / 核心组件
- **MCP Server Core** / MCP服务器核心 - Handles protocol communication
- **Dune Client** / Dune客户端 - Manages API interactions with Dune Analytics
- **Caching Layer** / 缓存层 - Improves performance with 5-minute TTL
- **Tool Registry** / 工具注册表 - Manages available analytics tools

### Data Flow / 数据流
```
User Request → MCP Server → Cache Check → Dune API → Data Processing → Response
```

## API Reference / API参考

### Available Tools / 可用工具

| Tool Name | Description | 描述 |
|-----------|-------------|------|
| `get_base_fee_history` | Historical base fee data | 历史基础费用数据 |
| `get_burned_eth_stats` | ETH burn statistics | ETH销毁统计 |
| `get_priority_fee_stats` | Priority fee analysis | 优先费用分析 |
| `get_blob_stats` | Blob transaction statistics | Blob交易统计 |
| `get_blob_gas_price` | Current blob gas prices | 当前Blob gas价格 |
| `get_blob_usage_by_l2` | L2 blob usage by protocol | 各协议的L2 Blob使用情况 |
| `analyze_blob_transactions` | Detailed blob analysis | Blob交易详细分析 |
| `get_mev_boost_stats` | MEV-Boost adoption metrics | MEV-Boost采用指标 |
| `get_builder_stats` | Block builder performance | 区块构建者表现 |
| `get_builder_lifetime_stats` | Builder historical data | 构建者历史数据 |
| `get_relay_stats` | MEV relay statistics | MEV中继统计 |
| `get_searcher_activity` | Searcher behavior analysis | 搜索者行为分析 |
| `analyze_mev_trends` | MEV trend analysis | MEV趋势分析 |
| `custom_dune_query` | Execute custom queries | 执行自定义查询 |

## Development / 开发指南

### Local Development / 本地开发
```bash
# Development mode with hot reload / 热重载开发模式
npm run dev

# Build for production / 生产环境构建
npm run build

# Run tests / 运行测试
npm test
```

### Adding New Tools / 添加新工具
1. Create tool file in `src/tools/`
2. Define tool schema and handler
3. Register in `src/index.ts`
4. Update documentation

## Configuration Files / 配置文件

### Environment Variables / 环境变量
```env
DUNE_API_KEY=your_dune_api_key_here
CACHE_TTL=300000  # Cache TTL in milliseconds / 缓存TTL（毫秒）
LOG_LEVEL=info    # Logging level / 日志级别
```

### Query Configuration / 查询配置
Edit `src/utils/queryConfig.ts` to add custom query mappings:
```typescript
export const QUERY_CONFIG = {
  custom_analysis: {
    query_id: 123456,
    description: "Custom analytics query",
    parameters: ["start_date", "end_date"]
  }
};
```

## Troubleshooting / 故障排除

### Common Issues / 常见问题

**English:** API Rate Limits - Dune Analytics has rate limits. The server implements caching to minimize API calls.

**中文:** API速率限制 - Dune Analytics有速率限制。服务器实现了缓存机制以最小化API调用。

**English:** Query Timeout - Large queries may timeout. Consider reducing date ranges or optimizing queries.

**中文:** 查询超时 - 大型查询可能超时。考虑减少日期范围或优化查询。

**English:** Invalid Query IDs - Ensure query IDs in configuration are valid and publicly accessible.

**中文:** 无效查询ID - 确保配置中的查询ID有效且可公开访问。

## Contributing / 贡献指南

### Development Setup / 开发设置
1. Fork the repository / 分叉仓库
2. Create feature branch / 创建功能分支
3. Make changes / 进行更改
4. Add tests / 添加测试
5. Submit pull request / 提交拉取请求

### Code Standards / 代码标准
- Follow TypeScript best practices / 遵循TypeScript最佳实践
- Add comprehensive tests / 添加全面测试
- Update documentation / 更新文档
- Follow conventional commits / 遵循约定式提交

## License / 许可证

**English:** This project is licensed under the MIT License. See LICENSE file for details.

**中文:** 本项目采用MIT许可证。详见LICENSE文件。

## Support / 支持

**English:** For support, please open an issue on GitHub or contact the maintainers.

**中文:** 如需支持，请在GitHub上提交问题或联系维护者。

## Roadmap / 路线图

### Planned Features / 计划功能
- **Multi-chain support** / 多链支持 - Support for Layer 2 networks
- **Real-time analytics** / 实时分析 - WebSocket integration for live data
- **Advanced visualization** / 高级可视化 - Built-in chart generation
- **Export capabilities** / 导出功能 - CSV, JSON, Excel exports

### Community Contributions / 社区贡献
- **Additional tool suggestions** / 额外工具建议 - Propose new analytics tools
- **Performance improvements** / 性能改进 - Optimize query execution
- **Documentation translations** / 文档翻译 - Help translate to more languages

---

*Last updated / 最后更新: November 2025*