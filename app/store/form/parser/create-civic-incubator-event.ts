import { TxKeyPath } from 'i18n/i18n';
import { createAction } from 'storage/mutations/action.mutations';
import { CreateCivicIncubatorEventParserParams } from './parser';
export async function createCivicIncubatorEvent(
  data: CreateCivicIncubatorEventParserParams,
  contextId: string,
): Promise<TxKeyPath | undefined> {
  const {
    realization_date,
    type,
    name,
    type_other,
    subject,
    coordinator,
    number_of_participants_male,
    number_of_participants_female,
    developed_actions,
    action_results,
    action_results_other,
    observations,
  } = data;


  try {
    await createAction({
      dataFormacao: !realization_date
        ? undefined
        : new Date(realization_date).getTime(),
      observacoes: observations,
      assunto: subject,
      initiativeId: contextId,
      tipoAccao: (type as unknown) as number,
      //TODO - add section_types_other and developed_actions
      coordenador: coordinator,
      descricao: name,
      nrParticipantesHomesn: (number_of_participants_male as unknown) as number,
      nrParticipantesMulheres: (number_of_participants_female as unknown) as number,
      resultados: action_results_other ?? action_results,
    });
    return undefined;
  } catch (e) {
    console.log(e);

    return 'form.error_retry';
  }
}
