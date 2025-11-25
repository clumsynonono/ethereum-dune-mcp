import { DuneClient } from '../utils/duneClient.js';
import { SimpleCache } from '../utils/cache.js';
import { DUNE_QUERIES, isQueryConfigured } from '../utils/queryConfig.js';

export class BlobTools {
  private duneClient: DuneClient;
  private cache: SimpleCache;

  constructor(duneClient: DuneClient, cache: SimpleCache) {
    this.duneClient = duneClient;
    this.cache = cache;
  }

  /**
   * Get blob statistics (EIP-4844 data)
   */
  async getBlobStats(days: number = 7): Promise<any> {
    const cacheKey = `blob_stats_${days}d`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const queryId = DUNE_QUERIES.blobs.dailyStats;
    if (!isQueryConfigured(queryId)) {
      return {
        error: 'Query not configured',
        message: 'Please configure the blob stats query ID in src/utils/queryConfig.ts',
        instructions: 'Search for "blob" or "EIP-4844" queries on Dune',
        recommended_dashboards: [
          'https://dune.com/ethereum_study/blobs',
          'https://dune.com/cryptokoryo/blobs',
        ],
      };
    }

    try {
      const results = await this.duneClient.getResults(queryId, { days });
      this.cache.set(cacheKey, results, 300000);
      return results;
    } catch (error: any) {
      throw new Error(`Failed to fetch blob stats: ${error.message}`);
    }
  }

  /**
   * Get blob gas price data
   */
  async getBlobGasPrice(days: number = 7): Promise<any> {
    const cacheKey = `blob_gas_price_${days}d`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const queryId = DUNE_QUERIES.blobs.blobGasPrice;
    if (!isQueryConfigured(queryId)) {
      return {
        error: 'Query not configured',
        message: 'Please configure the blob gas price query ID in src/utils/queryConfig.ts',
        instructions: 'Look for "blob gas price" or "blob fee" queries on Dune',
      };
    }

    try {
      const results = await this.duneClient.getResults(queryId, { days });
      this.cache.set(cacheKey, results, 300000);
      return results;
    } catch (error: any) {
      throw new Error(`Failed to fetch blob gas price: ${error.message}`);
    }
  }

  /**
   * Get blob usage breakdown by L2
   */
  async getBlobUsageByL2(days: number = 30): Promise<any> {
    const cacheKey = `blob_usage_l2_${days}d`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const queryId = DUNE_QUERIES.blobs.blobUsageByL2;
    if (!isQueryConfigured(queryId)) {
      return {
        error: 'Query not configured',
        message: 'Please configure the blob usage by L2 query ID in src/utils/queryConfig.js',
        instructions: 'Search for queries showing blob usage per L2 (Arbitrum, Optimism, Base, etc.)',
      };
    }

    try {
      const results = await this.duneClient.getResults(queryId, { days });
      this.cache.set(cacheKey, results, 600000); // Cache for 10 minutes (slower changing data)
      return results;
    } catch (error: any) {
      throw new Error(`Failed to fetch blob usage by L2: ${error.message}`);
    }
  }

  /**
   * Analyze blob transaction patterns
   */
  async analyzeBlobTransactions(days: number = 7): Promise<any> {
    const cacheKey = `blob_tx_analysis_${days}d`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const queryId = DUNE_QUERIES.blobs.blobTransactions;
    if (!isQueryConfigured(queryId)) {
      return {
        error: 'Query not configured',
        message: 'Please configure the blob transactions query ID in src/utils/queryConfig.ts',
        instructions: 'Find queries analyzing blob transaction counts and patterns',
      };
    }

    try {
      const results = await this.duneClient.getResults(queryId, { days });
      this.cache.set(cacheKey, results, 300000);
      return results;
    } catch (error: any) {
      throw new Error(`Failed to analyze blob transactions: ${error.message}`);
    }
  }

  /**
   * Execute custom blob-related query
   */
  async customQuery(queryId: number, parameters?: Record<string, any>): Promise<any> {
    const cacheKey = `custom_blob_${queryId}_${JSON.stringify(parameters || {})}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const results = await this.duneClient.getResults(queryId, parameters);
      this.cache.set(cacheKey, results, 300000);
      return results;
    } catch (error: any) {
      throw new Error(`Failed to execute custom blob query ${queryId}: ${error.message}`);
    }
  }
}
