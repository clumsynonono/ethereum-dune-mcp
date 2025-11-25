// Dune API Response Types
export interface DuneQueryResult {
  execution_id: string;
  query_id: number;
  state: 'QUERY_STATE_PENDING' | 'QUERY_STATE_EXECUTING' | 'QUERY_STATE_COMPLETED' | 'QUERY_STATE_FAILED';
  submitted_at: string;
  expires_at: string;
  execution_started_at?: string;
  execution_ended_at?: string;
  result?: {
    rows: any[];
    metadata: {
      column_names: string[];
      column_types: string[];
      row_count: number;
      result_set_bytes: number;
      total_row_count: number;
      datapoint_count: number;
      pending_time_millis: number;
      execution_time_millis: number;
    };
  };
}

export interface DuneExecuteResponse {
  execution_id: string;
  state: string;
}

// EIP-1559 Types
export interface BaseFeeData {
  block_number: number;
  timestamp: string;
  base_fee_gwei: number;
  base_fee_change_percent: number;
}

export interface BurnedEthStats {
  total_burned_eth: number;
  burned_last_24h: number;
  burned_last_7d: number;
  burned_last_30d: number;
  avg_burn_rate_per_block: number;
}

export interface PriorityFeeData {
  timestamp: string;
  avg_priority_fee_gwei: number;
  median_priority_fee_gwei: number;
  p95_priority_fee_gwei: number;
}

// Blob Types
export interface BlobStats {
  date: string;
  total_blobs: number;
  total_blob_transactions: number;
  avg_blobs_per_tx: number;
  unique_addresses: number;
}

export interface BlobGasPrice {
  block_number: number;
  timestamp: string;
  blob_gas_price_wei: number;
  blob_gas_used: number;
  excess_blob_gas: number;
}

// MEV Types
export interface MEVBoostStats {
  date: string;
  total_mev_reward_eth: number;
  mev_boost_blocks: number;
  total_blocks: number;
  mev_boost_percentage: number;
  avg_mev_per_block_eth: number;
}

export interface BuilderStats {
  builder_name: string;
  blocks_built: number;
  total_mev_eth: number;
  avg_mev_per_block_eth: number;
  market_share_percent: number;
}

export interface SearcherActivity {
  searcher_address: string;
  total_transactions: number;
  total_profit_eth: number;
  avg_profit_per_tx_eth: number;
  success_rate_percent: number;
}

// Cache Types
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}
