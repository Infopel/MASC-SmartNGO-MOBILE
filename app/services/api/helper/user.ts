import {
  AuthResult, RawGetUserResult,
  RawPostAuthResult, UserResult
} from '../api.types';

export function parseSignIn(input: RawPostAuthResult): AuthResult {
  const {date, token} = input;

  return {
    date,
    token,
  };
}
export function parseGetUser({name, username}: RawGetUserResult): UserResult {
  return {name, email: username};
}
