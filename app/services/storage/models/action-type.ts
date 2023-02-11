import { Model, RawRecord } from '@nozbe/watermelondb';
import { date, readonly } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import { IRawSyncableRecord } from './models';

export interface RawActionType extends IRawSyncableRecord {
  descricao?: string;
}

export class ActionType extends Model {
  static table = 'tipoaccao';
  public _raw!: RawActionType;

  public static associations: Associations = {
    beneficiarioActionType: {
      type: 'has_many',
      foreignKey: 'tipoAccao',
    },
  };

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
