import {
  date, relation, text
} from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import Relation from '@nozbe/watermelondb/Relation';
import { Initiative } from './initiative';
import { IRawSyncableRecord, SyncableModel } from './models';

export interface RawMonitoringVisit extends IRawSyncableRecord {
  motive: string;
  idIniciativa: string;
  date: number;
  type: string;
}
export class MonitoringVisit extends SyncableModel {
  public static table = 'visitamonitoria';
  public static associations: Associations = {};
  public _raw!: RawMonitoringVisit;
  @text('motive') motive!: string;
  @date('date') date!: Date;
  @text('type') type!: string;

  @relation(Initiative.table, 'idIniciativa') initiative!: Relation<Initiative>;
}