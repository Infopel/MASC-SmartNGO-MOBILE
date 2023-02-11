import { TxKeyPath } from 'i18n/i18n';
import { createAction } from 'storage/mutations/action.mutations';
import { CreatePeaceAmbassedorOrVdoActionParams } from './parser';
export async function createPeaceAmbassedorOrVdoActionParser(
  data: CreatePeaceAmbassedorOrVdoActionParams,
  contextId: string,
): Promise<TxKeyPath | undefined> {
  const {
    type,
    name,
    'realization-date': realization_date,
    goal,
    coordinator,
    number_of_participants_male,
    number_of_participants_female,
    observations,
  } = data;

  console.log({
    realization_date,
    type,
    name,
    coordinator,
    number_of_participants_male,
    number_of_participants_female,
  });

  try {
    await createAction({
      dataFormacao: !realization_date
        ? undefined
        : new Date(realization_date).getTime(),
      observacoes: observations,
      initiativeId: contextId,
      tipoAccao: (type as unknown) as number,
      //TODO - add section_types_other and developed_actions
      coordenador: coordinator,
      descricao: name ?? goal,
      nrParticipantesHomesn: (number_of_participants_male as unknown) as number,
      nrParticipantesMulheres: (number_of_participants_female as unknown) as number,
    });
    return undefined;
  } catch (e) {
    console.log(e);

    return 'form.error_retry';
  }
}
