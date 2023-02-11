import { Action } from './action';

export type CreateActionRecordParams = {
  id?: string;
  name:string
  initiativeId: string;
  tipoAccao?: number;
  assunto?: string;
  dataFormacao?: number;
  coordenador?: string;
  descricao?: string;
  nrParticipantesHomesn?: number;
  resultados?: string;
  observacoes?: string;
  nrParticipantesMulheres?: number;
};
type ActionRecordBuilder = (record: Action) => void;
export function createActionRecord({
  id,
  name,
  initiativeId,
  assunto,
  coordenador,
  descricao,
  nrParticipantesHomesn,
  resultados,
  tipoAccao,
  observacoes,
  dataFormacao,
  nrParticipantesMulheres,
}: CreateActionRecordParams): ActionRecordBuilder {
  console.log({  id,
    name,
    initiativeId,
    assunto,
    coordenador,
    descricao,
    nrParticipantesHomesn,
    resultados,
    tipoAccao,
    observacoes,
    dataFormacao,
    nrParticipantesMulheres,})
  return (rec: Action) => {
    if (id) {
      rec._raw.id = id;
    }

    rec._raw.descricao = name;
    rec._raw.assunto = assunto;
    rec._raw.coordenador = coordenador;
    rec._raw.dataFormacao = dataFormacao;
    rec._raw.descricao = descricao;
    rec._raw.idIniciativa = initiativeId;
    rec._raw.nrParticipantesHomesn = nrParticipantesHomesn;
    rec._raw.nrParticipantesMulheres = nrParticipantesMulheres;
    rec._raw.observacoes = observacoes;
    rec._raw.resultados = resultados;
    rec._raw.tipoAccao = tipoAccao;
  };
}
