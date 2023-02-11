import {Q} from '@nozbe/watermelondb';
import {database} from 'storage/database';
import {User} from 'storage/models/user';
export async function getUserByUsername(username: string) {
  const users = await database
    .get<User>(User.table)
    .query(Q.where('login', 'marco.polo'))
    .fetch();

  return users[0];
}
