import { Model, RawRecord } from '@nozbe/watermelondb';
import {
  date, readonly
} from '@nozbe/watermelondb/decorators';
import { IRawSyncableRecord } from './models';

export  interface RawProject extends IRawSyncableRecord {
  name: string;
  description?: string;
  homepage: string;
  is_public: boolean;
  parent_id?: string;
  author_id: string;
  identifier?: string;
  status: number;
  has_shared_budget: number;
  type: string;
  lft?: number;
  rgt?: number;
  inherit_members: boolean;
  default_version_id?: number;
  default_assigned_to_id?: number;
  start_date?: number;
  due_date?:  number;
  deleted_at?:  number;
  validated_on?:  number;
}

export class Project extends Model {
  static table = 'projects';
  public _raw!: RawProject;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
