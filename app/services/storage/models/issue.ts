import { Model, RawRecord } from '@nozbe/watermelondb';
import { date, field, readonly, relation, text } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import Relation from '@nozbe/watermelondb/Relation';
import { Initiative } from './initiative';
import { IRawSyncableRecord } from './models';
import { Project } from './project';
export interface RawIssue extends IRawSyncableRecord {
  tracker_id: number;
  project_id: number;
  subject: string;
  description?: string;
  due_date?: number;
  category_id?: number;
  status_id: number;
  assigned_to_id?: number;
  priority_id: number;
  fixed_version_id?: number;
  author_id: number;
  lock_version: number;
  start_date?: number;
  done_ratio: number;
  estimated_hours?: number;
  parent_id?: number;
  root_id?: number;
  lft?: number;
  rgt?: number;
  is_private?: boolean;
  closed_at?: number;
  is_aproved?: boolean;
  aproved_by?: number;
  aproved_at?: number;
  solicitacao_fundos_id?: number;
  iniciativa_id?: string;
}

export class Issue extends Model {
  static table = 'issues';
  public _raw!: RawIssue;

  public static associations: Associations = {
    projects: {
      type: 'belongs_to',
      key: 'project_id',
    },
    iniciativa: {
      type: 'belongs_to',
      key: 'iniciativa_id',
    },
  };

  @readonly @text('subject') subject!: string;
  @readonly @text('description') description!: string;
  @readonly @date('due_date') dueDate!: Date;
  @readonly @field('done_ratio') doneRatio!: number;
  @readonly @field('is_aproved') isApproved!: boolean;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  @relation(Project.table, 'project_id') project!: Relation<Project>;
  @relation(Initiative.table, 'iniciativa_id')
  initiative!: Relation<Initiative>;
}
