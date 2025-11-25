# 如何配置 Dune Query IDs

## 已整合的三大 Dashboard

我已经为你整合了以下三个顶级 Dune dashboards 的配置信息：

### 1️⃣ EIP-1559 / ETH Burned
**Dashboard**: https://dune.com/msilb7/EIP1559-Base-Fee-x-Tip-by-Block
**Dashboard**: https://ultrasound.money (数据由 Dune 支持)

**需要配置的查询**：
- `baseFeeHistory` - Base Fee 历史数据
- `burnedEthDaily` - 每日燃烧的 ETH
- `burnedEthTotal` - 总燃烧统计
- `priorityFeeStats` - Priority Fee 统计

### 2️⃣ Blob (EIP-4844) 分析
**Dashboard**: https://dune.com/glxyresearch_team/eip-4844-blobs
**Dashboard**: https://dune.com/0xRob/blobs
**Dashboard**: https://dune.com/ephema/eip-4844-the-impact-of-blobs

**需要配置的查询**：
- `dailyStats` - 每日 blob 统计
- `blobGasPrice` - Blob gas 价格
- `blobUsageByL2` - L2 使用情况
- `blobTransactions` - Blob 交易数

### 3️⃣ MEV-Boost 分析
**Dashboard**: https://dune.com/ChainsightAnalytics/mev-after-ethereum-merge
**Dashboard**: https://dune.com/CometShock/mev-boost-builder-stats
**Dashboard**: https://dune.com/lsquared/mev-boost-detailed

**已配置的查询** ✅：
- `builderStats`: **1279809** - Builder 统计（已可用）
- `builderLifetime`: **1298718** - Builder 终身统计（已可用）

**需要配置的查询**：
- `mevBoostStats` - MEV-Boost 每日统计
- `relayStats` - Relay 统计
- `searcherActivity` - Searcher 活动
- `mevTrends` - MEV 趋势

## 📖 如何获取 Query ID - 详细步骤

### 方法 1: 通过 Dashboard 获取（推荐）

1. **访问 Dashboard**
   ```
   例如：https://dune.com/glxyresearch_team/eip-4844-blobs
   ```

2. **浏览页面上的图表**
   - 找到你想要的数据图表（例如 "Daily Blob Count"）

3. **点击图表**
   - 在图表的右上角，你会看到几个图标
   - 点击 **"View Query"** 或 **"⋮"（三个点）→ "View Query"**

4. **获取 Query ID**
   - 浏览器会跳转到查询页面
   - URL 格式：`https://dune.com/queries/123456/xyz`
   - **123456** 就是 Query ID！

5. **复制 Query ID**
   - 把这个数字记下来

### 方法 2: 通过搜索获取

1. **访问 Dune 浏览页面**
   ```
   https://dune.com/browse/queries
   ```

2. **搜索关键词**
   - EIP-1559: 搜索 "base fee", "eth burned", "priority fee"
   - Blobs: 搜索 "blob", "EIP-4844", "blob gas"
   - MEV: 搜索 "MEV-Boost", "builder", "searcher"

3. **查看搜索结果**
   - 点击看起来相关的查询
   - 检查查询的数据质量和更新频率

4. **获取 Query ID**
   - 从 URL 中获取：`https://dune.com/queries/123456`

## 🔧 填写到配置文件

编辑文件：`src/utils/queryConfig.ts`

```typescript
export const DUNE_QUERIES = {
  eip1559: {
    baseFeeHistory: 123456,    // ← 在这里填入你找到的 Query ID
    burnedEthDaily: 234567,    // ← 在这里填入你找到的 Query ID
    burnedEthTotal: 345678,    // ← 在这里填入你找到的 Query ID
    priorityFeeStats: 456789,  // ← 在这里填入你找到的 Query ID
    feeMarketAnalysis: 567890, // ← 在这里填入你找到的 Query ID
  },

  blobs: {
    dailyStats: 111111,        // ← 在这里填入你找到的 Query ID
    blobGasPrice: 222222,      // ← 在这里填入你找到的 Query ID
    blobUsageByL2: 333333,     // ← 在这里填入你找到的 Query ID
    blobTransactions: 444444,  // ← 在这里填入你找到的 Query ID
  },

  mev: {
    mevBoostStats: 555555,     // ← 在这里填入你找到的 Query ID
    builderStats: 1279809,     // ✅ 已配置
    builderLifetime: 1298718,  // ✅ 已配置
    relayStats: 666666,        // ← 在这里填入你找到的 Query ID
    searcherActivity: 777777,  // ← 在这里填入你找到的 Query ID
    mevTrends: 888888,         // ← 在这里填入你找到的 Query ID
  },
};
```

## 💡 推荐的具体查询

基于这三个 dashboards，以下是一些推荐的查询名称（你需要在 dashboard 中找到它们）：

### EIP-1559 相关
- **"Base Fee by Block"** - 每个区块的 base fee
- **"ETH Burned Daily"** - 每日燃烧量
- **"Total ETH Burned"** - 总燃烧量
- **"Priority Fee Distribution"** - Priority fee 分布

### Blob 相关
- **"Blob Count Daily"** - 每日 blob 数量
- **"Blob Base Fee"** - Blob 基础费用
- **"Blobs by L2"** - 按 L2 分类的 blob 使用
- **"Blob Transaction Count"** - Blob 交易数量

### MEV 相关
- **"MEV-Boost Daily Stats"** - 每日 MEV-Boost 统计
- **"Builder Market Share"** - Builder 市场份额
- **"Relay Performance"** - Relay 性能
- **"Top Searchers"** - 顶级 Searcher
- **"MEV Trends"** - MEV 趋势分析

## ⚙️ 配置完成后

1. **重新构建项目**
   ```bash
   cd /Users/fengsheng_1/ethereum-rig-mcp
   npm run build
   ```

2. **重启 Claude Code**
   - 配置才会生效

3. **测试工具**
   在 Claude Code 中尝试：
   ```
   使用 get_builder_stats 工具查看最近 7 天的 builder 统计
   ```

## 🎯 优先级建议

如果你时间有限，建议按以下优先级配置：

**高优先级**（最有价值）：
1. ✅ `builderStats` - 已配置
2. ✅ `builderLifetime` - 已配置
3. `burnedEthTotal` - ETH 燃烧总量
4. `blobUsageByL2` - L2 blob 使用情况

**中优先级**（很有用）：
5. `mevBoostStats` - MEV-Boost 统计
6. `blobGasPrice` - Blob gas 价格
7. `baseFeeHistory` - Base fee 历史

**低优先级**（补充数据）：
8. 其他所有查询

## 🆘 遇到问题？

### 找不到合适的查询？
- 尝试 Fork 一个类似的查询并修改
- 在 Dune Discord 社区求助
- 使用 `custom_dune_query` 工具执行任意查询 ID

### 查询返回错误？
- 检查 Query ID 是否正确
- 确认查询是公开的（不是私有查询）
- 检查你的 Dune API key 是否有效

### 数据太旧？
- 找到更活跃维护的查询
- Fork 查询并自己更新
- 使用最近更新的 dashboard

## 📚 相关资源

- **Dune 文档**: https://dune.com/docs
- **Dune API 文档**: https://docs.dune.com/api-reference
- **Dune Discord**: https://discord.gg/dunecom
- **查询示例**: 查看项目中的 `QUERY_ID_EXAMPLES.md`
