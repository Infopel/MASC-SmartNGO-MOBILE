import {database} from 'storage/database';
import {Beneficiary} from 'storage/models/beneficiary';
import {createBeneficiaryRecord} from 'storage/models/beneficiary.builder';
import {
  BeneficiaryInitiative,
  createBeneficiaryInitiativeRecord,
} from 'storage/models/beneficiary-initiative';
import {Initiative} from '..';

export type createBeneficiaryAndInitiativeParams = {
  firstName: string;
  lastName: string;
  gender?: 'M' | 'F';
  dateOfBirth?: number;
  maritalStatus: string;
  occupation: string;
  conhecimentoIncubadora?: string;
  participacaoEspaco?: boolean;
  conhecimentoEspaco?: boolean;
  actividadePolitica?: boolean;
  comments?: string;
  grade: string;
  initiativeId: string;
  motivoDesistencia?: string;
};
export async function createBeneficiaryAndInitiative({
  initiativeId,
  firstName,
  actividadePolitica,
  comments,
  conhecimentoEspaco,
  dateOfBirth,
  gender,
  grade,
  motivoDesistencia,
  lastName,
  maritalStatus,
  occupation,
  participacaoEspaco,
  conhecimentoIncubadora,
}: createBeneficiaryAndInitiativeParams): Promise<void> {
  const initiative = await database
    .get<Initiative>(Initiative.table)
    .find(initiativeId);

  const beneficiary = await database.write(
    async () =>
      await database.get<Beneficiary>(Beneficiary.table).create(
        createBeneficiaryRecord({
          firstName,
          actividadePolitica,
          comments,
          conhecimentoEspaco,
          dateOfBirth,
          gender,
          grade,
          motivoDesistencia,
          lastName,
          maritalStatus,
          occupation,
          participacaoEspaco,
          conhecimentoIncubadora,
        }),
      ),
  );

  console.log({beneficiary});
  await database.write(async () =>
    database
      .get<BeneficiaryInitiative>(BeneficiaryInitiative.table)
      .create(createBeneficiaryInitiativeRecord(beneficiary, initiative)),
  );
}
