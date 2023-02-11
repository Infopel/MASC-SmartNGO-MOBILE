import {CollectionMap, Query, RawRecord} from '@nozbe/watermelondb';
import Collection from '@nozbe/watermelondb/Collection';
import {
  date,
  nochange,
  readonly,
  relation,
} from '@nozbe/watermelondb/decorators';
import Model, { Associations } from '@nozbe/watermelondb/Model';
import Relation from '@nozbe/watermelondb/Relation';
import { Class } from '@nozbe/watermelondb/utils/common';
import {User} from './user';
export interface IRawSyncableRecord extends RawRecord {
  created_at: number;
  updated_at?: number;
  removed_at?: number;
  created_by?: string;
  updated_by?: string;
  removed_by?: string;
}

export abstract class SyncableModel extends Model {
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  public static associations: Associations = {
    users: {
      type: 'belongs_to',
      key: 'created_by',
    },
  };

  @nochange @relation(User.table, 'created_by') createdBy!: Relation<User>;
  @nochange @relation(User.table, 'updated_by') updatedBy!: Relation<User>;
  @nochange @relation(User.table, 'removed_by') removedBy?: Relation<User>;
}

abstract class Holder<M extends typeof SyncableModel> {
  constructor(private model: M) {
    this.model = model;
  }

  tableName = this.model.table;
}

export type LateRelation<R extends Model> = (x: R) => Relation<R>;
export function lateCollections<R extends SyncableModel>(
  map: CollectionMap,
  x: () => Class<R>,
): Collection<R> {
  return map.get<R>(
    //@ts-expect-error
    new Holder(x.apply(this)).tableName,
  );
}
