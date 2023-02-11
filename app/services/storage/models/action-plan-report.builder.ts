import { ActionPlan } from './action-plan';
import { ActionPlanReport } from './action-plan-report';

export type CreateActionPlanReportRecordParams = {
  id?: string;
  observations: string;
  startDate: Date;
  doneRatio: number;
  endDate: Date;
};
type ActionPlanReportRecordBuilder = (record: ActionPlanReport) => void;
export function createActionPlanReportRecord(
  {
    id,
    observations,
    startDate,
    doneRatio,
    endDate,
  }: CreateActionPlanReportRecordParams,
  actionPlan: ActionPlan,
): ActionPlanReportRecordBuilder {
  return (rec: ActionPlanReport) => {
    if (id) {
      rec._raw.id = id;
    }

    rec.observations = observations;
    rec.startDate = startDate;
    rec.doneRatio = doneRatio;
    rec.endDate = endDate;
    rec.actionPlan.set(actionPlan);
  };
}
