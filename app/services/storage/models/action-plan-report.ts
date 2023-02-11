import { date, field, relation, text } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import Relation from '@nozbe/watermelondb/Relation';
import { ActionPlan } from './action-plan';
import { IRawSyncableRecord, SyncableModel } from './models';

export interface RawActionPlanReport extends IRawSyncableRecord {
  idPlanoAccao: string;
  start_date: number;
  end_date: number;
  done_ratio: number;
  observations: string;
}
export class ActionPlanReport extends SyncableModel {
  public static table = 'reporteplanoaccao';
  public static associations: Associations = {};
  public _raw!: RawActionPlanReport;

  @text('observations') observations!: string;
  @date('start_date') startDate!: Date;
  @date('end_date') endDate!: Date;
  @field('done_ratio') doneRatio!: number;
  @relation(ActionPlan.table, 'idPlanoAccao') actionPlan!: Relation<ActionPlan>;
}
