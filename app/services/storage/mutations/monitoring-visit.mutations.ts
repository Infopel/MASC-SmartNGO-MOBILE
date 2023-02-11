import { TxKeyPath } from 'i18n/i18n';
import { database } from 'storage/database';
import { Initiative } from 'storage/models/initiative';
import { MonitoringVisit } from 'storage/models/monitoring-visit';
import { createMonitoringVisitRecord } from 'storage/models/monitoring-visit.builder';
import { CreateMonitoringVisitsParserParams } from 'store/form/parser/parser';

export async function createMonitoringVisit(
  {date, motive, type}: CreateMonitoringVisitsParserParams,
  initiativeId: string,
): Promise<TxKeyPath | undefined> {
  console.log({date, type, motive});
  const initiative = await database
    .get<Initiative>(Initiative.table)
    .find(initiativeId);

  try {
    database.write(async () => {
      return database.get<MonitoringVisit>(MonitoringVisit.table).create(
        createMonitoringVisitRecord(
          {
            type: type as string,
            date: new Date(date as string),
            motive: motive as string,
          },
          initiative,
        ),
      );
    });
  } catch (e) {
    return 'form.error_retry';
  }
}
