import {SyncDatabaseChangeSet} from '@nozbe/watermelondb/sync';
import {ApiResponse, CancelToken} from 'apisauce';
import {load} from 'utils/keychain';
import {Api} from './api';
import {syncPullUrl, syncPushUrl} from './api-params';
import {parseApiResponse} from './api-problem';
import {
  GetPullResult,
  PostPushResult,
  PullResult,
  PushResult,
  RawPullResult,
  RawPushResult,
} from './api.types';
import {parseSyncPullResult, parseSyncPushResult} from './helper/sync';

const API_PAGE_SIZE = 50;

export class SyncApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  /**
   * Gets a single user by ID
   */

  async push(
    changes: SyncDatabaseChangeSet,
    lastPulledAt: number,
  ): Promise<PostPushResult> {
    try {
      // make the api call
      const source = CancelToken.source();

      const response: ApiResponse<RawPushResult> = await this.api.apisauce.post(
        syncPushUrl(),
        {
          changes,
          lastPulledAt,
        },
        {
          cancelToken: source.token,
        },
      );

      return parseApiResponse<RawPushResult, PushResult>(response)(
        parseSyncPushResult,
      );
    } catch (e) {
      //@ts-ignore
      console.tron?.error?.(e.message, e.stack);

      return {kind: 'bad-data'};
    }
  }
  async pull(
    lastPulledAt: number | null,
    schemaVersion: number | undefined,
    migration: any | null | undefined,
  ): Promise<GetPullResult> {
    try {
      // make the api call
      const source = CancelToken.source();

      const url = syncPullUrl({lastPulledAt, schemaVersion, migration});
      const response: ApiResponse<RawPullResult> = await this.api.apisauce.get(
        url,
        {
          cancelToken: source.token,
        },
      );

      return parseApiResponse<RawPullResult, PullResult>(response)(
        parseSyncPullResult,
      );
    } catch (e) {
      //@ts-ignore
      console.tron?.error?.(e.message, e.stack);

      return {kind: 'bad-data'};
    }
  }
}
