import {ApiResponse, CancelToken} from 'apisauce';
import {save} from 'utils/keychain';
import {Api} from './api';
import {getUserUrl, userSignInUrl} from './api-params';
import {parseApiResponse} from './api-problem';
import {
  AuthResult,
  GetAuthResult,
  RawGetUserRequest,
  GetUserResult,
  RawPostAuthResult,
  UserResult,
  RawGetUserResult,
  RawPostAuthRequest,
} from './api.types';
import {parseGetUser, parseSignIn} from './helper/user';

const API_PAGE_SIZE = 50;

export class UserApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  /**
   * Gets a single user by ID
   */

  async signIn(email: string, password: string): Promise<GetAuthResult> {
    try {
      // make the api call
      const source = CancelToken.source();

      const response: ApiResponse<RawPostAuthResult> = await this.api.apisauce.post(
        userSignInUrl(),
        {
          email,
          password,
        } as RawPostAuthRequest,
        {cancelToken: source.token},
      );

      console.log('response', response);

      const aux = parseApiResponse<RawPostAuthResult, AuthResult>(response)(
        parseSignIn,
      );

      if (aux.kind === 'ok') {
        save(email, aux.result.token);
      }
      return aux;
    } catch (e) {
      //@ts-ignore
      console.tron?.error?.(e.message, e.stack);

      return {kind: 'bad-data'};
    }
  }
  async getUser(token: string): Promise<GetUserResult> {
    try {
      // make the api call
      const source = CancelToken.source();

      const response: ApiResponse<RawGetUserResult> = await this.api.apisauce.get(
        getUserUrl(),
        
        {cancelToken: source.token},
      );

      console.log('getUser ', {response});

      return parseApiResponse<RawGetUserResult, UserResult>(response)(
        parseGetUser,
      );
    } catch (e) {
      //@ts-ignore
      console.tron?.error?.(e.message, e.stack);

      return {kind: 'bad-data'};
    }
  }
}
