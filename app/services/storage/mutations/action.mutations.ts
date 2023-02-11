import {database} from 'storage/database';
import {createActionRecord} from 'storage/models/action.builder';
import {Action} from 'storage/models/action';

export type CreateActionParams = {
  initiativeId: string;
  tipoAccao?: number;
  assunto?: string;
  dataFormacao?: number;
  coordenador?: string;
  name: string;
  descricao?: string;
  nrParticipantesHomesn?: number;
  resultados?: string;
  observacoes?: string;
  nrParticipantesMulheres?: number;
};
export async function createAction(params: CreateActionParams): Promise<void> {
  await database.write(
    async () =>
      await database
        .get<Action>(Action.table)
        .create(createActionRecord(params)),
  );
}
