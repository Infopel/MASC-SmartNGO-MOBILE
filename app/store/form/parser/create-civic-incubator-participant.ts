import {TxKeyPath} from 'i18n/i18n';
import {CreateCivicIncubatorParticipantParserParams} from './parser.d';

import {createBeneficiaryAndInitiative} from 'storage/mutations/beneficiary-and-initiative.mutations';
export async function createCivicIncubatorParticipant(
  data: CreateCivicIncubatorParticipantParserParams,
  contextId: string,
): Promise<TxKeyPath | undefined> {
  const {
    observations,
    'education-level': education_level,
    occupation,
    actividadePolitica,
    conhecimentoEspaco,
    participacaoEspaco,
    conhecimentoIncubadora,
    'birth-date': birth_date,
    'last-name': last_name,
    'first-name': first_name,
    gender,
    'marital-status': marital_status,
  } = data;

  console.log(createCivicIncubatorParticipant, data, {
    birth_date,
    timestamp: new Date(birth_date).getTime(),
  });

  try {
    await createBeneficiaryAndInitiative({
      firstName: first_name,
      lastName: last_name,
      dateOfBirth: !birth_date ? undefined : new Date(birth_date).getTime(),
      grade: education_level,
      actividadePolitica: actividadePolitica === '1',
      comments: observations,
      conhecimentoEspaco: conhecimentoEspaco === '1',
      conhecimentoIncubadora: conhecimentoIncubadora,
      participacaoEspaco: participacaoEspaco === '1',
      gender: gender as 'M' | 'F',
      occupation,
      maritalStatus: marital_status,
      initiativeId: contextId,
    });
    return undefined;
  } catch (e) {
    console.log(e);

    return 'form.error_retry';
  }
}
