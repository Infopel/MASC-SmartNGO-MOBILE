import { Initiative } from './initiative';
import { Location } from './location';
import { IRawSyncableRecord } from './models';
import { SavingsGroup } from './savings-group';
import { User } from './user';

export interface RawSavingsGroup extends IRawSyncableRecord {
  nrCiclos?: number;
  nrMembros?: number;
  nrMembrosActivos?: number;
  fundoSocial?: number;
  valorMulta?: number;
  taxaJuro?: number;
  codigo: string;
  idIniciativa?: number;
  dataConstituicao: number;
  idLocalizacao?: string;
}

type SavingsGroupRecordBuilder = (record: SavingsGroup) => void;

type SavingsGroupRecordBuilderParams = {
  numberOfCycles: number;
  numberOfMembers: number;
  numberOfActiveMembers: number;
  socialFund: number;
  fineValue: number;
  interestsFee: number;
  dateOfConstitution: number;
};
export function createSavingsGroupRecord(
  params: SavingsGroupRecordBuilderParams,
  initiative: Initiative,
  location: Location,
  user:User
): SavingsGroupRecordBuilder {
  const {
    dateOfConstitution,
    fineValue,
    interestsFee,
    socialFund,
  } = params;
  return (rec: SavingsGroup) => {
    rec.createdBy.set(user);
    rec.location.set(location);
    rec.initiative.set(initiative);
    rec.socialFund = socialFund;
    rec.dateOfConstitution = new Date(dateOfConstitution);
    rec.fineValue = fineValue;
    rec.interestsFee = interestsFee;
  };
}
