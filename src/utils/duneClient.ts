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
   * Execute a Dune query by ID
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
   * Get query results
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
   * Get latest results from a query (without executing)
   */
  async getLatestResults(queryId: number): Promise<DuneQueryResult> {
    try {
      const response = await this.client.get<DuneQueryResult>(
        `/query/${queryId}/results`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get latest results for query ${queryId}: ${error.message}`);
    }
  }

  /**
   * Execute query and wait for results (with polling)
   */
  async executeAndWait(
    queryId: number,
    parameters?: Record<string, any>,
    maxWaitTime: number = 180000 // 3 minutes
  ): Promise<DuneQueryResult> {
    const executionId = await this.executeQuery(queryId, parameters);
    const startTime = Date.now();
    const pollInterval = 2000; // 2 seconds

    while (Date.now() - startTime < maxWaitTime) {
      const status = await this.getExecutionStatus(executionId);

      if (status.state === 'QUERY_STATE_COMPLETED') {
        return await this.getExecutionResults(executionId);
      } else if (status.state === 'QUERY_STATE_FAILED') {
        throw new Error(`Query execution failed`);
      }

      // Wait before polling again
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }

    throw new Error('Query execution timeout');
  }

  /**
   * Helper method to get results (tries latest first, executes if needed)
   */
  async getResults(queryId: number, parameters?: Record<string, any>): Promise<any[]> {
    try {
      // Try to get latest cached results first (faster, saves API quota)
      const latestResults = await this.getLatestResults(queryId);
      if (latestResults.result && latestResults.result.rows.length > 0) {
        return latestResults.result.rows;
      }
    } catch (error) {
      // If latest results fail, execute the query
      console.error('Latest results not available, executing query...');
    }

    // Execute query and wait for results
    const result = await this.executeAndWait(queryId, parameters);
    return result.result?.rows || [];
  }
}
