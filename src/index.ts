#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import dotenv from 'dotenv';
import { DuneClient } from './utils/duneClient.js';
import { SimpleCache } from './utils/cache.js';
import { EIP1559Tools } from './tools/eip1559Tools.js';
import { BlobTools } from './tools/blobTools.js';
import { MEVTools } from './tools/mevTools.js';

// Load environment variables
dotenv.config();

const DUNE_API_KEY = process.env.DUNE_API_KEY;

if (!DUNE_API_KEY) {
  console.error('Error: DUNE_API_KEY not found in environment variables');
  console.error('Please create a .env file with your Dune API key');
  console.error('Get your API key at: https://dune.com/settings/api');
  process.exit(1);
}

// Initialize clients and tools
const duneClient = new DuneClient(DUNE_API_KEY);
const cache = new SimpleCache(300000); // 5 minute default cache
const eip1559Tools = new EIP1559Tools(duneClient, cache);
const blobTools = new BlobTools(duneClient, cache);
const mevTools = new MEVTools(duneClient, cache);

// Create MCP server
const server = new Server(
  {
    name: 'ethereum-rig-mcp',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
const tools: Tool[] = [
  // EIP-1559 Tools
  {
    name: 'get_base_fee_history',
    description: 'Get historical Ethereum base fee data (EIP-1559). Returns base fee trends over time.',
    inputSchema: {
      type: 'object',
      properties: {
        days: {
          type: 'number',
          description: 'Number of days to fetch (default: 7)',
          default: 7,
        },
      },
    },
  },
  {
    name: 'get_burned_eth_stats',
    description: 'Get ETH burned statistics through EIP-1559. Shows total ETH burned and burn rates.',
    inputSchema: {
      type: 'object',
      properties: {
        timeframe: {
          type: 'string',
          enum: ['24h', '7d', '30d', 'all'],
          description: 'Timeframe for burned ETH stats (default: all)',
          default: 'all',
        },
      },
    },
  },
  {
    name: 'get_priority_fee_stats',
    description: 'Get priority fee (tip) statistics. Shows how much users pay to prioritize transactions.',
    inputSchema: {
      type: 'object',
      properties: {
        days: {
          type: 'number',
          description: 'Number of days to fetch (default: 7)',
          default: 7,
        },
      },
    },
  },
  {
    name: 'analyze_fee_market',
    description: 'Analyze current Ethereum fee market conditions. Comprehensive view of gas price dynamics.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },

  // Blob Tools (EIP-4844)
  {
    name: 'get_blob_stats',
    description: 'Get blob transaction statistics (EIP-4844). Shows blob usage, counts, and trends.',
    inputSchema: {
      type: 'object',
      properties: {
        days: {
          type: 'number',
          description: 'Number of days to fetch (default: 7)',
          default: 7,
        },
      },
    },
  },
  {
    name: 'get_blob_gas_price',
    description: 'Get blob gas price data over time. Track the cost of posting blobs to Ethereum.',
    inputSchema: {
      type: 'object',
      properties: {
        days: {
          type: 'number',
          description: 'Number of days to fetch (default: 7)',
          default: 7,
        },
      },
    },
  },
  {
    name: 'get_blob_usage_by_l2',
    description: 'Get blob usage breakdown by Layer 2 networks (Arbitrum, Optimism, Base, etc.).',
    inputSchema: {
      type: 'object',
      properties: {
        days: {
          type: 'number',
          description: 'Number of days to fetch (default: 30)',
          default: 30,
        },
      },
    },
  },
  {
    name: 'analyze_blob_transactions',
    description: 'Analyze blob transaction patterns and trends.',
    inputSchema: {
      type: 'object',
      properties: {
        days: {
          type: 'number',
          description: 'Number of days to analyze (default: 7)',
          default: 7,
        },
      },
    },
  },

  // MEV Tools
  {
    name: 'get_mev_boost_stats',
    description: 'Get MEV-Boost statistics. Shows MEV extraction through block builders.',
    inputSchema: {
      type: 'object',
      properties: {
        days: {
          type: 'number',
          description: 'Number of days to fetch (default: 7)',
          default: 7,
        },
      },
    },
  },
  {
    name: 'get_builder_stats',
    description: 'Get block builder statistics and market share. Analyze builder competition. Uses Query ID 1279809.',
    inputSchema: {
      type: 'object',
      properties: {
        days: {
          type: 'number',
          description: 'Number of days to fetch (default: 7)',
          default: 7,
        },
      },
    },
  },
  {
    name: 'get_builder_lifetime_stats',
    description: 'Get lifetime statistics for all MEV-Boost builders. Shows total blocks built, MEV extracted, etc. Uses Query ID 1298718.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_relay_stats',
    description: 'Get MEV relay statistics. Analyze relay performance and usage.',
    inputSchema: {
      type: 'object',
      properties: {
        days: {
          type: 'number',
          description: 'Number of days to fetch (default: 7)',
          default: 7,
        },
      },
    },
  },
  {
    name: 'get_searcher_activity',
    description: 'Get MEV searcher activity and profitability. Shows top searchers and their strategies.',
    inputSchema: {
      type: 'object',
      properties: {
        days: {
          type: 'number',
          description: 'Number of days to fetch (default: 7)',
          default: 7,
        },
        limit: {
          type: 'number',
          description: 'Number of top searchers to return (default: 20)',
          default: 20,
        },
      },
    },
  },
  {
    name: 'analyze_mev_trends',
    description: 'Analyze MEV extraction trends over time. Historical MEV activity analysis.',
    inputSchema: {
      type: 'object',
      properties: {
        days: {
          type: 'number',
          description: 'Number of days to analyze (default: 30)',
          default: 30,
        },
      },
    },
  },

  // Custom Query Tool
  {
    name: 'custom_dune_query',
    description: 'Execute a custom Dune query by ID. Useful for queries not covered by other tools.',
    inputSchema: {
      type: 'object',
      properties: {
        query_id: {
          type: 'number',
          description: 'Dune query ID to execute',
        },
        parameters: {
          type: 'object',
          description: 'Optional query parameters (key-value pairs)',
        },
      },
      required: ['query_id'],
    },
  },
];

// Register tool list handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Register tool execution handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      // EIP-1559 Tools
      case 'get_base_fee_history': {
        const days = (args?.days as number) || 7;
        const result = await eip1559Tools.getBaseFeeHistory(days);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_burned_eth_stats': {
        const timeframe = (args?.timeframe as '24h' | '7d' | '30d' | 'all') || 'all';
        const result = await eip1559Tools.getBurnedEthStats(timeframe);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_priority_fee_stats': {
        const days = (args?.days as number) || 7;
        const result = await eip1559Tools.getPriorityFeeStats(days);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'analyze_fee_market': {
        const result = await eip1559Tools.analyzeFeeMarket();
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      // Blob Tools
      case 'get_blob_stats': {
        const days = (args?.days as number) || 7;
        const result = await blobTools.getBlobStats(days);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_blob_gas_price': {
        const days = (args?.days as number) || 7;
        const result = await blobTools.getBlobGasPrice(days);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_blob_usage_by_l2': {
        const days = (args?.days as number) || 30;
        const result = await blobTools.getBlobUsageByL2(days);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'analyze_blob_transactions': {
        const days = (args?.days as number) || 7;
        const result = await blobTools.analyzeBlobTransactions(days);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      // MEV Tools
      case 'get_mev_boost_stats': {
        const days = (args?.days as number) || 7;
        const result = await mevTools.getMEVBoostStats(days);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_builder_stats': {
        const days = (args?.days as number) || 7;
        const result = await mevTools.getBuilderStats(days);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_builder_lifetime_stats': {
        const result = await mevTools.getBuilderLifetimeStats();
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_relay_stats': {
        const days = (args?.days as number) || 7;
        const result = await mevTools.getRelayStats(days);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_searcher_activity': {
        const days = (args?.days as number) || 7;
        const limit = (args?.limit as number) || 20;
        const result = await mevTools.getSearcherActivity(days, limit);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'analyze_mev_trends': {
        const days = (args?.days as number) || 30;
        const result = await mevTools.analyzeMEVTrends(days);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      // Custom Query
      case 'custom_dune_query': {
        const queryId = args?.query_id as number;
        const parameters = args?.parameters as Record<string, any> | undefined;
        const result = await duneClient.getResults(queryId, parameters);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [
        {
          type: 'text',
          text: `Error executing ${name}: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Ethereum RIG MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
