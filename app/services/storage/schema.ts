import {appSchema, ColumnSchema, tableSchema} from '@nozbe/watermelondb';
import {ActionPlan} from 'storage/models/action-plan';
import {Initiative} from 'storage/models/initiative';
import {Location} from 'storage/models/location';
import {User} from 'storage/models/user';
import {Action} from './models/action';
import {ActionPlanReport} from './models/action-plan-report';
import {ActionType} from './models/action-type';
import {Beneficiary} from './models/beneficiary';
import {BeneficiaryInitiative} from './models/beneficiary-initiative';
import {Cycle} from './models/cycle';
import {Issue} from './models/issue';
import {MonitoringVisit} from './models/monitoring-visit';
import {ParticipantAction} from './models/participant-action';
import {Project} from './models/project';
import {SavingsGroup} from './models/savings-group';
import {SavingsGroupBeneficiary} from './models/savings-group-beneficiary';
import {SavingsGroupBeneficiaryMonitoring} from './models/savings-group-beneficiary-monitoring';
import {SavingsGroupMonitoring} from './models/savings-group-monitoring';
import {TimeEntry} from './models/time-entry';

const syncCheckColumns: ColumnSchema[] = [
  {
    name: 'created_at',
    type: 'number',
  },
  {
    name: 'updated_at',
    type: 'number',
  },
  {
    name: 'removed_at',
    type: 'number',
    isOptional: true,
  },
  {
    name: 'created_by',
    type: 'number',
    isOptional: true,
  },
  {
    name: 'removed_by',
    type: 'number',
    isOptional: true,
  },
  {
    name: 'updated_by',
    type: 'number',
    isOptional: true,
  },
];

const beneficiary: ColumnSchema[] = [
  {name: 'codigo', isOptional: true, type: 'string'},
  {name: 'nome', isOptional: true, type: 'string'},
  {name: 'apelido', isOptional: true, type: 'string'},
  {name: 'dataNascimento', isOptional: true, type: 'number'},
  {name: 'estadoCivil', isOptional: true, type: 'string'},
  {name: 'genero', isOptional: true, type: 'string'},
  {name: 'escolaridade', isOptional: true, type: 'string'},
  {name: 'nrFilhos', isOptional: true, type: 'number'},
  {name: 'bens', isOptional: true, type: 'string'},
  {name: 'viveComParentes', isOptional: true, type: 'boolean'},
  {name: 'motivoDesistencia', isOptional: true, type: 'string'},
  {name: 'conhecimentoEspaco', isOptional: true, type: 'boolean'},
  {name: 'participacaoEspaco', isOptional: true, type: 'boolean'},
  {name: 'actividadePolitica', isOptional: true, type: 'boolean'},
  {name: 'observacoes', isOptional: true, type: 'string'},
  {name: 'latitude', isOptional: true, type: 'number'},
  {name: 'longitude', isOptional: true, type: 'number'},
  {name: 'foto', isOptional: true, type: 'string'},
  {name: 'conhecimentoIncubadora', isOptional: true, type: 'string'},
  {name: 'funcao', isOptional: true, type: 'string'},
  {name: 'povoado', isOptional: true, type: 'string'},
];
const savingsGroup: ColumnSchema[] = [
  {name: 'nrCiclos', isOptional: true, type: 'number'},
  {name: 'nrMembros', isOptional: true, type: 'number'},
  {name: 'nrMembrosActivos', isOptional: true, type: 'number'},
  {name: 'fundoSocial', isOptional: true, type: 'number'},
  {name: 'valorMulta', isOptional: true, type: 'number'},
  {name: 'taxaJuro', isOptional: true, type: 'number'},
  {name: 'codigo', type: 'string'},
  {name: 'idIniciativa', isOptional: true, type: 'string'},
  {name: 'dataConstituicao', type: 'number'},
  {name: 'idLocalizacao', isOptional: true, type: 'string'},
];
const user: ColumnSchema[] = [
  {name: 'firstname', type: 'string'},
  {name: 'lastname', type: 'string'},
  {name: 'status', type: 'number'},
  {name: 'language', type: 'string'},
  {name: 'type', type: 'string'},
  {name: 'login', type: 'string'},
];

const initiative: ColumnSchema[] = [
  {name: 'codigo', isOptional: true, type: 'string'},
  {name: 'bairro', isOptional: true, type: 'string'},
  {name: 'nome', isOptional: true, type: 'string'},
  {name: 'dataConstituicao', isOptional: true, type: 'number'},
  {name: 'tipoIniciativa', isOptional: true, type: 'string'},
  {name: 'idLocalizacao', isOptional: true, type: 'string'},
  {name: 'idMobilizador', isOptional: true, type: 'string'},
  {name: 'idResponsavel', isOptional: true, type: 'string'},
  {name: 'latitude', isOptional: true, type: 'number'},
  {name: 'longitude', isOptional: true, type: 'number'},
  {name: 'project_id', type: 'number'},
];

const participantAction: ColumnSchema[] = [
  {name: 'idAccao', type: 'string'},
  {name: 'idBeneficiario', type: 'string'},
];
const action: ColumnSchema[] = [
  {name: 'idIniciativa', type: 'string'},
  {name: 'tipoAccao', isOptional: true, type: 'number'},
  {name: 'assunto', isOptional: true, type: 'string'},
  {name: 'dataFormacao', isOptional: true, type: 'number'},
  {name: 'coordenador', isOptional: true, type: 'string'},
  {name: 'descricao', isOptional: true, type: 'string'},
  {name: 'nrParticipantesHomesn', isOptional: true, type: 'number'},
  {name: 'resultados', isOptional: true, type: 'string'},
  {name: 'observacoes', isOptional: true, type: 'string'},
  {name: 'nrParticipantesMulheres', isOptional: true, type: 'number'},
];

const issue: ColumnSchema[] = [
  {name: 'tracker_id', type: 'number'},
  {name: 'project_id', type: 'number'},
  {name: 'subject', type: 'string'},
  {name: 'description', isOptional: true, type: 'string'},
  {name: 'due_date', isOptional: true, type: 'number'},
  {name: 'category_id', isOptional: true, type: 'number'},
  {name: 'status_id', type: 'number'},
  {name: 'assigned_to_id', isOptional: true, type: 'number'},
  // {name: 'priority_id', type: 'number'},
  // {name: 'fixed_version_id', isOptional: true, type: 'number'},
  // {name: 'author_id', type: 'number'},
  // {name: 'lock_version', type: 'number'},
  {name: 'start_date', isOptional: true, type: 'number'},
  {name: 'done_ratio', type: 'number'},
  // {name: 'estimated_hours', isOptional: true, type: 'number'},
  // {name: 'parent_id', isOptional: true, type: 'number'},
  // {name: 'root_id', isOptional: true, type: 'number'},
  // {name: 'lft', isOptional: true, type: 'number'},
  // {name: 'rgt', isOptional: true, type: 'number'},
  // {name: 'is_private', isOptional: true, type: 'boolean'},
  // {name: 'closed_at', isOptional: true, type: 'number'},
  {name: 'is_aproved', isOptional: true, type: 'boolean'},
  {name: 'aproved_by', isOptional: true, type: 'number'},
  // {name: 'aproved_at', isOptional: true, type: 'number'},
  // {name: 'solicitacao_fundos_id', isOptional: true, type: 'number'},
  {name: 'iniciativa_id', isOptional: true, type: 'string'},
];

const timeEntries: ColumnSchema[] = [
  {name: 'project_id', type: 'number'},
  {name: 'user_id', type: 'string'},
  {name: 'issue_id', isOptional: true, type: 'number'},
  {name: 'hours', type: 'number'},
  {name: 'comments', isOptional: true, type: 'string'},
  {name: 'activity_id', type: 'number'},
  {name: 'spent_on', type: 'number'},
  {name: 'tyear', type: 'number'},
  {name: 'tmonth', type: 'number'},
  {name: 'tweek', type: 'number'},
  {name: 'start_date', isOptional: true, type: 'number'},
  {name: 'due_date', isOptional: true, type: 'number'},
  {name: 'masc_contribuition', isOptional: true, type: 'string'},
  {name: 'falloup', isOptional: true, type: 'string'},
  {name: 'challenge_lessons', isOptional: true, type: 'string'},
  {name: 'metting_result', isOptional: true, type: 'string'},
  {name: 'metting_descrption', isOptional: true, type: 'string'},
  {name: 'verification_type', isOptional: true, type: 'string'},
  {name: 'evidence_type', isOptional: true, type: 'string'},
  {name: 'peoople_to_inform', isOptional: true, type: 'string'},
  {name: 'custom_type', type: 'string'},
  {name: 'is_reported', type: 'boolean'},
  {name: 'is_approved', type: 'boolean'},
];

const project: ColumnSchema[] = [
  {name: 'name', type: 'string'},
  {name: 'description', isOptional: true, type: 'string'},
  {name: 'homepage', type: 'string'},
  {name: 'is_public', type: 'boolean'},
  {name: 'parent_id', isOptional: true, type: 'string'},
  {name: 'author_id', type: 'string'},
  {name: 'identifier', isOptional: true, type: 'string'},
  {name: 'status', type: 'number'},
  {name: 'has_shared_budget', type: 'number'},
  {name: 'type', type: 'string'},
  // {name: 'lft', isOptional: true, type: 'number'},
  // {name: 'rgt', isOptional: true, type: 'number'},
  // {name: 'inherit_members', type: 'boolean'},
  // {name: 'default_version_id', isOptional: true, type: 'number'},
  // {name: 'default_assigned_to_id', isOptional: true, type: 'number'},
  {name: 'start_date', isOptional: true, type: 'number'},
  {name: 'due_date', isOptional: true, type: 'number'},
  // {name: 'deleted_at', isOptional: true, type: 'number'},
  // {name: 'validated_on', isOptional: true, type: 'number'},
];
const cycle: ColumnSchema[] = [
  {name: 'cod', isOptional: true, type: 'string'},
  {name: 'nome',  type: 'string'},
  {name: 'dataInicio', isOptional: true, type: 'number'},
  {name: 'dataFim', isOptional: true, type: 'number'},
  {name: 'idGrupoPoupanca', type: 'string'},
];
const savingsGroupMonitoring: ColumnSchema[] = [
  {name: 'idGrupoPoupanca', type: 'string'},
  {name: 'idCiclo', type: 'string'},
  {name: 'idUser', type: 'string'},
  {name: 'jurosObtidosPoupanca', type: 'number'},
  {name: 'jurosObtidosFundoSocial', type: 'number'},
  {name: 'evoluiuCooperativa', isOptional: true, type: 'boolean'},
  {name: 'tipoCooperativa', type: 'string'},
  {name: 'problemasGrupo', type: 'string'},
  {name: 'dataMonitoria', type: 'number'},
];
const savingsGroupBeneficiary: ColumnSchema[] = [
  {name: 'idGrupoPoupanca', type: 'string'},
  {name: 'idCiclo', type: 'string'},
  {name: 'idBeneficiario', type: 'string'},
  {name: 'valorPoupanca', isOptional: true, type: 'number'},
  {name: 'valorEmprestimo', isOptional: true, type: 'number'},
  {name: 'taxaJuro', isOptional: true, type: 'number'},
  {name: 'valorMulta', isOptional: true, type: 'number'},
  {name: 'taxaJuroMulta', isOptional: true, type: 'number'},
  {name: 'juro', isOptional: true, type: 'number'},
  {name: 'valorFundoSocal', isOptional: true, type: 'number'},
  {name: 'actividade', type: 'string'},
  {name: 'aplicacaoDinheiro', isOptional: true, type: 'string'},
  {name: 'beneficioCredito', isOptional: true, type: 'string'},
  {name: 'membroActivo', isOptional: true, type: 'boolean'},
];
const savingsGroupBeneficiaryMonitoring: ColumnSchema[] = [
  {name: 'idPoupancaBen', isOptional: true, type: 'string'},
  {name: 'valorPoupado', isOptional: true, type: 'number'},
  {name: 'valorEmprestimo', isOptional: true, type: 'number'},
  {name: 'valorJuro', isOptional: true, type: 'number'},
  {name: 'contribuiuFundoSocial', isOptional: true, type: 'boolean'},
  {name: 'dataMonitoria', isOptional: true, type: 'number'},
  {name: 'valorMulta', isOptional: true, type: 'number'},
  {name: 'actividadeRendimento', isOptional: true, type: 'string'},
  {name: 'aplicacaoDinheiro', isOptional: true, type: 'string'},
  {name: 'beneficioCredito', isOptional: true, type: 'string'},
];
const actionPlanColumns: ColumnSchema[] = [
  {name: 'name', type: 'string'},
  {name: 'idIniciativa', type: 'string'},
  {name: 'start_date', type: 'number'},
  {name: 'end_date', type: 'number'},
];
const actionPlanReportColumns: ColumnSchema[] = [
  {name: 'observations', type: 'string'},
  {name: 'idPlanoAccao', type: 'string'},
  {name: 'start_date', type: 'number'},
  {name: 'end_date', type: 'number'},
  {name: 'done_ratio', type: 'number'},
];
const monitoringVisitColumns: ColumnSchema[] = [
  {name: 'motive', type: 'string'},
  {name: 'idIniciativa', type: 'string'},
  {name: 'date', type: 'number'},
  {name: 'type', type: 'string'},
];

export const schema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: Cycle.table,
      columns: [...cycle, ...syncCheckColumns],
    }),
    tableSchema({
      name: SavingsGroupBeneficiary.table,
      columns: [...savingsGroupBeneficiary, ...syncCheckColumns],
    }),
    tableSchema({
      name: SavingsGroupMonitoring.table,
      columns: [...savingsGroupMonitoring, ...syncCheckColumns],
    }),
    tableSchema({
      name: ParticipantAction.table,
      columns: [...participantAction, ...syncCheckColumns],
    }),
    tableSchema({
      name: Action.table,
      columns: [...syncCheckColumns, ...action],
    }),
    tableSchema({
      name: ActionType.table,
      columns: [
        {
          name: 'descricao',
          type: 'string',
        },
        ...syncCheckColumns,
      ],
    }),
    tableSchema({
      name: Location.table,
      columns: [
        {
          name: 'idPai',
          type: 'string',
          isIndexed: true,
          isOptional: true,
        },
        {
          name: 'designacao',
          type: 'string',
        },
        ...syncCheckColumns,
      ],
    }),
    tableSchema({
      name: Initiative.table,
      columns: [...syncCheckColumns, ...initiative],
    }),
    tableSchema({
      name: Project.table,
      columns: [...syncCheckColumns, ...project],
    }),
    tableSchema({
      name: Issue.table,

      columns: [...syncCheckColumns, ...issue],
    }),
    tableSchema({
      name: TimeEntry.table,

      columns: [...syncCheckColumns, ...timeEntries],
    }),
    tableSchema({
      name: BeneficiaryInitiative.table,
      columns: [
        {
          name: 'beneficiary_id',
          type: 'string',
          isIndexed: true,
        },
        {
          name: 'initiative_id',
          type: 'string',
          isIndexed: true,
        },
        ...syncCheckColumns,
      ],
    }),

    tableSchema({
      name: Beneficiary.table,
      columns: [...syncCheckColumns, ...beneficiary],
    }),
    tableSchema({
      name: User.table,
      columns: [...syncCheckColumns, ...user],
    }),
    tableSchema({
      name: SavingsGroup.table,
      columns: [...syncCheckColumns, ...savingsGroup],
    }),
    tableSchema({
      name: ActionPlan.table,
      columns: [...actionPlanColumns, ...syncCheckColumns],
    }),
    tableSchema({
      name: ActionPlanReport.table,
      columns: [...actionPlanReportColumns, ...syncCheckColumns],
    }),
    tableSchema({
      name: MonitoringVisit.table,
      columns: [...monitoringVisitColumns, ...syncCheckColumns],
    }),
    tableSchema({
      name: SavingsGroupBeneficiaryMonitoring.table,
      columns: [...savingsGroupBeneficiaryMonitoring, ...syncCheckColumns],
    }),
  ],
});
