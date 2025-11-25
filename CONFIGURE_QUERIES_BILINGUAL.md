# Query Configuration Guide / 查询配置指南

## Overview / 概述

**English:** This guide explains how to configure Dune Analytics query IDs for the Ethereum MCP server to enable custom analytics and data retrieval.

**中文:** 本指南说明如何为以太坊MCP服务器配置Dune Analytics查询ID，以启用自定义分析和数据检索。

## Understanding Dune Queries / 了解Dune查询

### What are Dune Queries? / 什么是Dune查询？

**English:** Dune Analytics queries are SQL-based analytics that extract and visualize blockchain data. Each query has a unique ID that the MCP server uses to fetch results.

**中文:** Dune Analytics查询是基于SQL的分析，用于提取和可视化区块链数据。每个查询都有一个唯一的ID，MCP服务器使用它来获取结果。

### Query Types / 查询类型

**English:** The server supports several types of queries:

**中文:** 服务器支持多种类型的查询：

- **Time-series queries** / 时间序列查询 - Historical data over time
- **Statistical queries** / 统计查询 - Aggregated metrics and KPIs
- **Comparative queries** / 比较查询 - Side-by-side analysis
- **Real-time queries** / 实时查询 - Latest blockchain state

## Finding Query IDs / 查找查询ID

### Method 1: Browse Public Queries / 方法1：浏览公共查询

**English:** 1. Visit [dune.com](https://dune.com)

**中文:** 1. 访问[dune.com](https://dune.com)

**English:** 2. Use the search bar to find relevant queries

**中文:** 2. 使用搜索栏查找相关查询

**English:** 3. Filter by category (DeFi, NFTs, etc.)

**中文:** 3. 按类别筛选（DeFi、NFT等）

**English:** 4. Look for queries with high star ratings

**中文:** 4. 寻找具有高星级的查询

**English:** 5. Extract the query ID from the URL

**中文:** 5. 从URL中提取查询ID

### Method 2: Community Dashboards / 方法2：社区仪表板

**English:** Explore popular dashboards:

**中文:** 探索热门仪表板：

- **Ethereum Overview** / 以太坊概览 - General Ethereum metrics
- **DeFi Pulse** / DeFi脉搏 - DeFi ecosystem data
- **NFT Market** / NFT市场 - NFT trading statistics
- **MEV Analysis** / MEV分析 - MEV-related insights

### Method 3: Create Custom Queries / 方法3：创建自定义查询

**English:** For specific analytics needs, create your own queries:

**中文:** 对于特定的分析需求，创建您自己的查询：

```sql
-- Example: Daily ETH burned / 示例：每日ETH销毁
SELECT
    DATE(block_time) as date,
    SUM(gas_used * gas_price) / 1e18 as eth_burned
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30 days'
GROUP BY DATE(block_time)
ORDER BY date DESC;
```

## Configuration Structure / 配置结构

### Basic Configuration / 基本配置

**English:** Edit `src/utils/queryConfig.ts`:

**中文:** 编辑`src/utils/queryConfig.ts`：

```typescript
export const QUERY_CONFIG = {
  // Query identifier / 查询标识符
  query_name: {
    query_id: 123456,           // Dune query ID / Dune查询ID
    description: "Query description",  // Human-readable description / 人类可读的描述
    parameters: ["param1", "param2"],   // Required parameters / 必需参数
    cache_duration: 300000      // Optional: cache duration in ms / 可选：缓存持续时间（毫秒）
  }
};
```

### Advanced Configuration / 高级配置

```typescript
export const QUERY_CONFIG = {
  // EIP-1559 Analytics / EIP-1559分析
  base_fee_history: {
    query_id: 123456,
    description: "Historical base fee per block",
    parameters: ["start_block", "end_block"],
    cache_duration: 300000,     // 5 minutes / 5分钟
    retry_attempts: 3,          // Retry failed queries / 重试失败的查询
    timeout: 30000             // 30 second timeout / 30秒超时
  },

  // MEV Analytics / MEV分析
  mev_builder_performance: {
    query_id: 234567,
    description: "MEV builder performance metrics",
    parameters: ["timeframe", "relay"],
    cache_duration: 600000,     // 10 minutes / 10分钟
    format: "json",             // Response format / 响应格式
    validation: {               // Parameter validation / 参数验证
      timeframe: {
        type: "string",
        enum: ["1d", "7d", "30d"],
        required: true
      }
    }
  }
};
```

## Pre-configured Query Categories / 预配置查询类别

### EIP-1559 Queries / EIP-1559查询

**English:** Recommended queries for EIP-1559 analysis:

**中文:** 推荐的EIP-1559分析查询：

```typescript
export const EIP1559_QUERIES = {
  // Base fee trends / 基础费用趋势
  base_fee_history: {
    query_id: 123456,
    description: "Historical base fee per block over time",
    parameters: ["days"],
    source: "https://dune.com/queries/123456"
  },

  // ETH burn rate / ETH销毁率
  eth_burn_rate: {
    query_id: 123457,
    description: "Daily ETH burned through EIP-1559",
    parameters: ["date_range"],
    source: "https://dune.com/queries/123457"
  },

  // Priority fee distribution / 优先费用分布
  priority_fee_stats: {
    query_id: 123458,
    description: "Priority fee statistics by percentile",
    parameters: ["timeframe"],
    source: "https://dune.com/queries/123458"
  }
};
```

### Blob Queries / Blob查询

**English:** Queries for EIP-4844 blob analysis:

**中文:** EIP-4844 Blob分析的查询：

```typescript
export const BLOB_QUERIES = {
  // Blob transaction count / Blob交易计数
  blob_transaction_stats: {
    query_id: 234567,
    description: "Daily blob transaction statistics",
    parameters: ["start_date", "end_date"],
    cache_duration: 180000  // 3 minutes / 3分钟
  },

  // Blob gas prices / Blob gas价格
  blob_gas_price_trends: {
    query_id: 234568,
    description: "Historical blob gas price data",
    parameters: ["timeframe"],
    cache_duration: 300000  // 5 minutes / 5分钟
  },

  // L2 blob adoption / L2 Blob采用
  l2_blob_usage: {
    query_id: 234569,
    description: "Blob usage by Layer 2 protocols",
    parameters: ["protocol", "date_range"],
    cache_duration: 600000  // 10 minutes / 10分钟
  }
};
```

### MEV Queries / MEV查询

**English:** Queries for MEV analysis:

**中文:** MEV分析的查询：

```typescript
export const MEV_QUERIES = {
  // MEV-Boost statistics / MEV-Boost统计
  mev_boost_adoption: {
    query_id: 345678,
    description: "MEV-Boost adoption and usage metrics",
    parameters: ["relay", "timeframe"],
    cache_duration: 300000
  },

  // Builder performance / 构建者表现
  builder_performance: {
    query_id: 345679,
    description: "Block builder performance comparison",
    parameters: ["builder_address", "metric"],
    cache_duration: 600000
  },

  // Searcher activity / 搜索者活动
  searcher_profitability: {
    query_id: 345680,
    description: "MEV searcher profit analysis",
    parameters: ["time_period", "strategy"],
    cache_duration: 900000  // 15 minutes / 15分钟
  }
};
```

## Parameter Types / 参数类型

### Supported Parameter Types / 支持的参数类型

**English:** The server supports various parameter types:

**中文:** 服务器支持各种参数类型：

```typescript
export interface QueryParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'array';
  required?: boolean;
  default?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    enum?: string[];
  };
}
```

### Parameter Examples / 参数示例

```typescript
// String parameter / 字符串参数
{
  name: "timeframe",
  type: "string",
  required: true,
  validation: {
    enum: ["1d", "7d", "30d", "90d"]
  }
}

// Number parameter / 数字参数
{
  name: "block_number",
  type: "number",
  required: false,
  default: 0,
  validation: {
    min: 0,
    max: 99999999
  }
}

// Date parameter / 日期参数
{
  name: "start_date",
  type: "date",
  required: true,
  validation: {
    pattern: "YYYY-MM-DD"
  }
}
```

## Cache Configuration / 缓存配置

### Cache Strategies / 缓存策略

**English:** Different cache durations for different query types:

**中文:** 不同类型查询的不同缓存持续时间：

```typescript
export const CACHE_STRATEGIES = {
  // Real-time data / 实时数据
  real_time: {
    duration: 60000,    // 1 minute / 1分钟
    description: "Fast-changing metrics"
  },

  // Standard analytics / 标准分析
  standard: {
    duration: 300000,   // 5 minutes / 5分钟
    description: "Regular analytics queries"
  },

  // Historical data / 历史数据
  historical: {
    duration: 1800000,  // 30 minutes / 30分钟
    description: "Slow-changing historical data"
  },

  // Reference data / 参考数据
  reference: {
    duration: 3600000,  // 1 hour / 1小时
    description: "Static reference information"
  }
};
```

### Cache Invalidation / 缓存失效

**English:** Manual cache invalidation:

**中文:** 手动缓存失效：

```typescript
// Clear cache for specific query / 清除特定查询的缓存
await cache.delete(`query:${queryId}`);

// Clear all cache / 清除所有缓存
await cache.clear();

// Clear cache by pattern / 按模式清除缓存
await cache.deletePattern('query:*');
```

## Error Handling / 错误处理

### Common Errors / 常见错误

**English:** Configure error handling for queries:

**中文:** 为查询配置错误处理：

```typescript
export const QUERY_CONFIG = {
  sensitive_query: {
    query_id: 999999,
    description: "Query with custom error handling",
    parameters: ["param1"],
    error_handling: {
      retry_attempts: 3,
      retry_delay: 1000,        // 1 second / 1秒
      fallback_query_id: 999998, // Alternative query / 替代查询
      timeout: 60000           // 60 seconds / 60秒
    }
  }
};
```

### Error Messages / 错误消息

**English:** Custom error messages:

**中文:** 自定义错误消息：

```typescript
export const ERROR_MESSAGES = {
  QUERY_NOT_FOUND: {
    en: "Query ID not found or not accessible",
    zh: "查询ID未找到或无法访问"
  },
  INVALID_PARAMETERS: {
    en: "Invalid query parameters provided",
    zh: "提供的查询参数无效"
  },
  RATE_LIMIT_EXCEEDED: {
    en: "Dune API rate limit exceeded",
    zh: "Dune API速率限制已超出"
  },
  TIMEOUT_ERROR: {
    en: "Query execution timeout",
    zh: "查询执行超时"
  }
};
```

## Testing Queries / 测试查询

### Validation / 验证

**English:** Test your query configuration:

**中文:** 测试您的查询配置：

```bash
# Test specific query / 测试特定查询
npm run test:query --query_id=123456

# Test all configured queries / 测试所有配置的查询
npm run test:queries

# Validate query parameters / 验证查询参数
npm run validate:queries
```

### Performance Testing / 性能测试

**English:** Measure query performance:

**中文:** 测量查询性能：

```typescript
// Performance metrics / 性能指标
export interface QueryMetrics {
  execution_time: number;     // milliseconds / 毫秒
  result_size: number;        // bytes / 字节
  cache_hit: boolean;         // true if from cache / 如果来自缓存则为true
  api_calls: number;          // number of API calls / API调用次数
}
```

## Best Practices / 最佳实践

### Query Selection / 查询选择

**English:** Guidelines for choosing queries:

**中文:** 选择查询的指南：

1. **Relevance** / 相关性 - Choose queries that match your analytics needs
2. **Performance** / 性能 - Consider query execution time
3. **Accuracy** / 准确性 - Verify data quality and freshness
4. **Maintenance** / 维护 - Prefer actively maintained queries
5. **Documentation** / 文档 - Look for well-documented queries

### Configuration Management / 配置管理

**English:** Keep your configuration organized:

**中文:** 保持配置有序：

```typescript
// Group related queries / 对相关查询进行分组
export const QUERY_GROUPS = {
  eip1559: EIP1559_QUERIES,
  blob: BLOB_QUERIES,
  mev: MEV_QUERIES,
  custom: CUSTOM_QUERIES
};

// Version control / 版本控制
export const CONFIG_VERSION = "1.0.0";
export const LAST_UPDATED = "2025-11-25";
```

## Advanced Topics / 高级主题

### Dynamic Query Generation / 动态查询生成

**English:** Generate queries dynamically:

**中文:** 动态生成查询：

```typescript
export function generateDynamicQuery(parameters: QueryParameters): string {
  const baseQuery = `
    SELECT
      DATE(block_time) as date,
      ${parameters.metrics.join(', ')}
    FROM ${parameters.table}
    WHERE block_time >= '{{start_date}}'
      AND block_time <= '{{end_date}}'
  `;

  if (parameters.filters) {
    return baseQuery + ` AND ${parameters.filters}`;
  }

  return baseQuery;
}
```

### Query Composition / 查询组合

**English:** Combine multiple queries:

**中文:** 组合多个查询：

```typescript
export const COMPOSITE_QUERIES = {
  comprehensive_analysis: {
    queries: [
      { query_id: 111111, alias: "base_data" },
      { query_id: 222222, alias: "comparison_data" }
    ],
    composition: "JOIN",
    merge_key: "date"
  }
};
```

## Troubleshooting / 故障排除

### Debug Mode / 调试模式

**English:** Enable query debugging:

**中文:** 启用查询调试：

```bash
# Enable query logging / 启用查询日志记录
export QUERY_DEBUG=true

# Log all API calls / 记录所有API调用
export LOG_API_CALLS=true

# Show query execution plans / 显示查询执行计划
export SHOW_QUERY_PLAN=true
```

### Performance Monitoring / 性能监控

**English:** Monitor query performance:

**中文:** 监控查询性能：

```typescript
// Performance tracking / 性能跟踪
export interface PerformanceMetrics {
  query_id: number;
  execution_time: number;
  result_count: number;
  cache_hit_rate: number;
  error_rate: number;
}
```

---

**English:** For additional help, please refer to the main documentation or open an issue on GitHub.

**中文:** 如需额外帮助，请参阅主文档或在GitHub上提交问题。

*Last updated / 最后更新: November 2025*