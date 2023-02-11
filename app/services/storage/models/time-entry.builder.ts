import { TimeEntry } from './time-entry';

type InitiativeRecordBuilder = (record: TimeEntry) => void;
export type CreateTimeEntryRecordParams = {
  id?: string;
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
  taskId: string;
};

export function createTimeEntryRecord({
  id,
  chalenges,
  name,
  upload,
  realized,
  evidences,
  indicator,
  date_end,
  date_start,
  evidence_type,
  execution_percentage,
  generic_comments,
  imidiact_result,
  meeting_description,
  next_steps,
  number_of_females,
  number_of_males,
  number_of_spended_hours,
  task_objetive,
  type_of_goal,
  verification_methods,
  verification_source,
  who_to_inform,
  masc_contribuition,
}: CreateTimeEntryRecordParams): InitiativeRecordBuilder {
  return (rec: TimeEntry) => {
    if (id) {
      rec._raw.id = id;
    }

    rec._raw.challenge_lessons = chalenges;
    rec._raw.comments = generic_comments;
    rec._raw.due_date = date_end;
    rec._raw.start_date = date_start;
    rec._raw.evidence_type = evidence_type;
    rec._raw.metting_descrption = meeting_description;
    rec._raw.verification_type = verification_methods;
    rec._raw.metting_result = imidiact_result;
    rec._raw.peoople_to_inform = who_to_inform
    
  };
}
