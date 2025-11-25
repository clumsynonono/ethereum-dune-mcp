import { DuneClient } from '../utils/duneClient.js';
import { SimpleCache } from '../utils/cache.js';
import { DUNE_QUERIES, isQueryConfigured } from '../utils/queryConfig.js';

export class EIP1559Tools {
  private duneClient: DuneClient;
  private cache: SimpleCache;

  constructor(duneClient: DuneClient, cache: SimpleCache) {
    this.duneClient = duneClient;
    this.cache = cache;
  }

  /**
   * Get base fee history data
   */
  async getBaseFeeHistory(days: number = 7): Promise<any> {
    const cacheKey = `basefee_${days}d`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const queryId = DUNE_QUERIES.eip1559.baseFeeHistory;
    if (!isQueryConfigured(queryId)) {
      return {
        error: 'Query not configured',
        message: 'Please configure the base fee history query ID in src/utils/queryConfig.ts',
        instructions: 'Find a suitable query at https://dune.com/browse/dashboards (search for "base fee")',
      };
    }

    try {
      const results = await this.duneClient.getResults(queryId, { days });
      this.cache.set(cacheKey, results, 300000); // Cache for 5 minutes
      return results;
    } catch (error: any) {
      throw new Error(`Failed to fetch base fee history: ${error.message}`);
    }
  }

  /**
   * Get burned ETH statistics
   */
  async getBurnedEthStats(timeframe: '24h' | '7d' | '30d' | 'all' = 'all'): Promise<any> {
    const cacheKey = `burned_eth_${timeframe}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const queryId = DUNE_QUERIES.eip1559.burnedEthTotal;
    if (!isQueryConfigured(queryId)) {
      return {
        error: 'Query not configured',
        message: 'Please configure the burned ETH query ID in src/utils/queryConfig.ts',
        instructions: 'Check out https://dune.com/ultrasoundmoney for ETH burn data',
        suggestion: 'You can also use custom query_id parameter if you know a specific query',
      };
    }

    try {
      const results = await this.duneClient.getResults(queryId, { timeframe });
      this.cache.set(cacheKey, results, 300000);
      return results;
    } catch (error: any) {
      throw new Error(`Failed to fetch burned ETH stats: ${error.message}`);
    }
  }

  /**
   * Get priority fee statistics
   */
  async getPriorityFeeStats(days: number = 7): Promise<any> {
    const cacheKey = `priority_fee_${days}d`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const queryId = DUNE_QUERIES.eip1559.priorityFeeStats;
    if (!isQueryConfigured(queryId)) {
      return {
        error: 'Query not configured',
        message: 'Please configure the priority fee stats query ID in src/utils/queryConfig.ts',
        instructions: 'Search for "priority fee" or "miner tip" queries on Dune',
      };
    }

    try {
      const results = await this.duneClient.getResults(queryId, { days });
      this.cache.set(cacheKey, results, 300000);
      return results;
    } catch (error: any) {
      throw new Error(`Failed to fetch priority fee stats: ${error.message}`);
    }
  }

  /**
   * Analyze current fee market conditions
   */
  async analyzeFeeMarket(): Promise<any> {
    const cacheKey = 'fee_market_analysis';
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const queryId = DUNE_QUERIES.eip1559.feeMarketAnalysis;
    if (!isQueryConfigured(queryId)) {
      return {
        error: 'Query not configured',
        message: 'Please configure the fee market analysis query ID in src/utils/queryConfig.ts',
        instructions: 'Look for comprehensive fee market dashboards on Dune',
      };
    }

    try {
      const results = await this.duneClient.getResults(queryId);
      this.cache.set(cacheKey, results, 180000); // Cache for 3 minutes (more volatile data)
      return results;
    } catch (error: any) {
      throw new Error(`Failed to analyze fee market: ${error.message}`);
    }
  }

  /**
   * Execute custom Dune query (fallback for unconfigured queries)
   */
  async customQuery(queryId: number, parameters?: Record<string, any>): Promise<any> {
    const cacheKey = `custom_${queryId}_${JSON.stringify(parameters || {})}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const results = await this.duneClient.getResults(queryId, parameters);
      this.cache.set(cacheKey, results, 300000);
      return results;
    } catch (error: any) {
      throw new Error(`Failed to execute custom query ${queryId}: ${error.message}`);
    }
  }
}
