# Ethereum Dune MCP Server / 以太坊Dune MCP服务器

## Overview / 概述

**English:** A specialized MCP (Model Context Protocol) server designed for Ethereum research and analytics, focusing on EIP-1559, Blob transactions (EIP-4844), and MEV analysis powered by Dune Analytics.

**中文:** 专为以太坊研究社区设计的MCP（模型上下文协议）服务器，提供EIP-1559、Blob交易（EIP-4844）和MEV相关的数据分析工具，由Dune Analytics提供数据支持。

## 🚀 Quick Start / 快速开始

### Prerequisites / 环境要求
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Dune Analytics API Key** (获取方式见配置指南)

### Installation / 安装步骤

```bash
# Clone the repository / 克隆仓库
git clone https://github.com/clumsynonono/ethereum-dune-mcp.git
cd ethereum-dune-mcp

# Install dependencies / 安装依赖
npm install

# Configure environment / 配置环境
cp .env.example .env
# Edit .env file with your Dune API key / 编辑.env文件添加Dune API密钥

# Build the project / 构建项目
npm run build

# Start the server / 启动服务器
npm run dev
```

## 📊 Features / 功能特性

### EIP-1559 Analytics / EIP-1559 分析
**English:** Comprehensive analysis tools for EIP-1559 fee market dynamics

**中文:** 全面的EIP-1559费用市场动态分析工具

- **Base Fee History** / 基础费用历史 - Track historical base fee trends
- **ETH Burn Statistics** / ETH燃烧统计 - Monitor ETH burned through transaction fees
- **Priority Fee Analysis** / 优先费用分析 - Analyze priority fee patterns
- **Fee Market Analysis** / 费用市场分析 - Comprehensive gas price dynamics

### 🔵 Blob (EIP-4844) Analytics / Blob (EIP-4844) 分析
**English:** Specialized tools for analyzing blob transactions and Layer 2 adoption

**中文:** 专门用于分析Blob交易和Layer 2采用情况的工具

- **Blob Statistics** / Blob统计 - Track blob transaction count and trends
- **Blob Gas Price** / Blob Gas价格 - Monitor blob transaction gas costs
- **L2 Usage Analysis** / L2使用分析 - View Layer 2 blob adoption by protocol
- **Transaction Pattern Analysis** / 交易模式分析 - Analyze blob transaction patterns

### ⚡ MEV Analytics / MEV 分析
**English:** Advanced MEV extraction and builder performance analytics

**中文:** 高级MEV提取和构建者表现分析

- **MEV-Boost Statistics** / MEV-Boost统计 - Monitor MEV-Boost block building
- **Builder Statistics** / 构建者统计 - Analyze block builder market share
- **Relay Statistics** / 中继统计 - View MEV relay performance
- **Searcher Activity** / 搜索者活动 - Track MEV searcher profitability
- **MEV Trends** / MEV趋势 - Analyze historical MEV extraction trends

## 🔧 Configuration / 配置

### Dune API Setup / Dune API设置
**English:** Get your free Dune API key from: https://dune.com/settings/api

**中文:** 从以下地址获取免费的Dune API密钥：https://dune.com/settings/api

### Query Configuration / 查询配置
**English:** Configure query IDs in `src/utils/queryConfig.ts` for full functionality

**中文:** 在`src/utils/queryConfig.ts`中配置查询ID以获得完整功能

**✅ Good News / 好消息:** Top Dune dashboards have been integrated for you!

## 🛠️ Available Tools / 可用工具

| Tool Name | Chinese Name | Description | 描述 |
|-----------|--------------|-------------|------|
| `get_base_fee_history` | 基础费用历史 | Historical base fee data | 历史基础费用数据 |
| `get_burned_eth_stats` | ETH燃烧统计 | ETH burn statistics | ETH销毁统计 |
| `get_priority_fee_stats` | 优先费用统计 | Priority fee analysis | 优先费用分析 |
| `get_blob_stats` | Blob统计 | Blob transaction statistics | Blob交易统计 |
| `get_blob_gas_price` | Blob Gas价格 | Current blob gas prices | 当前Blob gas价格 |
| `get_blob_usage_by_l2` | L2 Blob使用 | L2 blob usage by protocol | 各协议的L2 Blob使用情况 |
| `get_mev_boost_stats` | MEV-Boost统计 | MEV-Boost adoption metrics | MEV-Boost采用指标 |
| `get_builder_stats` | 构建者统计 | Block builder performance | 区块构建者表现 |
| `get_relay_stats` | 中继统计 | MEV relay statistics | MEV中继统计 |
| `get_searcher_activity` | 搜索者活动 | Searcher behavior analysis | 搜索者行为分析 |
| `custom_dune_query` | 自定义Dune查询 | Execute custom Dune queries | 执行自定义Dune查询 |

## 📖 Documentation / 文档

### Available Documentation / 可用文档
- **[README_BILINGUAL](README_BILINGUAL.md)** - Complete bilingual documentation / 完整双语文档
- **[SETUP_GUIDE_BILINGUAL](SETUP_GUIDE_BILINGUAL.md)** - Detailed setup instructions / 详细设置指南
- **[CONFIGURE_QUERIES_BILINGUAL](CONFIGURE_QUERIES_BILINGUAL.md)** - Query configuration guide / 查询配置指南
- **[QUICK_START](QUICK_START.md)** - Quick start guide / 快速开始指南
- **[PROJECT_STATUS](PROJECT_STATUS.md)** - Project status / 项目状态

### Language Support / 语言支持
- **English** - Full documentation and API reference
- **中文** - 完整文档和API参考
- **Bilingual Examples** - 双语代码示例

## 🏗️ Architecture / 架构

### Core Components / 核心组件
**English:** Built with TypeScript and modern development practices

**中文:** 使用TypeScript和现代开发实践构建

- **MCP Server Core** / MCP服务器核心 - Protocol communication handler
- **Dune Client** / Dune客户端 - API integration with Dune Analytics
- **Caching Layer** / 缓存层 - Performance optimization with configurable TTL
- **Tool Registry** / 工具注册表 - Modular analytics tool management

### Data Flow / 数据流
```
User Request → MCP Server → Cache Check → Dune API → Data Processing → Bilingual Response
```

## 🛡️ Security / 安全

### Best Practices / 最佳实践
- **API Key Protection** / API密钥保护 - Never commit keys to version control
- **Environment Variables** / 环境变量 - Use .env for sensitive configuration
- **Rate Limiting** / 速率限制 - Built-in request throttling
- **Input Validation** / 输入验证 - Comprehensive parameter validation

## 🤝 Contributing / 贡献

### Development / 开发
```bash
# Development mode / 开发模式
npm run dev

# Run tests / 运行测试
npm test

# Build project / 构建项目
npm run build
```

### Contribution Guidelines / 贡献指南
**English:** We welcome contributions! Please see our documentation for guidelines.

**中文:** 我们欢迎贡献！请参阅我们的文档了解指南。

## 📞 Support / 支持

### Getting Help / 获取帮助
- **GitHub Issues** - Report bugs or request features / 报告错误或请求功能
- **Documentation** - Check our comprehensive guides / 查看我们的综合指南
- **Community** - Join the Ethereum research community / 加入以太坊研究社区

## 📄 License / 许可证

**English:** This project is licensed under the MIT License - see the LICENSE file for details.

**中文:** 本项目采用MIT许可证 - 详见LICENSE文件。

## 🔄 Repository Name Change / 仓库名称变更

**English:** This repository has been renamed from `ethereum-mcp` to `ethereum-dune-mcp` to better reflect its integration with Dune Analytics.

**中文:** 此仓库已从`ethereum-mcp`重命名为`ethereum-dune-mcp`，以更好地反映与Dune Analytics的集成。

---

**English:** *Last updated: November 2025 | For the latest updates, please check the documentation files.*

**中文:** *最后更新：2025年11月 | 如需最新更新，请查看文档文件。*

---

### 🔗 Quick Links / 快速链接
- **[English Documentation](./README_BILINGUAL.md)** - Complete English documentation
- **[中文文档](./README_BILINGUAL.md)** - 完整中文文档
- **[Setup Guide](./SETUP_GUIDE_BILINGUAL.md)** - Installation and configuration guide
- **[Query Configuration](./CONFIGURE_QUERIES_BILINGUAL.md)** - How to configure Dune queries