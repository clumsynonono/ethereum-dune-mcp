/**
 * Dune Query IDs - RIG Research MCP
 * 所有查询默认只获取缓存结果（免费），不消耗 API 额度
 */

// ===== Blob Analytics (hildobby/blobs) =====
export const BLOB_QUERIES = {
  totalFees: 4104427,      // Blob 总费用
  dataInflow: 4077661,     // 每链每天数据流入 (MB)
  storageSize: 4077761,    // 累计存储 + Pruned
  chainRatio: 4780618,     // 各链占比
  baseFee: 3591214,        // CL Blob Base Fee
  recent24h: 5072258,      // 24h 提交监控
  fullness: 5124588,       // 填充效率
};

// ===== DEX Metrics (hagaetc/dex-metrics) =====
export const DEX_QUERIES = {
  volume24h: 4234,         // 24h 交易量
  volume7d: 4235,          // 7d 交易量
  ethShare: 21693,         // ETH 在 EVM DEX 份额
  weeklyByChain: 2180075,  // 各链每周交易量
  rankedDex: 4319,         // DEX 排名
  frontendShare: 3364122,  // Frontend 市场份额
  botUsage: 2687239,       // Bot 使用量
};

// ===== Staking (hildobby/eth2-staking) =====
export const STAKING_QUERIES = {
  ethStaked: 1933035,      // 全网质押量
  validators: 1933036,     // 验证者数量
  stakersByEntity: 3383110,// 机构集中度
  ethUnstaked: 2393992,    // 退出量
  fullWithdrawals: 2394053,// 完整退出
  deltaWeek: 1945604,      // Δ 质押 (周)
  deltaMonth: 1945549,     // Δ 质押 (月)
  delta6M: 1945623,        // Δ 质押 (6月)
  liquidStaking: 1941374,  // Liquid Staking
  liquidRestaking: 3548849,// Liquid Restaking
};

// ===== Ethereum Metrics =====
export const ETH_QUERIES = {
  blockBuilders: 5090511,  // Builder 市场份额
  gasFees: 3195150,        // Gas 费用
  medianGas: 651463,       // Median Gas Price
  ethBurned: 3186349,      // ETH 燃烧量
  activeAddresses: 651474, // 活跃地址
  txCount: 651398,         // 交易数量
  ethPrice: 663019,        // ETH 价格
};

// ===== MEV Blocker =====
export const MEV_QUERIES = {
  totalRebates: 2456432,   // 总返还
  rebatesByBuilder: 2771596,// Builder 返还
  rebatesBySearcher: 2771602,// Searcher 返还
  waitTimes: 2441895,      // 等待时间
  volumeProtected: 2635139,// 保护交易量
  successRate: 2441649,    // 成功率
};

// ===== BuilderNet =====
export const BUILDERNET_QUERIES = {
  main: 4341814,           // Revenue/Bundles/Blocks/Operators
  gasRefunds: 4378423,     // Total/Recipients/Max Refund
  monthlyRefunds: 4378475, // Monthly Refund Chart
  publicKeys: 4258012,     // Public Keys / Operators
};

// ===== L2 MEV (Atomic Arb & Sandwich) =====
export const L2MEV_QUERIES = {
  // Atomic Arbitrage
  atomicArbByChain: 3416651,    // Volume by Chain (1Y)
  atomicArbTradeCount: 3416499, // Trade Count
  atomicArbCumulative: 3416882, // Cumulative Volume
  atomicArb1M: 3635408,         // 1 Month Stats
  // Sandwich
  sandwichCumulative: 3601907,  // Cumulative Volume
  sandwichTradeCount: 3601836,  // Trade Count by Chain
  // Base MEV Bot
  baseMevBotExtracted: 3688247, // Extracted Value
  baseMevBotDaily: 4628919,     // Daily Summary
};

export function getAllQueries() {
  return {
    blob: Object.entries(BLOB_QUERIES).map(([name, id]) => ({ name, id })),
    dex: Object.entries(DEX_QUERIES).map(([name, id]) => ({ name, id })),
    staking: Object.entries(STAKING_QUERIES).map(([name, id]) => ({ name, id })),
    ethereum: Object.entries(ETH_QUERIES).map(([name, id]) => ({ name, id })),
    mev: Object.entries(MEV_QUERIES).map(([name, id]) => ({ name, id })),
    buildernet: Object.entries(BUILDERNET_QUERIES).map(([name, id]) => ({ name, id })),
    l2mev: Object.entries(L2MEV_QUERIES).map(([name, id]) => ({ name, id })),
  };
}
