/**
 * Dune Query IDs Configuration
 *
 * 已配置的查询来自知名的 Dune dashboards：
 * - ultrasound.money / msilb7 (EIP-1559)
 * - glxyresearch_team / 0xRob (Blobs)
 * - ChainsightAnalytics / CometShock (MEV-Boost)
 *
 * 如何添加更多查询：
 * 1. 访问 https://dune.com/browse/dashboards
 * 2. 搜索相关主题
 * 3. 打开图表，点击 "View Query"
 * 4. 从 URL 获取 query ID: https://dune.com/queries/12345 -> ID 是 12345
 */

export const DUNE_QUERIES = {
  // EIP-1559 Related Queries
  // Dashboard: https://dune.com/msilb7/EIP1559-Base-Fee-x-Tip-by-Block
  // Dashboard: https://dune.com/ultrasoundmoney
  eip1559: {
    baseFeeHistory: 0, // 推荐: 访问 dune.com/msilb7/EIP1559-Base-Fee-x-Tip-by-Block
    burnedEthDaily: 0, // 推荐: ultrasound.money dashboard 上的 daily burn 查询
    burnedEthTotal: 0, // 推荐: ultrasound.money dashboard 上的 total burn 查询
    priorityFeeStats: 0, // 推荐: msilb7 的 tip statistics 查询
    feeMarketAnalysis: 0, // 推荐: 综合 fee market 分析查询
  },

  // Blob (EIP-4844) Related Queries
  // Dashboard: https://dune.com/glxyresearch_team/eip-4844-blobs
  // Dashboard: https://dune.com/0xRob/blobs
  // Dashboard: https://dune.com/ephema/eip-4844-the-impact-of-blobs
  blobs: {
    dailyStats: 0, // 推荐: glxyresearch_team 的 blob daily stats
    blobGasPrice: 0, // 推荐: 0xRob 的 blob gas price 查询
    blobUsageByL2: 0, // 推荐: ephema 的 L2 blob usage 查询
    blobTransactions: 0, // 推荐: glxyresearch_team 的 blob tx count 查询
  },

  // MEV Related Queries
  // Dashboard: https://dune.com/ChainsightAnalytics/mev-after-ethereum-merge
  // Dashboard: https://dune.com/CometShock/mev-boost-builder-stats
  // Dashboard: https://dune.com/lsquared/mev-boost-detailed
  mev: {
    mevBoostStats: 0, // 推荐: ChainsightAnalytics 的 MEV-Boost daily stats
    builderStats: 1279809, // ✅ MEV-Boost Builder Stats (已配置)
    builderLifetime: 1298718, // ✅ MEV-Boost Builder Lifetime Stats (已配置)
    relayStats: 0, // 推荐: ChainsightAnalytics 的 relay statistics
    searcherActivity: 0, // 推荐: flashbots 的 searcher activity 查询
    mevTrends: 0, // 推荐: lsquared 的 MEV trends 查询
  },
};

/**
 * Recommended Dune Dashboards to explore:
 *
 * EIP-1559:
 * - Ultra Sound Money: https://dune.com/ultrasoundmoney
 * - ETH Burned: https://dune.com/hildobby/eth-burned
 *
 * Blobs (EIP-4844):
 * - Blob Analysis: https://dune.com/ethereum_study/blobs
 * - L2 Blob Usage: https://dune.com/cryptokoryo/blobs
 *
 * MEV:
 * - MEV-Boost: https://dune.com/ChainsightAnalytics/mev-boost
 * - MEV Overview: https://dune.com/flashbots/mev-overview
 * - Builder Analytics: https://dune.com/hildobby/ethereum-builders
 */

export function isQueryConfigured(queryId: number): boolean {
  return queryId !== 0;
}

export function getQueryDescription(category: string, queryName: string): string {
  const descriptions: Record<string, Record<string, string>> = {
    eip1559: {
      baseFeeHistory: 'Historical base fee data per block',
      burnedEthDaily: 'Daily ETH burned through EIP-1559',
      burnedEthTotal: 'Total ETH burned statistics',
      priorityFeeStats: 'Priority fee (tip) statistics',
      feeMarketAnalysis: 'Overall fee market analysis',
    },
    blobs: {
      dailyStats: 'Daily blob transaction statistics',
      blobGasPrice: 'Blob gas price trends',
      blobUsageByL2: 'Blob usage breakdown by L2',
      blobTransactions: 'Blob transaction counts',
    },
    mev: {
      mevBoostStats: 'MEV-Boost block statistics',
      builderStats: 'Block builder market share and stats',
      relayStats: 'MEV relay statistics',
      searcherActivity: 'Top MEV searcher activity',
      mevTrends: 'MEV extraction trends',
    },
  };

  return descriptions[category]?.[queryName] || 'No description available';
}
