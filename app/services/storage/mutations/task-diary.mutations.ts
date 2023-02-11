import {database} from '../database';
import {TimeEntry} from '../models/time-entry';
import {createTimeEntryRecord} from '../models/time-entry.builder';

export type TaskDiaryParams = {
  chalenges: string;
  date_end: number;
  date_start: number;
  evidence_type: string;
  execution_percentage: number;
  generic_comments: string;
  imidiact_result: string;
  masc_contribuition: string;
  meeting_description: string;
  next_steps: string;
  number_of_females: number;
  number_of_males: number;
  number_of_spended_hours: number;
  task_objetive: string;
  type_of_goal: string;
  verification_methods: string;
  verification_source: string;
  who_to_inform: string;
  realized: string;
  evidences: string;
  indicator: string;
  name: string;
  upload: string;
};
export function createTaskDiary(taskDiary: TaskDiaryParams, taskId: string) {
  return database.write(() => {
    return database
      .get<TimeEntry>(TimeEntry.table)
      .create(createTimeEntryRecord({...taskDiary, taskId}));
  });
}
