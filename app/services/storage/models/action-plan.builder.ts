import { ActionPlan } from './action-plan';
import { Initiative } from './initiative';

export type CreateActionPlanRecordParams = {
  id?: string;
  name: string;
  startDate: Date;
  endDate: Date;
};
type ActionPlanRecordBuilder = (record: ActionPlan) => void;
export function createActionPlanRecord(
  {id, name, startDate, endDate}: CreateActionPlanRecordParams,
  initiative: Initiative,
): ActionPlanRecordBuilder {
  return (rec: ActionPlan) => {
    if (id) {
      rec._raw.id = id;
    }

    rec.name = name;
    rec.startDate = startDate;
    rec.endDate = endDate;
    rec.initiative.set(initiative);
  };
}
