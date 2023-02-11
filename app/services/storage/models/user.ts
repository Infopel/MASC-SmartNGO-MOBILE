import {Model, RawRecord} from '@nozbe/watermelondb';
import {date, lazy, text} from '@nozbe/watermelondb/decorators';
import {differenceInYears} from 'date-fns';
import { IRawSyncableRecord } from './models';

export interface RawUser extends IRawSyncableRecord {
  firstname: string;
  lastname: string;
  status: number;
  language: string;
  type: string;
  login: string;
}

export class User extends Model {
  static table = 'users';
  public _raw!: RawUser;
  @text('firstname') firstName!: string;
  @text('lastname') lastName!: string;
  @text('status') status!: Date;
  @text('type') type!: string;

  @lazy fullName = this.firstName + ' ' + this.lastName;
}
