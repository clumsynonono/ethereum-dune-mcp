# How to Configure Dune Query IDs / 如何配置 Dune Query IDs

[English](#english) | [中文](#chinese)

---

<a name="english"></a>
## English

## Integrated Top Dashboards

We've integrated configuration information from three top-tier Dune dashboards:

### 1️⃣ EIP-1559 / ETH Burned
**Dashboards**: 
- https://dune.com/msilb7/EIP1559-Base-Fee-x-Tip-by-Block
- https://ultrasound.money (powered by Dune)

**Queries to Configure**:
- `baseFeeHistory` - Base Fee historical data
- `burnedEthDaily` - Daily burned ETH
- `burnedEthTotal` - Total burn statistics
- `priorityFeeStats` - Priority Fee statistics

### 2️⃣ Blob (EIP-4844) Analysis
**Dashboards**: 
- https://dune.com/glxyresearch_team/eip-4844-blobs
- https://dune.com/0xRob/blobs
- https://dune.com/ephema/eip-4844-the-impact-of-blobs

**Queries to Configure**:
- `dailyStats` - Daily blob statistics
- `blobGasPrice` - Blob gas price
- `blobUsageByL2` - L2 usage
- `blobTransactions` - Blob transaction count

### 3️⃣ MEV-Boost Analysis
**Dashboards**: 
- https://dune.com/ChainsightAnalytics/mev-after-ethereum-merge
- https://dune.com/CometShock/mev-boost-builder-stats
- https://dune.com/lsquared/mev-boost-detailed

**Pre-configured Queries** ✅:
- `builderStats`: **1279809** - Builder statistics (ready to use)
- `builderLifetime`: **1298718** - Builder lifetime statistics (ready to use)

**Queries to Configure**:
- `mevBoostStats` - Daily MEV-Boost statistics
- `relayStats` - Relay statistics
- `searcherActivity` - Searcher activity
- `mevTrends` - MEV trends

## 📖 How to Get Query IDs - Detailed Steps

### Method 1: Through Dashboard (Recommended)

1. **Visit a Dashboard**
   ```
   Example: https://dune.com/glxyresearch_team/eip-4844-blobs
   ```

2. **Browse Charts on the Page**
   - Find the data chart you want (e.g., "Daily Blob Count")

3. **Click the Chart**
   - In the top-right corner of the chart, you'll see several icons
   - Click **"View Query"** or **"⋮" (three dots) → "View Query"**

4. **Get the Query ID**
   - Browser will navigate to the query page
   - URL format: `https://dune.com/queries/123456/xyz`
   - **123456** is the Query ID!

5. **Copy the Query ID**
   - Note down this number

### Method 2: Through Search

1. **Visit Dune Browse Page**
   ```
   https://dune.com/browse/queries
   ```

2. **Search Keywords**
   - EIP-1559: Search "base fee", "eth burned", "priority fee"
   - Blobs: Search "blob", "EIP-4844", "blob gas"
   - MEV: Search "MEV-Boost", "builder", "searcher"

3. **View Search Results**
   - Click on relevant-looking queries
   - Check query data quality and update frequency

4. **Get the Query ID**
   - From the URL: `https://dune.com/queries/123456`

## 🔧 Fill in the Configuration File

Edit file: `src/utils/queryConfig.ts`

```typescript
export const DUNE_QUERIES = {
  eip1559: {
    baseFeeHistory: 123456,    // ← Fill in your Query ID here
    burnedEthDaily: 234567,    // ← Fill in your Query ID here
    burnedEthTotal: 345678,    // ← Fill in your Query ID here
    priorityFeeStats: 456789,  // ← Fill in your Query ID here
    feeMarketAnalysis: 567890, // ← Fill in your Query ID here
  },

  blobs: {
    dailyStats: 111111,        // ← Fill in your Query ID here
    blobGasPrice: 222222,      // ← Fill in your Query ID here
    blobUsageByL2: 333333,     // ← Fill in your Query ID here
    blobTransactions: 444444,  // ← Fill in your Query ID here
  },

  mev: {
    mevBoostStats: 555555,     // ← Fill in your Query ID here
    builderStats: 1279809,     // ✅ Pre-configured
    builderLifetime: 1298718,  // ✅ Pre-configured
    relayStats: 666666,        // ← Fill in your Query ID here
    searcherActivity: 777777,  // ← Fill in your Query ID here
    mevTrends: 888888,         // ← Fill in your Query ID here
  },
};
```

## 💡 Recommended Specific Queries

Based on these three dashboards, here are some recommended query names (you need to find them in the dashboards):

### EIP-1559 Related
- **"Base Fee by Block"** - Base fee per block
- **"ETH Burned Daily"** - Daily burn amount
- **"Total ETH Burned"** - Total burned amount
- **"Priority Fee Distribution"** - Priority fee distribution

### Blob Related
- **"Blob Count Daily"** - Daily blob count
- **"Blob Base Fee"** - Blob base fee
- **"Blobs by L2"** - Blob usage by L2
- **"Blob Transaction Count"** - Blob transaction count

### MEV Related
- **"MEV-Boost Daily Stats"** - Daily MEV-Boost statistics
- **"Builder Market Share"** - Builder market share
- **"Relay Performance"** - Relay performance
- **"Top Searchers"** - Top searchers
- **"MEV Trends"** - MEV trend analysis

## ⚙️ After Configuration

1. **Rebuild the Project**
   ```bash
   cd /absolute/path/to/ethereum-dune-mcp
   npm run build
   ```

2. **Restart Claude Desktop**
   - Configuration will take effect

3. **Test Tools**
   Try in Claude Desktop:
   ```
   Use the get_builder_stats tool to view builder statistics for the past 7 days
   ```

## 🎯 Priority Recommendations

If time is limited, configure in this priority order:

**High Priority** (Most Valuable):
1. ✅ `builderStats` - Pre-configured
2. ✅ `builderLifetime` - Pre-configured
3. `burnedEthTotal` - Total ETH burned
4. `blobUsageByL2` - L2 blob usage

**Medium Priority** (Very Useful):
5. `mevBoostStats` - MEV-Boost statistics
6. `blobGasPrice` - Blob gas price
7. `baseFeeHistory` - Base fee history

**Low Priority** (Supplementary Data):
8. All other queries

## 🆘 Troubleshooting

### Can't Find Suitable Query?
- Try forking a similar query and modifying it
- Ask for help in Dune Discord community
- Use `custom_dune_query` tool to execute any query ID

### Query Returns Error?
- Check if Query ID is correct
- Confirm query is public (not private)
- Check if your Dune API key is valid

### Data Too Old?
- Find more actively maintained queries
- Fork the query and update it yourself
- Use recently updated dashboards

## 📚 Related Resources

- **Dune Documentation**: https://dune.com/docs
- **Dune API Documentation**: https://docs.dune.com/api-reference
- **Dune Discord**: https://discord.gg/dunecom
- **Query Examples**: See `QUERY_ID_EXAMPLES.md` in the project

---

<a name="chinese"></a>
## 中文

## 已整合的三大 Dashboard

我已经为你整合了以下三个顶级 Dune dashboards 的配置信息：

### 1️⃣ EIP-1559 / ETH Burned
**Dashboard**: 
- https://dune.com/msilb7/EIP1559-Base-Fee-x-Tip-by-Block
- https://ultrasound.money (数据由 Dune 支持)

**需要配置的查询**：
- `baseFeeHistory` - Base Fee 历史数据
- `burnedEthDaily` - 每日燃烧的 ETH
- `burnedEthTotal` - 总燃烧统计
- `priorityFeeStats` - Priority Fee 统计

### 2️⃣ Blob (EIP-4844) 分析
**Dashboard**: 
- https://dune.com/glxyresearch_team/eip-4844-blobs
- https://dune.com/0xRob/blobs
- https://dune.com/ephema/eip-4844-the-impact-of-blobs

**需要配置的查询**：
- `dailyStats` - 每日 blob 统计
- `blobGasPrice` - Blob gas 价格
- `blobUsageByL2` - L2 使用情况
- `blobTransactions` - Blob 交易数

### 3️⃣ MEV-Boost 分析
**Dashboard**: 
- https://dune.com/ChainsightAnalytics/mev-after-ethereum-merge
- https://dune.com/CometShock/mev-boost-builder-stats
- https://dune.com/lsquared/mev-boost-detailed

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
   cd /绝对路径/ethereum-dune-mcp
   npm run build
   ```

2. **重启 Claude Desktop**
   - 配置才会生效

3. **测试工具**
   在 Claude Desktop 中尝试：
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
