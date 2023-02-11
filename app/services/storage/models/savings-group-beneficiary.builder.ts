import {Beneficiary} from 'storage/models/beneficiary';
import {Cycle} from './cycle';
import {SavingsGroup} from './savings-group';
import {SavingsGroupBeneficiary} from './savings-group-beneficiary';
import {User} from './user';

type SavingsGroupBeneficiaryRecordBuilder = (
  record: SavingsGroupBeneficiary,
) => void;
export type CreateSavingsGroupBeneficiaryRecordParams = {
  id?: string;
  savings: number;
  loan: number;
  interestFee: number;
  fine: number;
  interestFeeFine: number;
  interest: number;
  businessActivity: string;
  socialFund: number;
  activeMember?: boolean;
  savingsApplication: string;
  creditBenefit: string;
};

export function createSavingsGroupBeneficiaryRecord(
  {
    id,
    savings,
    loan,
    interest,
    interestFee,
    fine,
    activeMember,
    savingsApplication,
    creditBenefit,
    interestFeeFine,
    businessActivity,
    socialFund,
  }: CreateSavingsGroupBeneficiaryRecordParams,
  cycle: Cycle,
  savingsGroup: SavingsGroup,
  beneficiary: Beneficiary,
  user: User,
): SavingsGroupBeneficiaryRecordBuilder {
  return (rec: SavingsGroupBeneficiary) => {
    if (id) {
      rec._raw.id = id;
    }
    rec.createdBy.set(user);
    rec.savingsGroup.set(savingsGroup);
    rec.cycle.set(cycle);
    rec._raw.idBeneficiario = beneficiary._raw.id

    rec.activity = businessActivity;
    rec.savings = savings;
    rec.loan = loan;
    rec.interestFeeFine = interestFeeFine;
    rec.interest = interest;
    rec.interestFee = interestFee;
    rec.fine = fine;
    rec.activeMember = activeMember;
    rec.creditBenefit = creditBenefit;
    rec.savingsApplication = savingsApplication;
    rec.socialFundValue = socialFund;
  };
}
