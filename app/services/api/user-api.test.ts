import {Environment} from 'models/environment';
import {UserApi} from './user-api';

describe('User Api', () => {
  it('should get signin info', async () => {
    const env = new Environment();
    await env.setup();
    const api = new UserApi(env.api);
    const response = await api.signIn('marco.polo', 'smartngo@2022');
    expect(response.kind).toBe('ok');
  });
  it('should get error if email is wrong', async () => {
    const env = new Environment();
    await env.setup();
    const api = new UserApi(env.api);
    const response = await api.signIn('marco.polos', 'wrong-password');

    expect(response.kind).toBe('not-found');
  });
  it('should get user data from email from token', async () => {
    const env = new Environment();
    await env.setup();
    const api = new UserApi(env.api);
    const response = await api.signIn('marco.polo', 'smartngo@2022');

    //@ts-expect-error
    const res = await api.getUser(response.result.token);
    expect(res.kind).toBe('ok');
  });
});
