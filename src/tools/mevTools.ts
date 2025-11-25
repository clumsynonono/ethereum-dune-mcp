import { DuneClient } from '../utils/duneClient.js';
import { SimpleCache } from '../utils/cache.js';
import { DUNE_QUERIES, isQueryConfigured } from '../utils/queryConfig.js';

export class MEVTools {
  private duneClient: DuneClient;
  private cache: SimpleCache;

  constructor(duneClient: DuneClient, cache: SimpleCache) {
    this.duneClient = duneClient;
    this.cache = cache;
  }

  /**
   * Get MEV-Boost statistics
   */
  async getMEVBoostStats(days: number = 7): Promise<any> {
    const cacheKey = `mev_boost_${days}d`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const queryId = DUNE_QUERIES.mev.mevBoostStats;
    if (!isQueryConfigured(queryId)) {
      return {
        error: 'Query not configured',
        message: 'Please configure the MEV-Boost stats query ID in src/utils/queryConfig.ts',
        instructions: 'Search for "MEV-Boost" queries on Dune',
        recommended_dashboards: [
          'https://dune.com/ChainsightAnalytics/mev-boost',
          'https://dune.com/flashbots/mev-boost-relays',
        ],
      };
    }

    try {
      const results = await this.duneClient.getResults(queryId, { days });
      this.cache.set(cacheKey, results, 300000);
      return results;
    } catch (error: any) {
      throw new Error(`Failed to fetch MEV-Boost stats: ${error.message}`);
    }
  }

  /**
   * Get block builder statistics
   */
  async getBuilderStats(days: number = 7): Promise<any> {
    const cacheKey = `builder_stats_${days}d`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const queryId = DUNE_QUERIES.mev.builderStats;
    if (!isQueryConfigured(queryId)) {
      return {
        error: 'Query not configured',
        message: 'Builder Stats query ID is already configured (1279809), but you can update it.',
        current_query_id: 1279809,
        instructions: 'This query is from CometShock\'s MEV-Boost Builder Stats dashboard',
        recommended_dashboards: [
          'https://dune.com/CometShock/mev-boost-builder-stats',
          'https://dune.com/ChainsightAnalytics/mev-after-ethereum-merge',
        ],
      };
    }

    try {
      const results = await this.duneClient.getResults(queryId, { days });
      this.cache.set(cacheKey, results, 300000);
      return results;
    } catch (error: any) {
      throw new Error(`Failed to fetch builder stats: ${error.message}`);
    }
  }

  /**
   * Get block builder lifetime statistics
   */
  async getBuilderLifetimeStats(): Promise<any> {
    const cacheKey = 'builder_lifetime_stats';
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const queryId = DUNE_QUERIES.mev.builderLifetime;
    if (!isQueryConfigured(queryId)) {
      return {
        error: 'Query not configured',
        message: 'Builder Lifetime Stats query ID is already configured (1298718)',
        current_query_id: 1298718,
        instructions: 'This query provides lifetime stats for all MEV-Boost builders',
      };
    }

    try {
      const results = await this.duneClient.getResults(queryId);
      this.cache.set(cacheKey, results, 600000); // Cache for 10 minutes (slower changing)
      return results;
    } catch (error: any) {
      throw new Error(`Failed to fetch builder lifetime stats: ${error.message}`);
    }
  }

  /**
   * Get MEV relay statistics
   */
  async getRelayStats(days: number = 7): Promise<any> {
    const cacheKey = `relay_stats_${days}d`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const queryId = DUNE_QUERIES.mev.relayStats;
    if (!isQueryConfigured(queryId)) {
      return {
        error: 'Query not configured',
        message: 'Please configure the relay stats query ID in src/utils/queryConfig.ts',
        instructions: 'Search for "MEV relay" queries on Dune',
      };
    }

    try {
      const results = await this.duneClient.getResults(queryId, { days });
      this.cache.set(cacheKey, results, 300000);
      return results;
    } catch (error: any) {
      throw new Error(`Failed to fetch relay stats: ${error.message}`);
    }
  }

  /**
   * Get MEV searcher activity
   */
  async getSearcherActivity(days: number = 7, limit: number = 20): Promise<any> {
    const cacheKey = `searcher_activity_${days}d_${limit}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const queryId = DUNE_QUERIES.mev.searcherActivity;
    if (!isQueryConfigured(queryId)) {
      return {
        error: 'Query not configured',
        message: 'Please configure the searcher activity query ID in src/utils/queryConfig.ts',
        instructions: 'Look for queries analyzing MEV searcher behavior and profits',
      };
    }

    try {
      const results = await this.duneClient.getResults(queryId, { days, limit });
      this.cache.set(cacheKey, results, 300000);
      return results;
    } catch (error: any) {
      throw new Error(`Failed to fetch searcher activity: ${error.message}`);
    }
  }

  /**
   * Analyze MEV trends over time
   */
  async analyzeMEVTrends(days: number = 30): Promise<any> {
    const cacheKey = `mev_trends_${days}d`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const queryId = DUNE_QUERIES.mev.mevTrends;
    if (!isQueryConfigured(queryId)) {
      return {
        error: 'Query not configured',
        message: 'Please configure the MEV trends query ID in src/utils/queryConfig.ts',
        instructions: 'Find queries showing MEV extraction trends over time',
        recommended_dashboards: [
          'https://dune.com/flashbots/mev-overview',
        ],
      };
    }

    try {
      const results = await this.duneClient.getResults(queryId, { days });
      this.cache.set(cacheKey, results, 600000); // Cache for 10 minutes
      return results;
    } catch (error: any) {
      throw new Error(`Failed to analyze MEV trends: ${error.message}`);
    }
  }

  /**
   * Execute custom MEV-related query
   */
  async customQuery(queryId: number, parameters?: Record<string, any>): Promise<any> {
    const cacheKey = `custom_mev_${queryId}_${JSON.stringify(parameters || {})}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const results = await this.duneClient.getResults(queryId, parameters);
      this.cache.set(cacheKey, results, 300000);
      return results;
    } catch (error: any) {
      throw new Error(`Failed to execute custom MEV query ${queryId}: ${error.message}`);
    }
  }
}
