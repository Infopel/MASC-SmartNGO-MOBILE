import { BeneficiaryInitiative } from 'storage/models/beneficiary-initiative';
import { Beneficiary } from './beneficiary';
import { Initiative } from './initiative';

type BeneficiaryinitiativeRecordBuilder = (record: BeneficiaryInitiative) => void;

export function createBeneficiaryInitiativeRecord(
  beneficiary: Beneficiary,
  initiative: Initiative,
): BeneficiaryinitiativeRecordBuilder {
  return (rec: BeneficiaryInitiative) => {
    rec._raw.id = beneficiary._raw.id + '_' + initiative._raw.id;
    rec.beneficiary.set(beneficiary);
    rec.initiative.set(initiative);
  };
}
