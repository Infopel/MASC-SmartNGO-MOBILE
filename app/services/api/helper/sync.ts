import {RawInitiative} from 'storage/models/initiative';
import {
  PullResult,
  PushResult,
  RawPullResult,
  RawPushResult,
  SyncChecks,
} from 'api/api.types';
import {IRawSyncableRecord} from 'storage/models/models';
import {parse} from 'date-fns';
import { isNil } from 'lodash';

export function parseSyncPullResult(pullResult: RawPullResult): PullResult {
  const {
    Localizacao,
    accao,
    beneficiario,
    beneficiarioiniciativa,
    iniciativa,
    issues,
    participantesaccao,
    projects,
    users,
    ciclo,
    monitoriagrupo,
    poupancabeneficiario,
    grupopoupanca,
    time_entries,
    tipoaccao,
    planoaccao,
    visitamonitoria,
    reporteplanoaccao,
    monitoriapoupanca,
  } = pullResult.changes;

  return {
    changes: {
      monitoriapoupanca: parsePull(
        monitoriapoupanca,
        ({
          contribuiuFundoSocial,
          actividadeRendimento,
          aplicacaoDinheiro,
          beneficioCredito,
          dataMonitoria,
          idPoupancaBen,
          valorEmprestimo,
          valorJuro,
          valorMulta,
          valorPoupado,
        }) => ({
          contribuiuFundoSocial: isNil(contribuiuFundoSocial) ? undefined : contribuiuFundoSocial,
          actividadeRendimento,
          aplicacaoDinheiro,
          beneficioCredito,
          dataMonitoria: parseDate(dataMonitoria),
          idPoupancaBen,
          valorEmprestimo,
          valorJuro,
          valorMulta,
          valorPoupado,
        }),
      ),
      visitamonitoria: parsePull(
        visitamonitoria,
        ({date, idIniciativa, motive, type}) => ({
          date: parseDate(date),
          idIniciativa,
          motive,
          type,
        }),
      ),
      reporteplanoaccao: parsePull(
        reporteplanoaccao,
        ({endDate, startDate, idPlanoAccao, observations, doneRatio}) => ({
          end_date: parseDate(endDate),
          start_date: parseDate(startDate),
          observations,
          done_ratio: doneRatio,
          idPlanoAccao,
        }),
      ),
      planoaccao: parsePull(
        planoaccao,
        ({endDate, startDate, name, idIniciativa, doneRatio}) => ({
          end_date: parseDate(endDate),
          start_date: parseDate(startDate),
          name,
          done_ratio: doneRatio,
          idIniciativa,
        }),
      ),
      poupancabeneficiario: parsePull(
        poupancabeneficiario,
        ({
          idGrupoPoupanca,
          juro,
          idCiclo,
          idBeneficiario,
          taxaJuro,
          actividade,
          taxaJuroMulta,
          valorEmprestimo,
          valorFundoSocal,
          valorPoupanca,
          valorMulta,
        }) => ({
          idGrupoPoupanca,
          juro,
          idCiclo,
          idBeneficiario,
          taxaJuro,
          actividade,
          taxaJuroMulta,
          valorEmprestimo,
          valorFundoSocal,
          valorPoupanca,
          valorMulta,
        }),
      ),
      ciclo: parsePull(
        ciclo,
        ({idGrupoPoupanca, cod, dataFim, dataInicio,nome}) => ({
          idGrupoPoupanca,
          cod,
          nome,
          dataFim: parseDate(dataFim),
          dataInicio: parseDate(dataInicio),
        }),
      ),
      monitoriagrupo: parsePull(
        monitoriagrupo,
        ({
          idGrupoPoupanca,
          dataMonitoria,
          idUser,
          idCiclo,
          jurosObtidosFundoSocial,
          jurosObtidosPoupanca,
          problemasGrupo,
          tipoCooperativa,
          evoluiuCooperativa,
        }) => ({
          idGrupoPoupanca,
          dataMonitoria: parseDate(dataMonitoria),
          idCiclo,
          idUser: idUser.toString(),
          jurosObtidosFundoSocial,
          jurosObtidosPoupanca,
          problemasGrupo,
          tipoCooperativa,
          evoluiuCooperativa,
        }),
      ),
      grupopoupanca: parsePull(
        grupopoupanca,
        ({
          codigo,
          dataConstituicao,
          fundoSocial,
          idIniciativa,
          idLocalizacao,
          nrMembrosActivos,
          nrCiclos,
          nrMembros,
          taxaJuro,
          valorMulta,
        }) => ({
          codigo,
          dataConstituicao: parseDate(dataConstituicao),
          fundoSocial,
          idIniciativa,
          idLocalizacao,
          nrMembrosActivos,
          nrCiclos,
          nrMembros,
          taxaJuro,
          valorMulta,
        }),
      ),
      accao: parsePull(
        accao,
        ({
          assunto,
          resultados,
          coordenador,
          dataFormacao,
          descricao,
          tipoAccao,
          idIniciativa,
          nrParticipantesHomesn,
          nrParticipantesMulheres,
          observacoes,
        }) => {
          return {
            idIniciativa,
            coordenador,
            dataFormacao: parseDate(dataFormacao),
            assunto,
            resultados,
            descricao,
            tipoAccao,
            observacoes,
            nrParticipantesHomesn,
            nrParticipantesMulheres,
          };
        },
      ),
      beneficiario: parsePull(
        beneficiario,
        ({
          actividadePolitica,
          apelido,
          bens,
          conhecimentoEspaco,
          codigo,
          dataNascimento,
          conhecimentoIncubadora,
          estadoCivil,
          foto,
          escolaridade,
          genero,
          funcao,
          latitude,
          longitude,
          motivoDesistencia,
          nome,
          nrFilhos,
          participacaoEspaco,
          observacoes,
          povoado,
          viveComParentes,
        }) => ({
          actividadePolitica,
          apelido,
          bens,
          conhecimentoEspaco,
          codigo,
          dataNascimento: parseDate(dataNascimento),
          conhecimentoIncubadora,
          estadoCivil,
          //foto: foto, //!SECTION This is a blob object
          escolaridade,
          genero,
          funcao,
          latitude,
          longitude,
          motivoDesistencia,
          nome,
          nrFilhos,
          participacaoEspaco,
          observacoes,
          povoado,
          viveComParentes,
        }),
      ),
      beneficiarioiniciativa: parsePull(
        beneficiarioiniciativa,
        ({idBeneficiario, idIniciativa}) => ({
          beneficiary_id: idBeneficiario.toString(),
          initiative_id: idIniciativa.toString(),
        }),
      ),
      iniciativa: parsePull(iniciativa, ini => {
        const {
          bairro,
          codigo,
          dataConstituicao,
          idMobilizador,
          idLocalizacao,
          idResponsavel,
          project_id,
          latitude,
          longitude,
          nome,
          tipoIniciativa,
        } = ini;
        return {
          bairro,
          codigo,
          dataConstituicao: parseDate(dataConstituicao),
          idMobilizador: idMobilizador?.toString(),
          idLocalizacao: idLocalizacao?.toString(),
          project_id,
          latitude,
          longitude,
          idResponsavel: idResponsavel?.toString(),
          nome,
          tipoIniciativa: tipoIniciativa as RawInitiative['tipoIniciativa'],
        };
      }),
      issues: parsePull(
        issues,
        ({
          author_id,
          done_ratio,
          is_aproved,
          lock_version,

          project_id,
          status_id,
          priority_id,
          tracker_id,
          aproved_by,
          aproved_on,
          assigned_to_id,
          closed_on,
          is_private,
          description,
          subject,
          fixed_version_id,
          lft,
          parent_id,
          iniciativa_id,
          rgt,
          due_date,
          solicitacao_fundos_id,
          start_date,
          category_id,
          root_id,
          estimated_hours,
        }) => ({
          aproved_at: parseDate(aproved_on),
          closed_at: parseDate(closed_on),
          author_id,
          done_ratio,
          is_aproved,
          lock_version,

          project_id,
          status_id,
          priority_id,
          tracker_id,
          aproved_by,

          assigned_to_id,
          closed_on,
          is_private,
          description,
          subject,
          fixed_version_id,
          lft,
          parent_id,
          iniciativa_id,
          rgt,
          due_date: parseDate(due_date),
          solicitacao_fundos_id,
          start_date: parseDate(start_date),
          category_id,
          root_id,
          estimated_hours,
        }),
      ),
      Localizacao: parsePull(Localizacao, ({designacao, idPai}) => ({
        designacao,
        idPai,
      })),
      participantesaccao: parsePull(
        participantesaccao,
        ({idBeneficiario, idAccao}) => ({
          idBeneficiario: idBeneficiario.toString(),
          idAccao: idAccao.toString(),
        }),
      ),
      projects: parsePull(
        projects,
        ({
          default_assigned_to_id,
          default_version_id,
          due_date,
          description,
          homepage,
          is_public,
          inherit_members,
          lft,
          start_date,
          parent_id,
          author_id,
          status,
          identifier,
          name,
          validated_on,
          has_shared_budget,
          type,
          rgt,
        }) => ({
          default_assigned_to_id,
          default_version_id,
          due_date: parseDate(due_date),
          description,
          homepage,
          is_public,
          inherit_members,
          lft,
          start_date: parseDate(start_date),
          parent_id: parent_id?.toString(),
          author_id: author_id?.toString(),
          status,
          identifier,
          name,
          validated_on: parseDate(validated_on),
          has_shared_budget,
          type,
          rgt,
        }),
      ),
      time_entries: parsePull(
        time_entries,
        ({
          hours,
          is_approved,
          is_reported,
          activity_id,
          project_id,
          custom_type,
          tweek,
          tmonth,
          tyear,
          user_id,
          comments,
          spent_on,
          challenge_lessons,
          falloup,
          due_date,
          issue_id,
          masc_contribuition,
          metting_descrption,
          peoople_to_inform,
          start_date,
          metting_result,
          evidence_type,
          verification_type,
        }) => ({
          hours,
          is_approved,
          is_reported,
          activity_id,
          project_id,
          custom_type,
          tweek,
          tmonth,
          tyear,
          user_id: user_id.toString(),
          comments,
          spent_on,
          challenge_lessons,
          falloup,
          due_date: parseDate(due_date),
          issue_id,
          masc_contribuition,
          metting_descrption,
          peoople_to_inform,
          start_date: parseDate(start_date),
          metting_result,
          evidence_type,
          verification_type,
        }),
      ),
      tipoaccao: parsePull(tipoaccao, ({designacao}) => ({
        descricao: designacao,
      })),
      users: parsePull(
        users,
        ({
          admin,
          firstname,
          login,
          lastname,
          email_verified_at,
          password,
          auth_source_id,
          identity_url,

          last_login_on,
          mail_notification,
          language,
          must_change_passwd,
          passwd_changed_on,
          status,
          type,
          high_privilege,
          remember_token,
        }) => ({
          admin,
          firstname,
          login,
          lastname,
          email_verified_at,
          password,
          auth_source_id,
          identity_url,

          last_login_on,
          mail_notification,
          language,
          must_change_passwd,
          passwd_changed_on,
          status,
          type,
          high_privilege,
          remember_token,
        }),
      ),
    },
    timestamp: pullResult.timestamp,
  };
}

type ILocalRecord<T extends IRawSyncableRecord> = Omit<
  T,
  '_status' | 'last_modified' | '_changed'
>;

type OutSyncRecords<T> = {
  created: T[];
  updated: T[];
  deleted: string[];
};
type InputSyncRecords<T extends SyncChecks> = {
  created: T[];
  updated: T[];
  deleted: string[];
};
export function parseSyncPushResult(pushResult: RawPushResult): PushResult {
  return pushResult;
}

function parsePull<
  I extends SyncChecks,
  P extends Omit<I, keyof SyncChecks | 'id'>,
  O extends ILocalRecord<IRawSyncableRecord>,
  K extends Omit<O, keyof IRawSyncableRecord>
>(records: InputSyncRecords<I>, parser: (input: P) => K): OutSyncRecords<O> {
  function preParse({
    createdBy,
    deleted_at,
    created_on,
    createdOn,
    updated_on,
    created_by,
    removed_by,
    removedBy,
    removedOn,
    updated_by,
    updatedOn,
    updatedBy,
    id,
    ...rest
  }: I) {
    // console.log("parsePull", )
    return {
      ...parser(<P>{...rest}),
      ...parseSyncChecks({
        id,
        created_by,
        removed_by,
        updated_by,
        createdBy,
        deleted_at,
        created_on,
        createdOn,
        updated_on,
        removedBy,
        removedOn,
        updatedOn,
        updatedBy,
      }),
    };
  }

  return {
    created: (records.created.map(preParse) as unknown) as O[],
    updated: (records.updated.map(preParse) as unknown) as O[],
    deleted: records.deleted,
  };
}

function parseSyncChecks<I extends SyncChecks, O extends IRawSyncableRecord>({
  createdBy,
  created_by,
  createdOn,
  removedOn,
  removedBy,
  removed_by,
  updatedBy,
  updated_by,
  updatedOn,
  created_on,
  updated_on,
  deleted_at,
  id,
}: I): ILocalRecord<O> {
  return ({
    id: id.toString(),
    created_by: createdBy ?? created_by,
    removed_by: removedBy ?? removed_by,
    updated_by: updatedBy ?? updated_by,
    created_at: parseDate(created_on ?? createdOn) as number,
    removed_at: parseDate(deleted_at ?? removedOn),
    updated_at: parseDate(updated_on ?? updatedOn),
  } as unknown) as ILocalRecord<O>;
}

const DATE_FORMAT_REF = "yyyy-MM-dd'T'HH:mm:ss.SSSX";
function parseDate(text?: string): number | undefined {
  if (!text) return undefined;
  return parse(text, DATE_FORMAT_REF, new Date()).getTime();
}