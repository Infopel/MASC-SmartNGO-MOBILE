import { Beneficiary } from './beneficiary';
import { User } from './user';


type BeneficiaryRecordBuilder = (record: Beneficiary) => void;
export type CreateBeneficiaryRecordParams = {
  id?: string;
  motivoDesistencia?: string;
  conhecimentoEspaco: boolean;
  participacaoEspaco: boolean;
  actividadePolitica: boolean;
  conhecimentoIncubadora?: string;
  comments: string;
  gender: string;
  wealth?: string;
  occupation: string;
  firstName: string;
  lastName: string;
  liveWithParents?: boolean;
  numberOfChildren?: number;
  dateOfBirth: number;
  zone?: string;
  grade: string;
  maritalStatus: string;
};

export function createBeneficiaryRecord({
  id,
  participacaoEspaco,
  comments,
  gender,
  motivoDesistencia,
  occupation,
  firstName,
  lastName,
  actividadePolitica,
  conhecimentoEspaco,
  conhecimentoIncubadora,
  zone,
  wealth,
  dateOfBirth,
  grade,
  liveWithParents,
  numberOfChildren,
  maritalStatus,
}: CreateBeneficiaryRecordParams, user: User): BeneficiaryRecordBuilder {
  return (rec: Beneficiary) => {
    if (id) {
      rec._raw.id = id;
    }

    rec.createdBy.set(user);
    rec.firstName = firstName;
    rec.lastName = lastName;
    rec.politicalActivity = actividadePolitica;
    rec.spaceKnowleadge = conhecimentoEspaco;
    rec.incubatorKnowledge = conhecimentoIncubadora;
    rec.dateOfBirth = new Date(dateOfBirth);
    rec.grade = grade;
    rec.maritalStatus = maritalStatus;
    rec.function = occupation;
    rec.quittingReason = motivoDesistencia;
    rec. gender= gender;
    rec.observations = comments;
    rec.spaceParticipation = participacaoEspaco;
    rec.numberOfChildren = numberOfChildren;
    rec.livingWithParents = liveWithParents;
    rec.zone = zone;
    rec.wealth = wealth;
  };
}
