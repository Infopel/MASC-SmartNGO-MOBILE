import {Model, RawRecord} from '@nozbe/watermelondb';
import {date, readonly, relation} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';
import Relation from '@nozbe/watermelondb/Relation';
import {Issue} from './issue';
import {IRawSyncableRecord} from './models';
import {Project} from './project';

export interface RawTimeEntry extends IRawSyncableRecord {
  project_id: number;
  user_id: string;
  issue_id?: number;
  hours: number;
  comments?: string;
  activity_id: number;
  spent_on: Date;
  tyear: number;
  tmonth: number;
  tweek: number;
  start_date?: number;
  due_date?: number;
  masc_contribuition?: string;
  falloup?: string;
  challenge_lessons?: string;
  metting_result?: string;
  metting_descrption?: string;
  verification_type?: string;
  evidence_type?: string;
  peoople_to_inform?: string;
  custom_type: string;
  is_reported: boolean;
  is_approved: boolean;
}

export class TimeEntry extends Model {
  static table = 'time_entries';
  public _raw!: RawTimeEntry;

  public static associations: Associations = {
    projects: {
      type: 'belongs_to',
      key: 'project_id',
    },
    issues: {
      type: 'belongs_to',
      key: 'project_id',
    },
  };

  @relation(Project.table, 'project_id') project!: Relation<Project>;
  @relation(Issue.table, 'issue_id') issue!: Relation<Issue>;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
