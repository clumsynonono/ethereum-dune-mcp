#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, Tool } from '@modelcontextprotocol/sdk/types.js';
import dotenv from 'dotenv';
import { DuneClient } from './utils/duneClient.js';
import { SimpleCache } from './utils/cache.js';
import { BLOB_QUERIES, DEX_QUERIES, STAKING_QUERIES, ETH_QUERIES, MEV_QUERIES, BUILDERNET_QUERIES, L2MEV_QUERIES, getAllQueries } from './utils/queryConfig.js';

dotenv.config();
const DUNE_API_KEY = process.env.DUNE_API_KEY;
if (!DUNE_API_KEY) { console.error('DUNE_API_KEY not found'); process.exit(1); }

const duneClient = new DuneClient(DUNE_API_KEY);
const cache = new SimpleCache(300000);
const server = new Server({ name: 'ethereum-dune-mcp', version: '2.2.0' }, { capabilities: { tools: {} } });

const tools: Tool[] = [
  // ===== BLOB (7) =====
  { name: 'blob_total_fees', description: '[免费] Blob 总费用 - DA 需求强弱', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },
  { name: 'blob_data_inflow', description: '[免费] 每链每天数据流入 (MB) - L2 活跃度', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },
  { name: 'blob_storage_size', description: '[免费] 累计存储 + Pruned Size', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },
  { name: 'blob_chain_ratio', description: '[免费] 各链 Blob 占比', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },
  { name: 'blob_base_fee', description: '[免费] CL Blob Base Fee - 4844 价格信号', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },
  { name: 'blob_recent_24h', description: '[免费] 24h Blob 提交监控', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },
  { name: 'blob_fullness', description: '[免费] Blob 填充效率', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },

  // ===== DEX (7) =====
  { name: 'dex_volume_24h', description: '[免费] DEX 24h 交易量 - MEV 机会', inputSchema: { type: 'object', properties: {} } },
  { name: 'dex_volume_7d', description: '[免费] DEX 7d 交易量 - 收入趋势', inputSchema: { type: 'object', properties: {} } },
  { name: 'dex_eth_share', description: '[免费] ETH 在 EVM DEX 份额 - 主网需求', inputSchema: { type: 'object', properties: {} } },
  { name: 'dex_weekly_by_chain', description: '[免费] 各链每周交易量 - L2 迁移', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },
  { name: 'dex_ranked', description: '[免费] DEX 排名 - MEV 贡献', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 100 } } } },
  { name: 'dex_frontend_share', description: '[免费] Frontend 份额 - 用户行为', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 100 } } } },
  { name: 'dex_bot_usage', description: '[免费] Bot 使用量 - MEV 风险', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },

  // ===== STAKING (10) =====
  { name: 'staking_eth_staked', description: '[免费] 全网质押量 - 经济安全性', inputSchema: { type: 'object', properties: {} } },
  { name: 'staking_validators', description: '[免费] 验证者数量 - 去中心化', inputSchema: { type: 'object', properties: {} } },
  { name: 'staking_by_entity', description: '[免费] 机构集中度 - HHI 指数', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 100 } } } },
  { name: 'staking_unstaked', description: '[免费] ETH 退出量 - 赎回风险', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },
  { name: 'staking_full_withdrawals', description: '[免费] 完整退出 - 系统性撤退', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },
  { name: 'staking_delta_week', description: '[免费] Δ 质押 (周) - 短期变动', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 50 } } } },
  { name: 'staking_delta_month', description: '[免费] Δ 质押 (月) - 中期变动', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 50 } } } },
  { name: 'staking_delta_6m', description: '[免费] Δ 质押 (6月) - 长期变动', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 50 } } } },
  { name: 'staking_liquid', description: '[免费] Liquid Staking 份额', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 50 } } } },
  { name: 'staking_restaking', description: '[免费] Liquid Restaking - 关联风险', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 50 } } } },

  // ===== ETHEREUM (7) =====
  { name: 'eth_block_builders', description: '[免费] Builder 市场份额 - PBS/MEV', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 100 } } } },
  { name: 'eth_gas_fees', description: '[免费] Gas 费用 - 拥堵分析', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },
  { name: 'eth_median_gas', description: '[免费] Median Gas Price', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },
  { name: 'eth_burned', description: '[免费] ETH 燃烧量 - EIP-1559', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },
  { name: 'eth_active_addresses', description: '[免费] 活跃地址数', inputSchema: { type: 'object', properties: {} } },
  { name: 'eth_tx_count', description: '[免费] 交易数量 - blockspace 需求', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },
  { name: 'eth_price', description: '[免费] ETH 价格', inputSchema: { type: 'object', properties: {} } },

  // ===== MEV BLOCKER (6) =====
  { name: 'mev_total_rebates', description: '[免费] MEV 总返还 - OFV', inputSchema: { type: 'object', properties: {} } },
  { name: 'mev_rebates_by_builder', description: '[免费] Builder 返还 - 行为模型', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 100 } } } },
  { name: 'mev_rebates_by_searcher', description: '[免费] Searcher 返还 - 竞争度', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 100 } } } },
  { name: 'mev_wait_times', description: '[免费] 等待时间 - OFA 效率', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 100 } } } },
  { name: 'mev_volume_protected', description: '[免费] 保护交易量', inputSchema: { type: 'object', properties: {} } },
  { name: 'mev_success_rate', description: '[免费] 成功率', inputSchema: { type: 'object', properties: {} } },

  // ===== BUILDERNET (4) =====
  { name: 'buildernet_stats', description: '[免费] BuilderNet 统计 - Revenue/Bundles/Blocks', inputSchema: { type: 'object', properties: {} } },
  { name: 'buildernet_gas_refunds', description: '[免费] Gas Refunds - 补贴机制风险', inputSchema: { type: 'object', properties: {} } },
  { name: 'buildernet_monthly_refunds', description: '[免费] 月度 Refund 趋势', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 100 } } } },
  { name: 'buildernet_operators', description: '[免费] Public Keys / Operators - 集中度', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 100 } } } },

  // ===== L2 MEV (8) =====
  { name: 'l2_atomic_arb_by_chain', description: '[免费] Atomic Arb Volume by Chain (1Y) - L2 MEV 规模', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },
  { name: 'l2_atomic_arb_trades', description: '[免费] Atomic Arb Trade Count - MEV 活跃度', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 100 } } } },
  { name: 'l2_atomic_arb_cumulative', description: '[免费] Atomic Arb Cumulative - MEV 增长曲线', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },
  { name: 'l2_atomic_arb_1m', description: '[免费] Atomic Arb 1M Stats - 近期热度', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 100 } } } },
  { name: 'l2_sandwich_cumulative', description: '[免费] Sandwich Cumulative Volume - 用户损失', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },
  { name: 'l2_sandwich_trades', description: '[免费] Sandwich Trade Count - 各链保护差异', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 100 } } } },
  { name: 'l2_base_mev_extracted', description: '[免费] Base MEV Bot Extracted - Sequencer 收入', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 1000 } } } },
  { name: 'l2_base_mev_daily', description: '[免费] Base MEV Bot Daily - 每日利润', inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 100 } } } },

  // ===== UTILITY (3) =====
  { name: 'custom_query', description: '[免费] 获取任意查询缓存', inputSchema: { type: 'object', properties: { query_id: { type: 'number' }, limit: { type: 'number', default: 1000 } }, required: ['query_id'] } },
  { name: 'execute_query', description: '[消耗额度!] 执行查询', inputSchema: { type: 'object', properties: { query_id: { type: 'number' }, confirm: { type: 'boolean' } }, required: ['query_id', 'confirm'] } },
  { name: 'list_queries', description: '列出所有查询 ID', inputSchema: { type: 'object', properties: {} } },
];

async function get(qid: number, key: string, limit?: number) {
  const c = cache.get(key); if (c) return c;
  const r = await duneClient.getCachedResults(qid, limit);
  cache.set(key, r, 300000); return r;
}

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));
server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params;
  const limit = (args?.limit as number) || 1000;
  const json = (d: any) => ({ content: [{ type: 'text', text: JSON.stringify(d, null, 2) }] });

  try {
    // BLOB
    if (name === 'blob_total_fees') return json(await get(BLOB_QUERIES.totalFees, `bf_${limit}`, limit));
    if (name === 'blob_data_inflow') return json(await get(BLOB_QUERIES.dataInflow, `bi_${limit}`, limit));
    if (name === 'blob_storage_size') return json(await get(BLOB_QUERIES.storageSize, `bs_${limit}`, limit));
    if (name === 'blob_chain_ratio') return json(await get(BLOB_QUERIES.chainRatio, `br_${limit}`, limit));
    if (name === 'blob_base_fee') return json(await get(BLOB_QUERIES.baseFee, `bb_${limit}`, limit));
    if (name === 'blob_recent_24h') return json(await get(BLOB_QUERIES.recent24h, `b24_${limit}`, limit));
    if (name === 'blob_fullness') return json(await get(BLOB_QUERIES.fullness, `bfl_${limit}`, limit));

    // DEX
    if (name === 'dex_volume_24h') return json(await get(DEX_QUERIES.volume24h, 'd24'));
    if (name === 'dex_volume_7d') return json(await get(DEX_QUERIES.volume7d, 'd7d'));
    if (name === 'dex_eth_share') return json(await get(DEX_QUERIES.ethShare, 'des'));
    if (name === 'dex_weekly_by_chain') return json(await get(DEX_QUERIES.weeklyByChain, `dwc_${limit}`, limit));
    if (name === 'dex_ranked') return json(await get(DEX_QUERIES.rankedDex, `dr_${limit}`, limit));
    if (name === 'dex_frontend_share') return json(await get(DEX_QUERIES.frontendShare, `dfs_${limit}`, limit));
    if (name === 'dex_bot_usage') return json(await get(DEX_QUERIES.botUsage, `dbu_${limit}`, limit));

    // STAKING
    if (name === 'staking_eth_staked') return json(await get(STAKING_QUERIES.ethStaked, 'ses'));
    if (name === 'staking_validators') return json(await get(STAKING_QUERIES.validators, 'sv'));
    if (name === 'staking_by_entity') return json(await get(STAKING_QUERIES.stakersByEntity, `sbe_${limit}`, limit));
    if (name === 'staking_unstaked') return json(await get(STAKING_QUERIES.ethUnstaked, `su_${limit}`, limit));
    if (name === 'staking_full_withdrawals') return json(await get(STAKING_QUERIES.fullWithdrawals, `sfw_${limit}`, limit));
    if (name === 'staking_delta_week') return json(await get(STAKING_QUERIES.deltaWeek, `sdw_${limit}`, limit));
    if (name === 'staking_delta_month') return json(await get(STAKING_QUERIES.deltaMonth, `sdm_${limit}`, limit));
    if (name === 'staking_delta_6m') return json(await get(STAKING_QUERIES.delta6M, `sd6_${limit}`, limit));
    if (name === 'staking_liquid') return json(await get(STAKING_QUERIES.liquidStaking, `sl_${limit}`, limit));
    if (name === 'staking_restaking') return json(await get(STAKING_QUERIES.liquidRestaking, `sr_${limit}`, limit));

    // ETHEREUM
    if (name === 'eth_block_builders') return json(await get(ETH_QUERIES.blockBuilders, `ebb_${limit}`, limit));
    if (name === 'eth_gas_fees') return json(await get(ETH_QUERIES.gasFees, `egf_${limit}`, limit));
    if (name === 'eth_median_gas') return json(await get(ETH_QUERIES.medianGas, `emg_${limit}`, limit));
    if (name === 'eth_burned') return json(await get(ETH_QUERIES.ethBurned, `eb_${limit}`, limit));
    if (name === 'eth_active_addresses') return json(await get(ETH_QUERIES.activeAddresses, 'eaa'));
    if (name === 'eth_tx_count') return json(await get(ETH_QUERIES.txCount, `etc_${limit}`, limit));
    if (name === 'eth_price') return json(await get(ETH_QUERIES.ethPrice, 'ep'));

    // MEV
    if (name === 'mev_total_rebates') return json(await get(MEV_QUERIES.totalRebates, 'mtr'));
    if (name === 'mev_rebates_by_builder') return json(await get(MEV_QUERIES.rebatesByBuilder, `mrb_${limit}`, limit));
    if (name === 'mev_rebates_by_searcher') return json(await get(MEV_QUERIES.rebatesBySearcher, `mrs_${limit}`, limit));
    if (name === 'mev_wait_times') return json(await get(MEV_QUERIES.waitTimes, `mwt_${limit}`, limit));
    if (name === 'mev_volume_protected') return json(await get(MEV_QUERIES.volumeProtected, 'mvp'));
    if (name === 'mev_success_rate') return json(await get(MEV_QUERIES.successRate, 'msr'));

    // BUILDERNET
    if (name === 'buildernet_stats') return json(await get(BUILDERNET_QUERIES.main, 'bn_main'));
    if (name === 'buildernet_gas_refunds') return json(await get(BUILDERNET_QUERIES.gasRefunds, 'bn_refunds'));
    if (name === 'buildernet_monthly_refunds') return json(await get(BUILDERNET_QUERIES.monthlyRefunds, `bn_monthly_${limit}`, limit));
    if (name === 'buildernet_operators') return json(await get(BUILDERNET_QUERIES.publicKeys, `bn_ops_${limit}`, limit));

    // L2 MEV
    if (name === 'l2_atomic_arb_by_chain') return json(await get(L2MEV_QUERIES.atomicArbByChain, `l2aa_chain_${limit}`, limit));
    if (name === 'l2_atomic_arb_trades') return json(await get(L2MEV_QUERIES.atomicArbTradeCount, `l2aa_trades_${limit}`, limit));
    if (name === 'l2_atomic_arb_cumulative') return json(await get(L2MEV_QUERIES.atomicArbCumulative, `l2aa_cum_${limit}`, limit));
    if (name === 'l2_atomic_arb_1m') return json(await get(L2MEV_QUERIES.atomicArb1M, `l2aa_1m_${limit}`, limit));
    if (name === 'l2_sandwich_cumulative') return json(await get(L2MEV_QUERIES.sandwichCumulative, `l2sw_cum_${limit}`, limit));
    if (name === 'l2_sandwich_trades') return json(await get(L2MEV_QUERIES.sandwichTradeCount, `l2sw_trades_${limit}`, limit));
    if (name === 'l2_base_mev_extracted') return json(await get(L2MEV_QUERIES.baseMevBotExtracted, `l2base_ext_${limit}`, limit));
    if (name === 'l2_base_mev_daily') return json(await get(L2MEV_QUERIES.baseMevBotDaily, `l2base_daily_${limit}`, limit));

    // UTILITY
    if (name === 'custom_query') {
      const qid = args?.query_id as number; if (!qid) throw new Error('query_id required');
      return json(await duneClient.getCachedResults(qid, limit));
    }
    if (name === 'execute_query') {
      const qid = args?.query_id as number; if (!qid) throw new Error('query_id required');
      if (!args?.confirm) return { content: [{ type: 'text', text: '⚠️ 需要 confirm: true' }] };
      const r = await duneClient.executeAndWait(qid);
      return json(r.result?.rows || []);
    }
    if (name === 'list_queries') return json(getAllQueries());

    throw new Error(`Unknown: ${name}`);
  } catch (e: any) {
    return { content: [{ type: 'text', text: `Error: ${e.message}` }], isError: true };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Ethereum Dune MCP v2.2.0 - 49 tools ready');
}
main().catch(console.error);
