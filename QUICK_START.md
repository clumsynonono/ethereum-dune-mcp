# Quick Start Guide / 快速开始指南

[English](#english) | [中文](#chinese)

---

<a name="english"></a>
## English

## Get Started in Just 5 Minutes

### Step 1: Configure Dune API Key (1 minute)

1. Get your API key: https://dune.com/settings/api (free registration)
2. Copy `.env.example` to `.env`
3. Fill in your API key:
   ```bash
   DUNE_API_KEY=your_api_key_here
   ```

### Step 2: Build the Project (1 minute)

```bash
cd /absolute/path/to/ethereum-dune-mcp
npm run build
```

### Step 3: Configure Claude Desktop (2 minutes)

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

### Step 4: Restart Claude Desktop (30 seconds)

Close and reopen Claude Desktop.

### Step 5: Test Pre-configured Tools (30 seconds)

Try in Claude Desktop:

```
Use the get_builder_stats tool to view MEV builder statistics for the past 7 days
```

Or:

```
Use the get_builder_lifetime_stats tool to view lifetime statistics for all builders
```

## ✅ Ready-to-Use Features

You can now use these two tools without any additional configuration:

1. **`get_builder_stats`** - View MEV builder market share and statistics
   - Data source: CometShock's MEV-Boost Builder Stats
   - Query ID: 1279809

2. **`get_builder_lifetime_stats`** - View builder lifetime statistics
   - Data source: MEV-Boost Builder Lifetime Stats
   - Query ID: 1298718

## 🎯 What's Next?

### Want More Features?

Check out `CONFIGURE_QUERIES.md` to learn how to add more queries:
- EIP-1559 data (base fee, burned ETH)
- Blob data (blob gas price, L2 usage)
- More MEV data (searcher activity, trends)

### Need Custom Queries?

Use the `custom_dune_query` tool to execute any Dune query:

```
Use the custom_dune_query tool with query_id 123456
```

## 📖 Full Documentation

- **README.md** - Complete feature documentation
- **CONFIGURE_QUERIES.md** - How to configure more queries (step-by-step tutorial)
- **SETUP_GUIDE.md** - Detailed setup instructions
- **QUERY_ID_EXAMPLES.md** - Query ID recommendations and SQL examples

## 🆘 Troubleshooting

### MCP Server Won't Start
- Check if `.env` file exists with a valid API key
- Ensure you've run `npm run build`
- Verify the path in `claude_desktop_config.json` is correct

### Tools Return "Query not configured"
This is normal! It means the tool needs a Query ID configured.
- For EIP-1559, Blob tools, configure according to `CONFIGURE_QUERIES.md`
- Or use the pre-configured `get_builder_stats` and `get_builder_lifetime_stats`

### API Call Failures
- Check if your Dune API key is valid
- Confirm your API quota has remaining calls
- Some queries may take time to execute, please wait

## 💡 Usage Tips

1. **Use Caching**: Data is automatically cached for 5 minutes to reduce API calls
2. **Start with Pre-configured Tools**: Test MEV builder tools first, then configure others
3. **Add Gradually**: No need to configure all queries at once, add as needed
4. **Explore Dune**: Visit recommended dashboards to discover more valuable data

## 🎉 Start Exploring Ethereum Data!

Once configured, you can easily access in Claude Desktop:
- Real-time MEV builder competition landscape
- Ethereum fee market dynamics
- Blob data availability usage
- On-chain MEV extraction trends

Enjoy!

---

<a name="chinese"></a>
## 中文

## 最快 5 分钟上手

### 第 1 步：填写 Dune API Key (1 分钟)

1. 获取 API key: https://dune.com/settings/api （免费注册）
2. 复制 `.env.example` 为 `.env`
3. 填入你的 API key：
   ```bash
   DUNE_API_KEY=你的密钥
   ```

### 第 2 步：构建项目 (1 分钟)

```bash
cd /绝对路径/ethereum-dune-mcp
npm run build
```

### 第 3 步：配置 Claude Desktop (2 分钟)

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

### 第 4 步：重启 Claude Desktop (30 秒)

关闭并重新打开 Claude Desktop。

### 第 5 步：测试已配置的工具 (30 秒)

在 Claude Desktop 中尝试：

```
使用 get_builder_stats 工具查看最近 7 天的 MEV builder 统计
```

或者：

```
使用 get_builder_lifetime_stats 工具查看所有 builder 的终身统计数据
```

## ✅ 已经可以使用的功能

你现在就可以使用以下两个工具（无需额外配置）：

1. **`get_builder_stats`** - 查看 MEV builder 的市场份额和统计
   - 数据来源：CometShock's MEV-Boost Builder Stats
   - Query ID: 1279809

2. **`get_builder_lifetime_stats`** - 查看 builder 的终身统计
   - 数据来源：MEV-Boost Builder Lifetime Stats
   - Query ID: 1298718

## 🎯 接下来做什么？

### 想要更多功能？

查看 `CONFIGURE_QUERIES.md` 文件，学习如何添加更多查询：
- EIP-1559 数据 (base fee, burned ETH)
- Blob 数据 (blob gas price, L2 usage)
- 更多 MEV 数据 (searcher activity, trends)

### 需要自定义查询？

使用 `custom_dune_query` 工具执行任意 Dune 查询：

```
使用 custom_dune_query 工具，query_id 为 123456
```

## 📖 完整文档

- **README.md** - 完整的功能说明和文档
- **CONFIGURE_QUERIES.md** - 如何配置更多查询（图文教程）
- **SETUP_GUIDE.md** - 详细的设置步骤
- **QUERY_ID_EXAMPLES.md** - Query ID 推荐和 SQL 示例

## 🆘 遇到问题？

### MCP 服务器无法启动
- 检查 `.env` 文件是否存在且包含有效的 API key
- 确保已运行 `npm run build`
- 查看配置文件中的路径是否正确

### 工具返回 "Query not configured"
这是正常的！说明这个工具还需要配置 Query ID。
- 对于 EIP-1559、Blob 等工具，需要按照 `CONFIGURE_QUERIES.md` 配置
- 或者直接使用已经配置好的 `get_builder_stats` 和 `get_builder_lifetime_stats`

### API 调用失败
- 检查 Dune API key 是否有效
- 确认你的 API 配额还有剩余
- 某些查询可能需要执行时间，请稍等片刻

## 💡 使用技巧

1. **善用缓存**：数据会自动缓存 5 分钟，减少 API 调用
2. **从已配置的开始**：先测试 MEV builder 工具，熟悉后再配置其他
3. **逐步添加**：不需要一次性配置所有查询，按需添加
4. **探索 Dune**：访问推荐的 dashboard，发现更多有价值的数据

## 🎉 开始探索以太坊数据吧！

配置完成后，你可以在 Claude Desktop 中轻松获取：
- 实时 MEV builder 竞争态势
- 以太坊费用市场动态
- Blob 数据可用性使用情况
- 链上 MEV 提取趋势

祝你使用愉快！
