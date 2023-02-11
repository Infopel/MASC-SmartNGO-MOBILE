import {TxKeyPath} from 'i18n/i18n';

export type IUserStore = {
  user?: IUser;
  state: UserState;
  signInError?: TxKeyPath;
  authLocalUser: () => void;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
};

type UserState = 'signed_in' | 'signed_out' | 'pending';

export type IUser = {
  name: string;
  email: string;
};
