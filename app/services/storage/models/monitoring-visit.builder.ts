import { Initiative } from './initiative';
import { MonitoringVisit } from './monitoring-visit';

export type CreateMonitoringVisitRecordParams = {
  id?: string;
  motive: string;
  date: Date;
  type: string;
};
type MonitoringVisitRecordBuilder = (record: MonitoringVisit) => void;
export function createMonitoringVisitRecord(
  {id, motive, date, type}: CreateMonitoringVisitRecordParams,
  initiative: Initiative,
): MonitoringVisitRecordBuilder {
  return (rec: MonitoringVisit) => {
    if (id) {
      rec._raw.id = id;
    }

    rec.motive = motive;
    rec.date = date;
    rec.type = type;
    rec.initiative.set(initiative);
  };
}
