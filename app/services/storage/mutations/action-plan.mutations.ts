import {TxKeyPath} from 'i18n/i18n';
import {database} from 'storage/database';
import {ActionPlan} from 'storage/models/action-plan';
import {createActionPlanRecord} from 'storage/models/action-plan.builder';
import {ActionPlanReport} from 'storage/models/action-plan-report';
import {createActionPlanReportRecord} from 'storage/models/action-plan-report.builder';
import {Initiative} from 'storage/models/initiative';
import {
  CreateActionPlanParserParams,
  CreateReportActionPlanProgressParserParams,
} from 'store/form/parser/parser';

export async function createActionPlan(
  {
    'end-date': endDate,
    'start-date': startDate,
    name,
  }: CreateActionPlanParserParams,
  initiativeId: string,
): Promise<TxKeyPath | undefined> {
  const initiative = await database
    .get<Initiative>(Initiative.table)
    .find(initiativeId);

  try {
    database.write(async () => {
      return database.get<ActionPlan>(ActionPlan.table).create(
        createActionPlanRecord(
          {
            name: name as string,
            endDate: new Date(endDate as string),
            startDate: new Date(startDate as string),
          },
          initiative,
        ),
      );
    });
  } catch (e) {
    return 'form.error_retry';
  }
}

export async function createActionPlanReport(
  {
    'done-ratio': doneRatio,
    'end-date': endDate,
    'start-date': startDate,
    observations,
  }: CreateReportActionPlanProgressParserParams,
  actionPlanId: string,
) {
  const initiative = await database
    .get<ActionPlan>(ActionPlan.table)
    .find(actionPlanId);

  try {
    database.write(async () => {
      return database.get<ActionPlanReport>(ActionPlanReport.table).create(
        createActionPlanReportRecord(
          {
            observations: observations as string,
            doneRatio: parseInt(doneRatio as string),
            endDate: new Date(endDate as string),
            startDate: new Date(startDate as string),
          },
          initiative,
        ),
      );
    });
  } catch (e) {
    return 'form.error_retry';
  }
}
