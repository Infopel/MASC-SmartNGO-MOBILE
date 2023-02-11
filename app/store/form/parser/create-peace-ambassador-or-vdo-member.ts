import {TxKeyPath} from 'i18n/i18n';
import {CreatePeaceAmbassedorOrVdoMemberParams} from './parser';

import {createBeneficiaryAndInitiative} from 'storage/mutations/beneficiary-and-initiative.mutations';
export async function createPeaceAmbassedorOrVdoMemberParser(
  data: CreatePeaceAmbassedorOrVdoMemberParams,
  contextId: string,
): Promise<TxKeyPath | undefined> {
  const {
    'education-level': education_level,
    'why-gave-up': why_gave_up,
    'active-member': active_member,
    'last-name': last_name,
    occupation,
    'first-name': first_name,
    'marital-status': marital_status,
  } = data;

  try {
    await createBeneficiaryAndInitiative({
      firstName: first_name,
      lastName: last_name,
      grade: education_level,
      maritalStatus: marital_status,
      initiativeId: contextId,
      motivoDesistencia: why_gave_up,
      occupation: occupation,
    });
    return undefined;
  } catch (e) {
    console.log(e);

    return 'form.error_retry';
  }
}
