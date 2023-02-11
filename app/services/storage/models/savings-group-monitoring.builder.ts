import { Cycle } from './cycle';
import { SavingsGroup } from './savings-group';
import { SavingsGroupMonitoring } from './savings-group-monitoring';
import { User } from './user';

type SavingsGroupMonitoringRecordBuilder = (
  record: SavingsGroupMonitoring,
) => void;
export type CreateSavingsGroupMonitoringRecordParams = {
  id?: string;
  monitoringDate: Date;
  problems: string;
  isCooperativeEvolved: boolean;
  type: number;
  socialFundInterest: number;
  savingsInterest: number;
};

export function createSavingsGroupMonitoringRecord(
  {
    id,
    isCooperativeEvolved,
    problems,
    monitoringDate,
    savingsInterest,
    socialFundInterest,
    type,
  }: CreateSavingsGroupMonitoringRecordParams,
  cycle: Cycle,
  savingsGroup: SavingsGroup,
  user: User,
): SavingsGroupMonitoringRecordBuilder {
  return (rec: SavingsGroupMonitoring) => {

    if (id) {
      rec._raw.id = id;
    }
    rec.user.set(user);
    rec.createdBy.set(user);
    rec.cycle.set(cycle);
    rec.savingsGroup.set(savingsGroup);

    rec.date = monitoringDate;
    rec.isCooperativeEvolved = isCooperativeEvolved;
    rec.problems = problems;
    rec.savingsInterest = savingsInterest;
    rec.type = type;
    rec.socialFundInterest = socialFundInterest;
  };
}
