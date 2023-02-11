import { Q } from '@nozbe/watermelondb';
import {
  date, lazy, relation, text
} from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import Relation from '@nozbe/watermelondb/Relation';
import { map } from 'rxjs';
import { Initiative } from './initiative';
import { IRawSyncableRecord, SyncableModel } from './models';

export interface RawActionPlan extends IRawSyncableRecord {
  name: string;
  idIniciativa: string;
  start_date: number;
  end_date: number;
}
export class ActionPlan extends SyncableModel {
  public static table = 'planoaccao';
  public static associations: Associations = {};
  public _raw!: RawActionPlan;
  @text('name') name!: string;
  @date('start_date') startDate!: Date;
  @date('end_date') endDate!: Date;
  @lazy doneRatio = this.collections
    .get('reporteplanoaccao')
    .query(Q.where('idPlanoAccao', this.id), Q.sortBy('created_at', 'desc'))
    .observe()
    .pipe(
      map(x => {
        //@ts-expect-error
        return x[0]?.doneRatio;
      }),
    );
  @relation(Initiative.table, 'idIniciativa') initiative!: Relation<Initiative>;
}