# Dune Query ID 示例和推荐

## 如何使用本文档

本文档提供了一些优质的 Dune 查询示例。你可以：
1. 直接使用这里列出的 Query IDs（如果还有效）
2. 访问对应的 Dashboard 寻找更新的查询
3. Fork 这些查询并进行自定义

## EIP-1559 查询推荐

### Base Fee 相关

**查询**: Ethereum Base Fee Over Time
- **Dashboard**: Ultra Sound Money
- **链接**: https://dune.com/ultrasoundmoney
- **数据内容**: 区块高度、时间戳、base fee (Gwei)
- **更新频率**: 实时
- **示例字段**:
  ```
  block_number, timestamp, base_fee_gwei
  ```

**查询**: Base Fee Statistics
- **Dashboard**: Gas Tracker
- **链接**: https://dune.com/browse/dashboards
- **数据内容**: 平均 base fee、最大值、最小值、百分位数
- **适用场景**: 分析 base fee 波动性

### ETH Burned 相关

**查询**: Total ETH Burned
- **Dashboard**: Ultra Sound Money
- **链接**: https://dune.com/ultrasoundmoney
- **数据内容**: 累计燃烧的 ETH、燃烧率、通缩/通胀状态
- **更新频率**: 每个区块
- **关键指标**:
  - `total_burned`: 总燃烧量
  - `burn_rate_per_day`: 日燃烧率
  - `net_issuance`: 净发行量

**查询**: Daily ETH Burned
- **Dashboard**: ETH Burned
- **链接**: https://dune.com/hildobby/eth-burned
- **数据内容**: 每日燃烧量、趋势分析
- **适用场景**: 历史趋势分析

### Priority Fee 相关

**查询**: Priority Fee Distribution
- **Dashboard**: Gas Analytics
- **数据内容**: priority fee 分布、百分位数、中位数
- **适用场景**: 了解用户小费支付情况

## Blob (EIP-4844) 查询推荐

### Blob 基础统计

**查询**: Blob Transactions Daily
- **Dashboard**: Ethereum Blobs Study
- **链接**: https://dune.com/ethereum_study/blobs
- **数据内容**:
  - 每日 blob 交易数量
  - 每笔交易的平均 blob 数
  - 唯一发送者地址数
- **示例字段**:
  ```
  date, blob_count, tx_count, avg_blobs_per_tx
  ```

### Blob Gas Price

**查询**: Blob Gas Price Over Time
- **Dashboard**: Blob Analytics
- **链接**: https://dune.com/cryptokoryo/blobs
- **数据内容**:
  - blob gas price (wei)
  - excess blob gas
  - blob gas used
- **适用场景**: 追踪 blob 成本变化

### L2 Blob Usage

**查询**: Blob Usage by L2
- **Dashboard**: L2 Blob Comparison
- **数据内容**: 各 L2 的 blob 使用量（Arbitrum, Optimism, Base, zkSync 等）
- **示例字段**:
  ```
  l2_name, blob_count, percentage, avg_blobs_per_day
  ```

## MEV 查询推荐

### MEV-Boost 统计

**查询**: MEV-Boost Daily Stats
- **Dashboard**: MEV-Boost Analytics
- **链接**: https://dune.com/ChainsightAnalytics/mev-boost
- **数据内容**:
  - 每日 MEV 奖励总额
  - MEV-Boost 区块数量
  - MEV-Boost 采用率
- **示例字段**:
  ```
  date, mev_reward_eth, mev_blocks, total_blocks, adoption_rate
  ```

### Builder 统计

**查询**: Builder Market Share
- **Dashboard**: Ethereum Builders
- **链接**: https://dune.com/hildobby/ethereum-builders
- **数据内容**:
  - Builder 名称
  - 构建的区块数
  - 市场份额
  - 平均 MEV 每区块
- **示例字段**:
  ```
  builder_name, blocks_built, market_share_pct, avg_mev_per_block
  ```

**主要 Builders**:
- Flashbots
- BloXroute
- Beaver Build
- Titan Builder
- rsync Builder

### Relay 统计

**查询**: MEV Relay Performance
- **Dashboard**: MEV-Boost Relays
- **链接**: https://dune.com/flashbots/mev-boost-relays
- **数据内容**: Relay 使用率、延迟、可靠性

### Searcher Activity

**查询**: Top MEV Searchers
- **Dashboard**: MEV Overview
- **链接**: https://dune.com/flashbots/mev-overview
- **数据内容**:
  - Searcher 地址
  - 交易数量
  - 总利润
  - 成功率
- **策略类型**:
  - Arbitrage (套利)
  - Liquidation (清算)
  - Sandwich (三明治攻击)
  - JIT Liquidity (即时流动性)

## 使用建议

### 1. 查询优先级

推荐按以下顺序配置：

**高优先级**（核心数据）:
- Total ETH Burned
- Base Fee History
- MEV-Boost Stats
- Blob Daily Stats

**中优先级**（分析工具）:
- Builder Market Share
- Blob Usage by L2
- Priority Fee Distribution

**低优先级**（深度分析）:
- Searcher Activity
- Relay Stats
- Advanced Analytics

### 2. 查询参数

大多数查询支持以下参数：
- `days`: 查询天数（7, 30, 90 等）
- `start_date` / `end_date`: 时间范围
- `limit`: 结果数量限制

### 3. 数据新鲜度

- **实时数据** (~1 分钟延迟): Base Fee, Gas Price
- **近实时** (~10 分钟): ETH Burned, MEV-Boost
- **每小时更新**: Builder Stats, Relay Stats
- **每日更新**: 历史趋势分析

### 4. 自定义查询

如果找不到合适的查询，你可以：

1. **Fork 现有查询**:
   - 在 Dune 上找到相似查询
   - 点击 "Fork Query"
   - 修改 SQL 满足需求
   - 使用新的 Query ID

2. **创建新查询**:
   - 访问 https://dune.com/queries
   - 点击 "New Query"
   - 编写 SQL（可参考其他查询）
   - 保存并获取 Query ID

## 常用 SQL 模式

### 获取最近 N 天的数据

```sql
WHERE block_time >= NOW() - INTERVAL '{{days}}' day
```

### 按日期聚合

```sql
SELECT
  DATE_TRUNC('day', block_time) as date,
  COUNT(*) as count
FROM ethereum.transactions
GROUP BY 1
ORDER BY 1 DESC
```

### 计算百分比

```sql
SELECT
  builder_name,
  COUNT(*) * 100.0 / SUM(COUNT(*)) OVER () as market_share_pct
FROM mev_boost.blocks
GROUP BY 1
```

## 相关资源

- **Dune 文档**: https://dune.com/docs/
- **Dune SQL 参考**: https://dune.com/docs/query/
- **以太坊数据表**: https://dune.com/docs/data-tables/evm/ethereum/
- **Dune 社区**: https://discord.gg/dunecom

## 更新日志

本文档会随着新查询的发现而更新。建议定期检查是否有更好的查询可用。
