# Setup Guide / 快速设置指南

[English](#english) | [中文](#chinese)

---

<a name="english"></a>
## English

## Ethereum Dune MCP - Setup Guide

### Step 1: Configure Dune API Key

1. Visit https://dune.com/settings/api to get a free API key
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env` file and fill in your API key:
   ```
   DUNE_API_KEY=your_actual_api_key_here
   ```

### Step 2: Configure Dune Query IDs

This is **the most important step**! Without configuring Query IDs, tools won't return actual data.

#### How to Find Query IDs

1. Visit recommended Dune Dashboards (see below)
2. Click any chart
3. Click "View Query" or "Fork Query"
4. Get Query ID from browser address bar
   - Example: `https://dune.com/queries/12345` → Query ID is `12345`

#### Recommended Dune Dashboards

##### EIP-1559 Related
- **Ultra Sound Money**: https://dune.com/ultrasoundmoney
  - Look for: total burned ETH, burn rate, base fee, etc.
- **ETH Burned**: https://dune.com/hildobby/eth-burned
  - Look for: daily burned ETH, historical data

##### Blob (EIP-4844) Related
- **Blob Analysis**: https://dune.com/ethereum_study/blobs
  - Look for: blob count, blob gas price
- **L2 Blob Usage**: https://dune.com/cryptokoryo/blobs
  - Look for: usage by L2, blob transactions

##### MEV Related
- **MEV-Boost**: https://dune.com/ChainsightAnalytics/mev-boost
  - Look for: MEV rewards, block stats
- **MEV Overview**: https://dune.com/flashbots/mev-overview
  - Look for: historical MEV, trends
- **Builder Analytics**: https://dune.com/hildobby/ethereum-builders
  - Look for: builder market share, stats

#### Edit Configuration File

Open `src/utils/queryConfig.ts` and fill in the Query IDs you found:

```typescript
export const DUNE_QUERIES = {
  eip1559: {
    baseFeeHistory: 123456,      // Replace with actual query ID
    burnedEthDaily: 234567,      // Replace with actual query ID
    burnedEthTotal: 345678,      // Replace with actual query ID
    // ... other configurations
  },
  // ...
};
```

**Tip**: You don't need to configure all Query IDs at once, you can gradually add the features you need.

### Step 3: Rebuild

After each modification to `queryConfig.ts`, you need to rebuild:

```bash
npm run build
```

### Step 4: Configure Claude Desktop

#### Method 1: Direct Edit Configuration File (Recommended)

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

#### Method 2: Use Claude Desktop UI

1. Open Claude Desktop settings
2. Find MCP Servers configuration
3. Add new server:
   - **Name**: `ethereum-dune`
   - **Command**: `node`
   - **Args**: `["/absolute/path/to/ethereum-dune-mcp/dist/index.js"]`

### Step 5: Restart Claude Desktop

After configuration, restart Claude Desktop to activate the new MCP server.

## Verify Setup

In Claude Desktop, try:

```
Use the custom_dune_query tool to query data from ID 12345
```

If it returns a result (even an error or unconfigured prompt), the MCP server is working properly!

## FAQ

### Q: Tools Return "Query not configured"
A: This is normal! It means the MCP server is running fine, just the corresponding Query ID hasn't been configured yet. Follow the steps above to configure.

### Q: How to Know Which Query IDs Are Good?
A: Recommended approach:
1. Visit the well-known Dashboards listed above
2. Check chart data update time (choose recently updated ones)
3. Check data quality and completeness
4. After forking queries, you can adjust parameters yourself

### Q: Does Dune API Have Usage Limits?
A: Free tier has the following limitations:
- Monthly execution limit
- Query execution may be queued
- Recommend using cache to reduce API calls

### Q: Can I Use Others' Queries?
A: Absolutely! All public queries on Dune can be used. You can also:
- Fork others' queries to modify
- Create your own queries
- Use `custom_dune_query` tool to execute any query

## Next Steps

After configuration, you can:
1. Test various tools in Claude Desktop
2. Add more Query IDs as needed
3. Use `custom_dune_query` to explore more data
4. Create custom tools for frequently used queries

## Get Help

- View full documentation: `README.md`
- Dune Documentation: https://dune.com/docs
- MCP Documentation: https://modelcontextprotocol.io/

---

<a name="chinese"></a>
## 中文

## Ethereum Dune MCP - 快速设置指南

### 第一步：配置 Dune API Key

1. 访问 https://dune.com/settings/api 获取免费 API key
2. 复制 `.env.example` 为 `.env`：
   ```bash
   cp .env.example .env
   ```
3. 编辑 `.env` 文件，填入你的 API key：
   ```
   DUNE_API_KEY=your_actual_api_key_here
   ```

### 第二步：配置 Dune Query IDs

这是**最重要的一步**！如果不配置 Query IDs，工具将无法返回实际数据。

#### 如何找到 Query IDs

1. 访问推荐的 Dune Dashboard（见下方）
2. 点击任意图表
3. 点击 "View Query" 或 "Fork Query"
4. 从浏览器地址栏获取 Query ID
   - 例如：`https://dune.com/queries/12345` → Query ID 是 `12345`

#### 推荐的 Dune Dashboards

##### EIP-1559 相关
- **Ultra Sound Money**: https://dune.com/ultrasoundmoney
  - 寻找：total burned ETH, burn rate, base fee 等
- **ETH Burned**: https://dune.com/hildobby/eth-burned
  - 寻找：daily burned ETH, historical data

##### Blob (EIP-4844) 相关
- **Blob Analysis**: https://dune.com/ethereum_study/blobs
  - 寻找：blob count, blob gas price
- **L2 Blob Usage**: https://dune.com/cryptokoryo/blobs
  - 寻找：usage by L2, blob transactions

##### MEV 相关
- **MEV-Boost**: https://dune.com/ChainsightAnalytics/mev-boost
  - 寻找：MEV rewards, block stats
- **MEV Overview**: https://dune.com/flashbots/mev-overview
  - 寻找：historical MEV, trends
- **Builder Analytics**: https://dune.com/hildobby/ethereum-builders
  - 寻找：builder market share, stats

#### 编辑配置文件

打开 `src/utils/queryConfig.ts`，将找到的 Query IDs 填入对应位置：

```typescript
export const DUNE_QUERIES = {
  eip1559: {
    baseFeeHistory: 123456,      // 替换为实际的 query ID
    burnedEthDaily: 234567,      // 替换为实际的 query ID
    burnedEthTotal: 345678,      // 替换为实际的 query ID
    // ... 其他配置
  },
  // ...
};
```

**提示**: 你不需要一次性配置所有 Query IDs，可以逐步添加你需要的功能。

### 第三步：重新构建

每次修改 `queryConfig.ts` 后，都需要重新构建：

```bash
npm run build
```

### 第四步：配置 Claude Desktop

#### 方法 1: 直接编辑配置文件（推荐）

编辑 `~/Library/Application Support/Claude/claude_desktop_config.json`：

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

#### 方法 2: 使用 Claude Desktop UI

1. 打开 Claude Desktop 设置
2. 找到 MCP Servers 配置
3. 添加新服务器：
   - **Name**: `ethereum-dune`
   - **Command**: `node`
   - **Args**: `["/绝对路径/ethereum-dune-mcp/dist/index.js"]`

### 第五步：重启 Claude Desktop

配置完成后，重启 Claude Desktop 使新的 MCP 服务器生效。

## 验证设置

在 Claude Desktop 中，尝试：

```
使用 custom_dune_query 工具查询 ID 12345 的数据
```

如果返回结果（即使是错误或未配置提示），说明 MCP 服务器已正常工作！

## 常见问题

### Q: 工具返回 "Query not configured"
A: 这是正常的！说明 MCP 服务器运行正常，只是还没配置对应的 Query ID。按照上面的步骤配置即可。

### Q: 如何知道哪些 Query ID 是好的？
A: 推荐的方法：
1. 访问上面列出的知名 Dashboard
2. 查看图表的数据更新时间（选择最近更新的）
3. 检查数据质量和完整性
4. Fork 查询后可以自己调整参数

### Q: Dune API 有使用限制吗？
A: 免费版有以下限制：
- 每月有一定的执行次数限制
- 查询执行可能需要排队
- 建议使用缓存减少 API 调用

### Q: 可以使用别人的 Query 吗？
A: 完全可以！Dune 上的公开查询都可以使用。你也可以：
- Fork 别人的查询进行修改
- 创建自己的查询
- 使用 `custom_dune_query` 工具执行任意查询

## 下一步

配置完成后，你可以：
1. 在 Claude Desktop 中测试各个工具
2. 根据需要添加更多 Query IDs
3. 使用 `custom_dune_query` 探索更多数据
4. 为常用查询创建自定义工具

## 获取帮助

- 查看完整文档：`README.md`
- Dune 文档：https://dune.com/docs
- MCP 文档：https://modelcontextprotocol.io/
