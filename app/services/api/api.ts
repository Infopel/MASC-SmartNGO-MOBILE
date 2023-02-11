import {ApiResponse, create, ApisauceInstance} from 'apisauce';
import {load} from 'utils/keychain';
import {ApiConfig, DEFAULT_API_CONFIG} from './api-config';
import {getGeneralApiProblem} from './api-problem';
import * as Types from './api.types';
import {useUserStore} from 'store/user/user.store';
/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  //@ts-ignore
  apisauce: ApisauceInstance;

  /**
   * Configurable options.
   */
  config: ApiConfig;

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance

    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    });

    this.apisauce.addAsyncRequestTransform(async request => {
      const token = (await load()).password;
      request.headers['Authorization'] = `Bearer ${token}`;
    });

    this.apisauce.addAsyncResponseTransform(async response => {
      console.log('API SAUCE intercept ', response);
      if (response.status === 403) {
        const {signOut} = useUserStore();
        signOut(true);
      }

      return response
    });
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    const convertUser = (raw: any) => {
      return {
        id: raw.id,
        name: raw.name,
      };
    };

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data;
      const resultUsers: Types.User[] = rawUsers.map(convertUser);
      return {kind: 'ok', users: resultUsers};
    } catch {
      return {kind: 'bad-data'};
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      };
      return {kind: 'ok', result: resultUser};
    } catch {
      return {kind: 'bad-data'};
    }
  }
}
