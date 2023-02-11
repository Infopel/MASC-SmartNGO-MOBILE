import { SavingsGroupBeneficiary } from './savings-group-beneficiary';
import { SavingsGroupBeneficiaryMonitoring } from './savings-group-beneficiary-monitoring';
import { User } from './user';


type SavingsGroupBeneficiaryMonitoringRecordBuilder = (
  record: SavingsGroupBeneficiaryMonitoring,
) => void;
export type CreateSavingsGroupBeneficiaryMonitoringRecordParams = {
  id?: string;
  saved: number;
  loan: number;
  interest: number;
  fine?: number;
  isSocialFundContribuited: boolean;
  beneficiaryCredit?: string;
  activityIncome?: string;
  applicationMoney?: string;
  date: Date;
};

export function createSavingsGroupBeneficiaryMonitoringRecord(
  {
    id,
    saved,
    loan,
    interest,
    activityIncome,
    applicationMoney,
    beneficiaryCredit,
    date,
    isSocialFundContribuited,
    fine,
  }: CreateSavingsGroupBeneficiaryMonitoringRecordParams,
  savingsGroupBeneficiary: SavingsGroupBeneficiary,
  user: User,
): SavingsGroupBeneficiaryMonitoringRecordBuilder {
  return (rec: SavingsGroupBeneficiaryMonitoring) => {
    if (id) {
      rec._raw.id = id;
    }
    
    rec.savingsGroupBeneficiary.set(savingsGroupBeneficiary);
    rec.createdBy.set(user);
    rec.activityIncomeValue = activityIncome;
    rec.saved = saved;
    rec.loan = loan;
    rec.beneficiaryCredit = beneficiaryCredit;
    rec.interest = interest;
    rec.applicationMoney = applicationMoney;
    rec.fine = fine;
    rec.date = date;
    rec.isSocialFundContribuited = isSocialFundContribuited;
  };
}
