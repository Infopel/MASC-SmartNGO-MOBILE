import {TxKeyPath} from 'i18n/i18n';
import {CreateTaskDiaryParserParams} from './parser.d';
import {createTaskDiary} from 'storage/mutations/task-diary.mutations';

export async function CreateTaskDiaryParser(
  data: CreateTaskDiaryParserParams,
  contextId: string,
): Promise<TxKeyPath | undefined> {
  const {
    'challenges-n-lesson': challenges,
    'date-end': date_end,
    'date-start': date_start,
    'evidence-type': evidence_type,
    'execution-percentage': execution_percentage,
    'generic-comments': generic_comments,
    'imidiact-result': imidiact_result,
    'masc-contribuition': masc_contribuition,
    'meeting-description': meeting_description,
    'next-steps': next_steps,
    'number-of-females': number_of_females,
    'number-of-males': number_of_males,
    'spended-hours': number_of_spended_hours,
    'task-objetive': task_objetive,
    'type-of-goal': type_of_goal,
    'verification-methods': verification_methods,
    'verification-source': verification_source,
    'who-to-inform': who_to_inform,
    'text-evidences': evidences,
    'image-evidences': imageEvidences,
    realized,
    indicator,
    name,
    Upload,
    goal,
  } = data;

  try {
    await createTaskDiary(
      {
        challenges,
        date_end,
        date_start,
        evidence_type,
        execution_percentage,
        generic_comments,
        imidiact_result,
        masc_contribuition,
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
        realized,
        evidences,
        Evidences: imageEvidences,
        indicator,
        name,
        Upload,
        goal,
      },
      contextId,
    );
    return undefined;
  } catch (e) {
    console.log(e);

    return 'form.error_retry';
  }
}
