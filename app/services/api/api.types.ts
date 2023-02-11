import {SyncDatabaseRecords} from 'storage/models';
import {GeneralApiProblem} from './api-problem';

export type AuthResult = Login;
export type RawPostAuthRequest = {
  email: string;
  password: string;
};
export type RawGetUserRequest = {
  token: string;
};
export type RawPostAuthResult =  Login;
export type RawGetUserResult = {username: string; name: string};
export type UserResult = {
  email: string;
  name: string;
};

export type GetUserResult =
  | {kind: 'ok'; result: UserResult}
  | GeneralApiProblem;
export type GetUsersResult =
  | {kind: 'ok'; users: UserResult}
  | GeneralApiProblem;
export type GetAuthResult =
  | {kind: 'ok'; result: AuthResult}
  | GeneralApiProblem;

export interface PullResult {
  changes: SyncDatabaseRecords;
  timestamp: number;
}
export interface PullContent {
  changes: ApiChanges;
  timestamp: number;
}

export interface SyncPullQueryParams {
  lastPulledAt: number | null;
  schemaVersion: number | undefined;
  migration: any | null | undefined;
}
export type RawPullResult = {changes: ApiChanges; timestamp: number};
export type GetPullBody = {formId: string};
export type GetPullResponse = PullContent;
export type GetPullResult =
  | {kind: 'ok'; result: PullResult}
  | GeneralApiProblem;

export interface PushResult {}
export interface PushContent {}
export type RawPushResult = {};
export type PostPushBody = {changes: ApiChanges; lastPulledAt: number};
export type PostPushResponse = PushContent;
export type PostPushResult =
  | {kind: 'ok'; result: RawPushResult}
  | GeneralApiProblem;

export type Localizacao = {
  id: string;
  designacao: string;
  idPai?: string;
};

export interface User extends SyncChecks {
  id: number;
  login: string;
  password: string;
  firstname: string;
  lastname: string;
  admin: boolean;
  status: number;
  email_verified_at: number;
  last_login_on: number;
  language: string;
  auth_source_id: number;
  remember_token: number;
  type: string;
  identity_url: string;
  mail_notification: string;
  must_change_passwd: boolean;
  passwd_changed_on: number;
  high_privilege: boolean;
}

export interface Iniciativa extends SyncChecks {
  id: number;
  codigo?: string;
  idLocalizacao?: number;
  bairro?: string;
  nome?: string;
  dataConstituicao?: string;
  idResponsavel?: number;
  idMobilizador?: number;
  tipoIniciativa?: string;
  latitude?: number;
  longitude?: number;
  project_id: number;
}
export interface SavingsGroup extends SyncChecks {
  nrCiclos?: number;
  nrMembros?: number;
  nrMembrosActivos?: number;
  fundoSocial?: number;
  valorMulta?: number;
  taxaJuro?: number;
  codigo: string;
  idIniciativa?: number;
  dataConstituicao: string;
  idLocalizacao?: string;
}

export interface Action extends SyncChecks {
  id: number;
  tipoAccao?: number;
  assunto?: string;
  idIniciativa: string;
  dataFormacao?: string;
  coordenador?: string;
  descricao?: string;
  nrParticipantesHomesn?: number;
  resultados?: string;
  observacoes?: string;
  nrParticipantesMulheres?: number;
}
export interface Issue extends SyncChecks {
  id: number;
  tracker_id: number;
  project_id: number;
  subject: string;
  description?: string;
  due_date?: string;
  category_id?: number;
  status_id: number;
  assigned_to_id?: number;
  priority_id: number;
  fixed_version_id?: number;
  author_id: number;
  lock_version: number;
  start_date?: string;
  done_ratio: number;
  estimated_hours?: number;
  parent_id?: number;
  root_id?: number;
  lft?: number;
  rgt?: number;
  is_private: boolean;
  closed_on?: string;
  is_aproved: boolean;
  aproved_by?: number;
  aproved_on?: string;
  solicitacao_fundos_id?: number;
  deleted_at?: string;
  iniciativa_id?: string;
}
export interface Project extends SyncChecks {
  id: number;
  name: string;
  description?: string;
  homepage: string;
  is_public: boolean;
  parent_id?: number;
  author_id: number;
  identifier?: string;
  status: number;
  has_shared_budget: number;
  type: string;
  lft?: number;
  rgt?: number;
  inherit_members: boolean;
  default_version_id?: number;
  default_assigned_to_id?: number;
  start_date?: string;
  due_date?: string;
  deleted_at?: string;
  validated_on?: string;
}
export interface ParticipantAction extends SyncChecks {
  id: number;
  idAccao: number;
  idBeneficiario: number;
}
export interface TimeEntry extends SyncChecks {
  id: number;
  project_id: number;
  user_id: number;
  issue_id?: number;
  hours: number;
  comments?: string;
  activity_id: number;
  spent_on: string;
  tyear: number;
  tmonth: number;
  tweek: number;
  start_date?: string;
  due_date?: string;
  masc_contribuition?: string;
  falloup?: string;
  challenge_lessons?: string;
  metting_result?: string;
  metting_descrption?: string;
  verification_type?: string;
  evidence_type?: string;
  peoople_to_inform?: string;
  custom_type: string;
  is_reported: boolean;
  is_approved: boolean;
}
export interface ActionType extends SyncChecks {
  id: number;
  designacao?: string;
}
export interface BeneficiaryInitiative extends SyncChecks {
  id: number;
  idBeneficiario: number;
  idIniciativa: number;
}
export interface Cycle extends SyncChecks {
  id: string;
  cod?: string;
  nome: string;
  dataInicio?: string;
  dataFim?: string;
  idGrupoPoupanca: string;
}
export interface SavingsGroupMonitoring extends SyncChecks {
  id: string;
  idGrupoPoupanca: string;
  idUser: number;
  idCiclo: string;
  jurosObtidosPoupanca: number;
  jurosObtidosFundoSocial: number;
  evoluiuCooperativa?: boolean;
  tipoCooperativa: number;
  problemasGrupo: string;
  dataMonitoria: string;
}
export interface SavingsGroupBeneficiary extends SyncChecks {
  id: string;
  idGrupoPoupanca: string;
  idCiclo: string;
  idBeneficiario: string;
  valorPoupanca?: number;
  valorEmprestimo?: number;
  taxaJuro?: number;
  valorMulta?: number;
  taxaJuroMulta?: number;
  juro?: number;
  valorFundoSocal?: number;
  actividade: string;
}
export interface Beneficiary extends SyncChecks {
  id: number;
  codigo?: string;
  nome?: string;
  apelido?: string;
  dataNascimento?: string;
  estadoCivil?: string;
  genero?: string;
  escolaridade?: string;
  nrFilhos?: number;
  bens?: string;
  viveComParentes?: boolean;
  motivoDesistencia?: string;
  conhecimentoEspaco?: boolean;
  participacaoEspaco?: boolean;
  actividadePolitica?: boolean;
  observacoes?: string;
  latitude?: number;
  longitude?: number;
  foto?: object;
  conhecimentoIncubadora?: string;
  funcao?: string;
  povoado?: string;
}

export interface ActionPlan {
  name: string;
  startDate: string;
  endDate: string;
  idIniciativa: string;
  doneRatio: number;
}
export interface ActionPlanReport {
  idPlanoAccao: string;
  startDate: string;
  endDate: string;
  doneRatio: number;
  observations: string;
}
export interface MonitoringVisit {
  motive: string;
  idIniciativa: string;
  date: string;
  type: string;
}

export interface ApiChanges {
  accao: SyncTableRecord<Action>;
  tipoaccao: SyncTableRecord<ActionType>;
  beneficiario: SyncTableRecord<Beneficiary>;
  beneficiarioiniciativa: SyncTableRecord<BeneficiaryInitiative>;
  iniciativa: SyncTableRecord<Iniciativa>;
  issues: SyncTableRecord<Issue>;
  Localizacao: SyncTableRecord<Localizacao>;
  participantesaccao: SyncTableRecord<ParticipantAction>;
  projects: SyncTableRecord<Project>;
  time_entries: SyncTableRecord<TimeEntry>;
  users: SyncTableRecord<User>;
  grupopoupanca: SyncTableRecord<SavingsGroup>;
  poupancabeneficiario: SyncTableRecord<SavingsGroupBeneficiary>;
  monitoriapoupanca: SyncTableRecord<SavingsGroupBeneficiaryMonitoring>;
  monitoriagrupo: SyncTableRecord<SavingsGroupMonitoring>;
  ciclo: SyncTableRecord<Cycle>;
  planoaccao: SyncTableRecord<ActionPlan>;
  reporteplanoaccao: SyncTableRecord<ActionPlanReport>;
  visitamonitoria: SyncTableRecord<MonitoringVisit>;
}

export interface SavingsGroupBeneficiaryMonitoring {
  id: string;
  idPoupancaBen?: number;
  valorPoupado?: number;
  valorEmprestimo?: number;
  valorJuro?: number;
  contribuiuFundoSocial?: boolean;
  dataMonitoria?: string;
  valorMulta?: number;
  actividadeRendimento?: string;
  aplicacaoDinheiro?: string;
  beneficioCredito?: string;
}

export type SyncChecks = {
  id: string | number;
  createdOn?: string;
  updatedOn?: string;
  removedOn?: string;
  created_by: number;
  updated_by?: number;
  removed_by?: number;
  createdBy: number;
  updatedBy?: number;
  removedBy?: number;
  created_on?: string;
  updated_on?: string;
  deleted_at?: string;
};

type SyncTableRecord<T> = {
  created: (T & SyncChecks)[];
  updated: (T & SyncChecks)[];
  deleted: string[];
};

export interface Login {
  token: string;
  name: string;
  date: string;
}

export interface GetUser {
  name: string;
  userId: string;
}
