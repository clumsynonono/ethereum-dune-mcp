# Ethereum MCP Server Setup Guide / 以太坊MCP服务器设置指南

## Prerequisites / 环境要求

### System Requirements / 系统要求
**English:** Before you begin, ensure you have the following installed on your system:

**中文:** 开始之前，请确保您的系统已安装以下组件：

- **Node.js** (version 16.0 or higher / 版本16.0或更高)
- **npm** (comes with Node.js / 随Node.js一起安装) or **yarn**
- **Git** (for cloning the repository / 用于克隆仓库)
- **Text Editor** (VS Code recommended / 推荐使用VS Code)

### Verify Installation / 验证安装

```bash
# Check Node.js version / 检查Node.js版本
node --version

# Check npm version / 检查npm版本
npm --version

# Check Git version / 检查Git版本
git --version
```

## Installation Steps / 安装步骤

### Step 1: Clone Repository / 步骤1：克隆仓库

**English:** Clone the ethereum-mcp repository to your local machine:

**中文:** 将ethereum-mcp仓库克隆到您的本地计算机：

```bash
git clone https://github.com/clumsynonono/ethereum-mcp.git
cd ethereum-mcp
```

### Step 2: Install Dependencies / 步骤2：安装依赖

**English:** Install all required dependencies:

**中文:** 安装所有必需的依赖项：

```bash
npm install
```

**English:** If you encounter permission issues, try:

**中文:** 如果遇到权限问题，请尝试：

```bash
sudo npm install
```

### Step 3: Environment Configuration / 步骤3：环境配置

**English:** Copy the example environment file:

**中文:** 复制示例环境文件：

```bash
cp .env.example .env
```

**English:** Edit the `.env` file with your configuration:

**中文:** 使用您的配置编辑`.env`文件：

```env
# Dune Analytics API Configuration / Dune Analytics API配置
DUNE_API_KEY=your_dune_api_key_here

# Cache Configuration / 缓存配置
CACHE_TTL=300000  # 5 minutes in milliseconds / 5分钟（毫秒）

# Logging Configuration / 日志配置
LOG_LEVEL=info    # Options: error, warn, info, debug / 选项：error, warn, info, debug

# Server Configuration / 服务器配置
PORT=3000         # Server port / 服务器端口
```

## Dune Analytics Setup / Dune Analytics设置

### Create Dune Account / 创建Dune账户

**English:** 1. Visit [dune.com](https://dune.com) and create a free account

**中文:** 1. 访问[dune.com](https://dune.com)并创建免费账户

**English:** 2. Verify your email address

**中文:** 2. 验证您的电子邮件地址

**English:** 3. Complete your profile setup

**中文:** 3. 完成个人资料设置

### Generate API Key / 生成API密钥

**English:** 1. Go to Settings → API

**中文:** 1. 前往设置 → API

**English:** 2. Click "Create API Key"

**中文:** 2. 点击"创建API密钥"

**English:** 3. Give your key a descriptive name (e.g., "Ethereum MCP Server")

**中文:** 3. 为您的密钥指定一个描述性名称（例如，"以太坊MCP服务器"）

**English:** 4. Copy the generated API key immediately (you won't see it again)

**中文:** 4. 立即复制生成的API密钥（您将无法再次看到它）

**English:** 5. Add the API key to your `.env` file

**中文:** 5. 将API密钥添加到您的`.env`文件中

## Query Configuration / 查询配置

### Understanding Query IDs / 了解查询ID

**English:** The server uses Dune Analytics query IDs to fetch data. You need to configure these IDs in the query configuration file.

**中文:** 服务器使用Dune Analytics查询ID来获取数据。您需要在查询配置文件中配置这些ID。

### Configure Query IDs / 配置查询ID

**English:** Edit `src/utils/queryConfig.ts`:

**中文:** 编辑`src/utils/queryConfig.ts`：

```typescript
export const QUERY_CONFIG = {
  // EIP-1559 Queries / EIP-1559查询
  base_fee_history: {
    query_id: 123456,  // Replace with your query ID / 替换为您的查询ID
    description: "Historical base fee data",
    parameters: ["start_date", "end_date"]
  },

  burned_eth_stats: {
    query_id: 234567,
    description: "ETH burn statistics",
    parameters: ["timeframe"]
  },

  // Blob Queries / Blob查询
  blob_stats: {
    query_id: 345678,
    description: "Blob transaction statistics",
    parameters: ["date_range"]
  },

  // MEV Queries / MEV查询
  mev_boost_stats: {
    query_id: 456789,
    description: "MEV-Boost statistics",
    parameters: ["relay", "timeframe"]
  }
};
```

### Finding Query IDs / 查找查询ID

**English:** 1. Browse public queries on [dune.com](https://dune.com)

**中文:** 1. 在[dune.com](https://dune.com)上浏览公共查询

**English:** 2. Look for Ethereum-related analytics

**中文:** 2. 查找与以太坊相关的分析

**English:** 3. Note the query ID from the URL (e.g., dune.com/queries/123456)

**中文:** 3. 从URL中记录查询ID（例如，dune.com/queries/123456）

**English:** 4. Ensure the query is public or you have access

**中文:** 4. 确保查询是公开的或您有访问权限

## Testing the Setup / 测试设置

### Start Development Server / 启动开发服务器

**English:** Run the development server:

**中文:** 运行开发服务器：

```bash
npm run dev
```

**English:** You should see output like:

**中文:** 您应该看到如下输出：

```
🚀 Ethereum MCP Server starting...
✅ Environment variables loaded
✅ Dune client initialized
✅ Cache system ready
✅ Tools registered: 14 tools available
🌐 Server listening on port 3000
```

### Test API Connection / 测试API连接

**English:** Test your Dune API connection:

**中文:** 测试您的Dune API连接：

```bash
curl -X POST http://localhost:3000/test-connection
```

**English:** Expected response:

**中文:** 预期响应：

```json
{
  "status": "success",
  "message": "Dune API connection established",
  "api_key_valid": true
}
```

## Integration with Claude Code / 与Claude Code集成

### Configure Claude Code / 配置Claude Code

**English:** Add the following to your Claude Code configuration:

**中文:** 将以下内容添加到您的Claude Code配置中：

```json
{
  "mcp_servers": [
    {
      "name": "ethereum-analytics",
      "url": "http://localhost:3000",
      "description": "Ethereum analytics MCP server"
    }
  ]
}
```

### Verify Integration / 验证集成

**English:** Test the integration by asking Claude to analyze Ethereum data:

**中文:** 通过要求Claude分析以太坊数据来测试集成：

```
"What are the current Ethereum gas prices?"
"Show me recent MEV activity"
"Analyze blob transaction trends"
```

## Troubleshooting / 故障排除

### Common Issues / 常见问题

#### API Key Invalid / API密钥无效

**English:** Error: "Invalid Dune API key"

**中文:** 错误："无效的Dune API密钥"

**Solution / 解决方案:**
- Verify your API key is correct / 验证您的API密钥是否正确
- Check for extra spaces in the .env file / 检查.env文件中是否有额外空格
- Ensure your Dune account is active / 确保您的Dune账户处于活动状态

#### Query Not Found / 查询未找到

**English:** Error: "Query ID not found or not accessible"

**中文:** 错误："查询ID未找到或无法访问"

**Solution / 解决方案:**
- Verify the query ID exists / 验证查询ID是否存在
- Check if the query is public / 检查查询是否为公开
- Ensure you have permission to access it / 确保您有访问权限

#### Connection Timeout / 连接超时

**English:** Error: "Connection to Dune API timed out"

**中文:** 错误："与Dune API的连接超时"

**Solution / 解决方案:**
- Check your internet connection / 检查您的互联网连接
- Verify Dune API status / 验证Dune API状态
- Increase timeout in configuration / 在配置中增加超时时间

### Debug Mode / 调试模式

**English:** Enable debug logging:

**中文:** 启用调试日志记录：

```bash
# Set log level to debug / 将日志级别设置为调试
export LOG_LEVEL=debug

# Start server / 启动服务器
npm run dev
```

## Performance Optimization / 性能优化

### Cache Configuration / 缓存配置

**English:** Adjust cache settings in `.env`:

**中文:** 在`.env`中调整缓存设置：

```env
# Cache duration in milliseconds / 缓存持续时间（毫秒）
CACHE_TTL=300000  # 5 minutes / 5分钟

# For development, you might want shorter cache / 对于开发，您可能需要更短的缓存
CACHE_TTL=60000   # 1 minute / 1分钟
```

### Concurrent Requests / 并发请求

**English:** The server handles concurrent requests efficiently, but you can tune:

**中文:** 服务器高效处理并发请求，但您可以调整：

```env
# Maximum concurrent requests / 最大并发请求数
MAX_CONCURRENT_REQUESTS=10

# Request timeout in milliseconds / 请求超时时间（毫秒）
REQUEST_TIMEOUT=30000
```

## Security Considerations / 安全考虑

### API Key Protection / API密钥保护

**English:** - Never commit API keys to version control

**中文:** - 切勿将API密钥提交到版本控制

**English:** - Use environment variables for sensitive data

**中文:** - 对敏感数据使用环境变量

**English:** - Rotate API keys regularly

**中文:** - 定期轮换API密钥

**English:** - Monitor API usage for anomalies

**中文:** - 监控API使用情况以发现异常

### Network Security / 网络安全

**English:** - Run behind a firewall in production

**中文:** - 在生产环境中在防火墙后运行

**English:** - Use HTTPS for external communications

**中文:** - 对外部通信使用HTTPS

**English:** - Implement rate limiting if exposed publicly

**中文:** - 如果公开暴露，实施速率限制

## Next Steps / 后续步骤

**English:** 1. Configure your query IDs in `queryConfig.ts`

**中文:** 1. 在`queryConfig.ts`中配置您的查询ID

**English:** 2. Test individual tools using the examples

**中文:** 2. 使用示例测试各个工具

**English:** 3. Integrate with your Claude Code workflow

**中文:** 3. 与您的Claude Code工作流程集成

**English:** 4. Explore advanced configuration options

**中文:** 4. 探索高级配置选项

**English:** 5. Consider contributing to the project

**中文:** 5. 考虑为项目做出贡献

---

**English:** For additional support, please refer to the main README.md file or open an issue on GitHub.

**中文:** 如需额外支持，请参阅主README.md文件或在GitHub上提交问题。

*Last updated / 最后更新: November 2025*