import AsyncStorage from '@react-native-async-storage/async-storage';
import {GeneralApiProblem} from 'api/api-problem';
import {UserResult} from 'api/api.types';
import {UserApi} from 'api/user-api';
import {Environment} from 'models/environment';
import {load, save} from 'utils/keychain';
import create from 'zustand';
import {IUserStore} from './user.types';
const IS_USER_LOCAL_AUTH = "IS_USER_LOCALLY_AUTH"
export const useUserStore = create<IUserStore>()((set, get) => ({
  user: undefined,
  signInError: undefined,
  state: 'signed_out',
  authLocalUser: () => {
    const signOutUser = () => set({state: 'signed_out', user: undefined});
    loadLocalUser()
      .then(result => {
        console.log('authLocalUser -> loadLocalUser', result);
        if (result) {
          console.log('authLocalUser -> loadLocalUser 2', result);
          const {user, token} = result;
          set({state: 'signed_in', user});
          getUserInfo(token)
            .then(userResult => {
              console.log('authLocalUser -> getUserInfo', {result});
              if (
                typeof userResult === 'string' &&
                userResult === 'unauthorized'
              )
                signOutUser();
              else {
                set({user, state: 'signed_in'});
              }
            })
            .catch(e => {
              console.log("'authLocalUser -> loadLocalUser'", e);
              signOutUser();
            });
        } else {
          signOutUser();
        }
      })
      .catch(signOutUser);
  },
  signIn(username, password) {
    set({state: 'pending', signInError:undefined});

    setTimeout(() => {
      signIn(username, password).then(result => {
        console.log('auth', {result});
        if (typeof result === 'string') {
          const error =
            result === 'bad-data' ||
            result === 'unknown' ||
            result === 'rejected' ||
            result === 'timeout'
              ? 'server'
              : result;
          set({
            state: 'signed_out',
            signInError: `login.error.${error}`,
            user: undefined,
          });
        } else {
          set({state: 'signed_in', user: result, signInError: undefined});
        }
      });
    }, 1000);
  },
  signOut() {
    set({
      state: 'signed_out',
      user: undefined,
    });
    AsyncStorage.removeItem(IS_USER_LOCAL_AUTH).then(()=> {})
  },
}));

async function signIn(
  username: string,
  password: string,
): Promise<UserResult | GeneralApiProblem['kind']> {
  const env = new Environment();
  await env.setup();
  const api = new UserApi(env.api);
  const response = await api.signIn(username, password);
  if (response.kind === 'ok') {
    const token = response.result.token;

    const userInfo = await getUserInfo(token);
    if (typeof userInfo !== 'string') {
      await saveUserInfo(userInfo, token);
    }
    return userInfo;
  }
  return response.kind;
}

async function getUserInfo(
  token: string,
): Promise<UserResult | GeneralApiProblem['kind']> {
  const env = new Environment();
  await env.setup();
  const api = new UserApi(env.api);
  try {
    const response = await api.getUser(token);
    console.log("getUserInfo",{response})
    if (response.kind === 'ok') {
      return response.result;
    }
    return response.kind;
  } catch (e) {
    return 'unknown';
  }
}

async function saveUserInfo(user: UserResult, token: string) {
  await save(JSON.stringify(user), token);
  await AsyncStorage.setItem(IS_USER_LOCAL_AUTH, "true")
}

async function loadLocalUser(): Promise<{
  user: UserResult;
  token: string;
} | null> {
  const isLocal = await AsyncStorage.getItem(IS_USER_LOCAL_AUTH)
  
   if(!isLocal) return null
  const {username: user, password: token} = await load();

  if (!user || !token) return null;

  const userResult = JSON.parse(user) as UserResult;
  return {user: userResult, token};
}
