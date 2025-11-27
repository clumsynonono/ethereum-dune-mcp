import axios, { AxiosInstance } from 'axios';
import { DuneQueryResult, DuneExecuteResponse } from '../types/index.js';

export class DuneClient {
  private client: AxiosInstance;
  private apiKey: string;
  private baseURL = 'https://api.dune.com/api/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'X-Dune-API-Key': this.apiKey,
      },
    });
  }

  /**
   * Get cached results only (does NOT consume API credits)
   * This fetches results from the last execution by the query owner
   */
  async getCachedResults(queryId: number, limit?: number): Promise<any[]> {
    try {
      const params: Record<string, any> = {};
      if (limit) params.limit = limit;

      const response = await this.client.get<DuneQueryResult>(
        `/query/${queryId}/results`,
        { params }
      );

      if (response.data.result && response.data.result.rows.length > 0) {
        return response.data.result.rows;
      }
      throw new Error('No cached results available');
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error(`Failed to get cached results: ${error.message}`);
    }
  }

  /**
   * Execute a Dune query by ID (CONSUMES API CREDITS)
   */
  async executeQuery(queryId: number, parameters?: Record<string, any>): Promise<string> {
    try {
      const response = await this.client.post<DuneExecuteResponse>(
        `/query/${queryId}/execute`,
        parameters ? { query_parameters: parameters } : {}
      );
      return response.data.execution_id;
    } catch (error: any) {
      throw new Error(`Failed to execute query ${queryId}: ${error.message}`);
    }
  }

  /**
   * Get query execution status
   */
  async getExecutionStatus(executionId: string): Promise<DuneQueryResult> {
    try {
      const response = await this.client.get<DuneQueryResult>(
        `/execution/${executionId}/status`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get execution status: ${error.message}`);
    }
  }

  /**
   * Get query results by execution ID
   */
  async getExecutionResults(executionId: string): Promise<DuneQueryResult> {
    try {
      const response = await this.client.get<DuneQueryResult>(
        `/execution/${executionId}/results`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get execution results: ${error.message}`);
    }
  }

  /**
   * Execute query and wait for results (CONSUMES API CREDITS)
   */
  async executeAndWait(
    queryId: number,
    parameters?: Record<string, any>,
    maxWaitTime: number = 180000
  ): Promise<DuneQueryResult> {
    const executionId = await this.executeQuery(queryId, parameters);
    const startTime = Date.now();
    const pollInterval = 2000;

    while (Date.now() - startTime < maxWaitTime) {
      const status = await this.getExecutionStatus(executionId);

      if (status.state === 'QUERY_STATE_COMPLETED') {
        return await this.getExecutionResults(executionId);
      } else if (status.state === 'QUERY_STATE_FAILED') {
        throw new Error('Query execution failed');
      }

      await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }

    throw new Error('Query execution timeout');
  }

  /**
   * Default method: Get cached results only
   * Use executeAndWait() if you need fresh data (will consume credits)
   */
  async getResults(queryId: number, options?: { limit?: number }): Promise<any[]> {
    return this.getCachedResults(queryId, options?.limit);
  }
}
