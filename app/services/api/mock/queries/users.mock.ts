import {DEFAULT_API_CONFIG} from 'api/api-config';
import {paths} from 'api/api-params';
import {rest} from 'msw';
import {RawPostAuthRequest} from './../../api.types';
import {db} from './seed';
const url = DEFAULT_API_CONFIG.url;

export default [
  rest.post<RawPostAuthRequest, {uid: string; soma: string}>(
    url + paths.user.login,
    async (req, res, ctx) => {
      const {email, password} = await req.json();
      if (
        password === 'smartngo@2022' &&
        db.user.getAll().find(user => user.login === email)
      ) {
        return res(
          ctx.status(200),
          ctx.json({
            token: db.user.getAll()[0].token,
            date: new Date().toISOString(),
          }),
        );
      } else {
        return res(
          ctx.status(404),
          ctx.json("User not found or password doesn't match"),
        );
      }
    },
  ),
  rest.get<{token: string}>(
    url + paths.user.get_user,
    async (req, res, ctx) => {
      const auth = req.headers.get('Authorization');
      const token = auth?.replace('Bearer ', '');
      const user = db.user.getAll().find(u => u.token === token);
      if (user && token === user.token) {
        return res(
          ctx.status(200),
          ctx.json({
            name: user.firstname + ' ' + user.lastname,
            username: user.login,
          }),
        );
      }
      return res(
        ctx.status(401),
        ctx.json("You don't have permission to access this resource."),
      );
    },
  ),
];
