# Ethereum Dune MCP Server

[中文](#中文) | [English](#english)

## 中文

专为 RIG (Research Incentive Group) 研究设计的以太坊数据分析 MCP 服务器。

### 特点

- **49 个工具**: 覆盖 Blob、DEX、Staking、MEV、BuilderNet、L2 MEV 等核心指标
- **免费查询**: 所有预设工具只读取缓存，不消耗 API 额度
- **RIG 研究导向**: 支持经济安全性、去中心化、MEV 风险分析

### 快速开始

```bash
npm install && cp .env.example .env && npm run build
```

### 工具列表 (49个)

#### Blob 分析 (7个) - hildobby/blobs
| 工具 | Query ID | 用途 |
|------|----------|------|
| `blob_total_fees` | 4104427 | DA 费用/拥堵 |
| `blob_data_inflow` | 4077661 | L2 活跃度 |
| `blob_storage_size` | 4077761 | 累计存储 |
| `blob_chain_ratio` | 4780618 | 各链占比 |
| `blob_base_fee` | 3591214 | 4844 价格信号 |
| `blob_recent_24h` | 5072258 | 24h 监控 |
| `blob_fullness` | 5124588 | 填充效率 |

#### DEX 分析 (7个) - hagaetc/dex-metrics
| 工具 | Query ID | RIG 意义 |
|------|----------|----------|
| `dex_volume_24h` | 4234 | MEV 机会 |
| `dex_volume_7d` | 4235 | 收入趋势 |
| `dex_eth_share` | 21693 | 主网份额 |
| `dex_weekly_by_chain` | 2180075 | L2 迁移 |
| `dex_ranked` | 4319 | DEX MEV 贡献 |
| `dex_frontend_share` | 3364122 | 用户行为 |
| `dex_bot_usage` | 2687239 | Bot/MEV 风险 |

#### Staking 分析 (10个) - hildobby/eth2-staking
| 工具 | Query ID | RIG 意义 |
|------|----------|----------|
| `staking_eth_staked` | 1933035 | 经济安全性 |
| `staking_validators` | 1933036 | 去中心化 |
| `staking_by_entity` | 3383110 | HHI 集中度 |
| `staking_unstaked` | 2393992 | 赎回风险 |
| `staking_full_withdrawals` | 2394053 | 系统性撤退 |
| `staking_delta_week` | 1945604 | 短期变动 |
| `staking_delta_month` | 1945549 | 中期变动 |
| `staking_delta_6m` | 1945623 | 长期变动 |
| `staking_liquid` | 1941374 | LST 份额 |
| `staking_restaking` | 3548849 | Restaking 风险 |

#### Ethereum 指标 (7个)
| 工具 | Query ID | 用途 |
|------|----------|------|
| `eth_block_builders` | 5090511 | PBS/MEV 集中度 |
| `eth_gas_fees` | 3195150 | 拥堵分析 |
| `eth_median_gas` | 651463 | Gas 基准 |
| `eth_burned` | 3186349 | EIP-1559 |
| `eth_active_addresses` | 651474 | 需求侧 |
| `eth_tx_count` | 651398 | Blockspace 需求 |
| `eth_price` | 663019 | 价格 |

#### MEV Blocker (6个)
| 工具 | Query ID | RIG 意义 |
|------|----------|----------|
| `mev_total_rebates` | 2456432 | OFV 总量 |
| `mev_rebates_by_builder` | 2771596 | Builder 行为 |
| `mev_rebates_by_searcher` | 2771602 | Searcher 竞争 |
| `mev_wait_times` | 2441895 | OFA 效率 |
| `mev_volume_protected` | 2635139 | 保护量 |
| `mev_success_rate` | 2441649 | 成功率 |

#### BuilderNet (4个)
| 工具 | Query ID | RIG 意义 |
|------|----------|----------|
| `buildernet_stats` | 4341814 | Revenue/Bundles/Blocks |
| `buildernet_gas_refunds` | 4378423 | 补贴机制风险 |
| `buildernet_monthly_refunds` | 4378475 | 月度趋势 |
| `buildernet_operators` | 4258012 | Builder 集中度 |

#### L2 MEV (8个)
| 工具 | Query ID | RIG 意义 |
|------|----------|----------|
| `l2_atomic_arb_by_chain` | 3416651 | L2 MEV 规模 (1Y) |
| `l2_atomic_arb_trades` | 3416499 | MEV 活跃度 |
| `l2_atomic_arb_cumulative` | 3416882 | MEV 增长曲线 |
| `l2_atomic_arb_1m` | 3635408 | 近期热度 |
| `l2_sandwich_cumulative` | 3601907 | 用户损失 |
| `l2_sandwich_trades` | 3601836 | 各链保护差异 |
| `l2_base_mev_extracted` | 3688247 | Sequencer 收入 |
| `l2_base_mev_daily` | 4628919 | 每日利润 |

#### 工具函数 (3个)
| 工具 | 描述 |
|------|------|
| `custom_query` | [免费] 任意查询缓存 |
| `execute_query` | [消耗额度] 执行查询 |
| `list_queries` | 列出所有 ID |

### RIG 研究场景

#### 经济安全性
```
staking_eth_staked × eth_price = Security Budget
staking_by_entity → HHI = Σ(marketshare²)
```

#### MEV 风险
```
dex_volume_24h spike → MEV 机会上升
dex_bot_usage spike → meme coin craze
eth_block_builders → Builder 集中度
```

#### L2 迁移
```
dex_eth_share 下降 → L2 夺取执行需求
blob_data_inflow → 各 L2 真实 DA 需求
```

#### 赎回风险
```
staking_unstaked / staking_eth_staked > 0.5% → 高风险
staking_full_withdrawals → 系统性撤退信号
```

#### L2 MEV 分析
```
l2_atomic_arb_by_chain → 各 L2 MEV 规模对比
l2_sandwich_cumulative → 用户被夹损失
l2_base_mev_extracted → Base Sequencer 收入
```

### MCP 配置

```json
{
  "mcpServers": {
    "ethereum-dune": {
      "command": "node",
      "args": ["/path/to/ethereum-dune-mcp/dist/index.js"]
    }
  }
}
```

---

## English

Ethereum data analytics MCP server designed for RIG (Research Incentive Group) research.

### Features

- **49 tools**: Covering Blob, DEX, Staking, MEV, BuilderNet, L2 MEV and other core metrics
- **Free queries**: All preset tools only read cached results, no API credits consumed
- **RIG research-oriented**: Support for economic security, decentralization, and MEV risk analysis

### Quick Start

```bash
npm install && cp .env.example .env && npm run build
```

### Tool List (49 tools)

#### Blob Analytics (7) - hildobby/blobs
| Tool | Query ID | Purpose |
|------|----------|---------|
| `blob_total_fees` | 4104427 | DA cost/congestion |
| `blob_data_inflow` | 4077661 | L2 activity |
| `blob_storage_size` | 4077761 | Cumulative storage |
| `blob_chain_ratio` | 4780618 | Chain distribution |
| `blob_base_fee` | 3591214 | EIP-4844 price signal |
| `blob_recent_24h` | 5072258 | 24h monitoring |
| `blob_fullness` | 5124588 | Fill efficiency |

#### DEX Analytics (7) - hagaetc/dex-metrics
| Tool | Query ID | RIG Significance |
|------|----------|------------------|
| `dex_volume_24h` | 4234 | MEV opportunities |
| `dex_volume_7d` | 4235 | Revenue trends |
| `dex_eth_share` | 21693 | Mainnet share |
| `dex_weekly_by_chain` | 2180075 | L2 migration |
| `dex_ranked` | 4319 | DEX MEV contribution |
| `dex_frontend_share` | 3364122 | User behavior |
| `dex_bot_usage` | 2687239 | Bot/MEV risk |

#### Staking Analytics (10) - hildobby/eth2-staking
| Tool | Query ID | RIG Significance |
|------|----------|------------------|
| `staking_eth_staked` | 1933035 | Economic security |
| `staking_validators` | 1933036 | Decentralization |
| `staking_by_entity` | 3383110 | HHI concentration |
| `staking_unstaked` | 2393992 | Redemption risk |
| `staking_full_withdrawals` | 2394053 | Systemic withdrawal |
| `staking_delta_week` | 1945604 | Short-term change |
| `staking_delta_month` | 1945549 | Medium-term change |
| `staking_delta_6m` | 1945623 | Long-term change |
| `staking_liquid` | 1941374 | LST share |
| `staking_restaking` | 3548849 | Restaking risk |

#### Ethereum Metrics (7)
| Tool | Query ID | Purpose |
|------|----------|---------|
| `eth_block_builders` | 5090511 | PBS/MEV concentration |
| `eth_gas_fees` | 3195150 | Congestion analysis |
| `eth_median_gas` | 651463 | Gas baseline |
| `eth_burned` | 3186349 | EIP-1559 burn |
| `eth_active_addresses` | 651474 | Demand side |
| `eth_tx_count` | 651398 | Blockspace demand |
| `eth_price` | 663019 | Price |

#### MEV Blocker (6)
| Tool | Query ID | RIG Significance |
|------|----------|------------------|
| `mev_total_rebates` | 2456432 | OFV total |
| `mev_rebates_by_builder` | 2771596 | Builder behavior |
| `mev_rebates_by_searcher` | 2771602 | Searcher competition |
| `mev_wait_times` | 2441895 | OFA efficiency |
| `mev_volume_protected` | 2635139 | Protected volume |
| `mev_success_rate` | 2441649 | Success rate |

#### BuilderNet (4)
| Tool | Query ID | RIG Significance |
|------|----------|------------------|
| `buildernet_stats` | 4341814 | Revenue/Bundles/Blocks |
| `buildernet_gas_refunds` | 4378423 | Subsidy mechanism risk |
| `buildernet_monthly_refunds` | 4378475 | Monthly trends |
| `buildernet_operators` | 4258012 | Builder concentration |

#### L2 MEV (8)
| Tool | Query ID | RIG Significance |
|------|----------|------------------|
| `l2_atomic_arb_by_chain` | 3416651 | L2 MEV scale (1Y) |
| `l2_atomic_arb_trades` | 3416499 | MEV activity |
| `l2_atomic_arb_cumulative` | 3416882 | MEV growth curve |
| `l2_atomic_arb_1m` | 3635408 | Recent activity |
| `l2_sandwich_cumulative` | 3601907 | User losses |
| `l2_sandwich_trades` | 3601836 | Chain protection diff |
| `l2_base_mev_extracted` | 3688247 | Sequencer revenue |
| `l2_base_mev_daily` | 4628919 | Daily profit |

#### Utility Functions (3)
| Tool | Description |
|------|-------------|
| `custom_query` | [Free] Get any query cache |
| `execute_query` | [Costs credits] Execute query |
| `list_queries` | List all query IDs |

### RIG Research Scenarios

#### Economic Security
```
staking_eth_staked × eth_price = Security Budget
staking_by_entity → HHI = Σ(marketshare²)
```

#### MEV Risk
```
dex_volume_24h spike → MEV opportunities increase
dex_bot_usage spike → meme coin craze
eth_block_builders → Builder concentration
```

#### L2 Migration
```
dex_eth_share decline → L2 captures execution demand
blob_data_inflow → Real L2 DA demand
```

#### Redemption Risk
```
staking_unstaked / staking_eth_staked > 0.5% → High risk
staking_full_withdrawals → Systemic withdrawal signal
```

#### L2 MEV Analysis
```
l2_atomic_arb_by_chain → L2 MEV scale comparison
l2_sandwich_cumulative → User sandwich losses
l2_base_mev_extracted → Base Sequencer revenue
```

### MCP Configuration

```json
{
  "mcpServers": {
    "ethereum-dune": {
      "command": "node",
      "args": ["/path/to/ethereum-dune-mcp/dist/index.js"]
    }
  }
}
```

## License

MIT
