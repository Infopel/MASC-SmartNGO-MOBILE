import { RawSavingsGroupMonitoring } from './savings-group-monitoring';
import {
  SyncDatabaseChangeSet,
  SyncTableChangeSet
} from '@nozbe/watermelondb/sync';
import { RawAction } from './action';
import { RawActionType } from './action-type';
import { RawActionPlan } from './action-plan';
import { RawBeneficiary } from './beneficiary';
import { RawBeneficiaryInitiative } from './beneficiary-initiative';
import { RawInitiative } from './initiative';
import { RawIssue } from './issue';
import { RawLocation } from './location';
import { IRawSyncableRecord } from './models';
import { RawParticipantAction } from './participant-action';
import { RawProject } from './project';
import { RawSavingsGroup } from './savings-group';
import { RawTimeEntry } from './time-entry';
import { RawUser } from './user';
import { RawSavingsGroupBeneficiary } from './savings-group-beneficiary';
import { RawCycle } from './cycle';
import { RawActionPlanReport } from './action-plan-report';
import { RawMonitoringVisit } from './monitoring-visit';
import { RawSavingsGroupBeneficiaryMonitoring } from './savings-group-beneficiary-monitoring';

export * from './action';
export * from './action-type';
export * from './action-plan';
export * from './action-plan-report';
export * from './beneficiary';
export * from './beneficiary-initiative';
export * from './initiative';
export * from './issue';
export * from './location';
export * from './participant-action';
export * from './project';
export * from './time-entry';
export * from './user';

export interface IChangeRecord<T extends IRawSyncableRecord> extends SyncTableChangeSet {
  created: IRecord<T>[];
  updated: IRecord<T>[];
}
type IRecord<T extends IRawSyncableRecord> = Omit<
  T,
  '_status' | 'last_modified' | '_changed'
>;
export interface SyncDatabaseRecords extends SyncDatabaseChangeSet {
  accao: IChangeRecord<RawAction>;
  tipoaccao: IChangeRecord<RawActionType>;
  beneficiario: IChangeRecord<RawBeneficiary>;
  beneficiarioiniciativa: IChangeRecord<RawBeneficiaryInitiative>;
  iniciativa: IChangeRecord<RawInitiative>;
  issues: IChangeRecord<RawIssue>;
  Localizacao: IChangeRecord<RawLocation>;
  participantesaccao: IChangeRecord<RawParticipantAction>;
  projects: IChangeRecord<RawProject>;
  time_entries: IChangeRecord<RawTimeEntry>;
  users: IChangeRecord<RawUser>;
  grupopoupanca: IChangeRecord<RawSavingsGroup>;
  poupancabeneficiario: IChangeRecord<RawSavingsGroupBeneficiary>;
  monitoriagrupo: IChangeRecord<RawSavingsGroupMonitoring>;
  monitoriapoupanca: IChangeRecord<RawSavingsGroupBeneficiaryMonitoring>;
  ciclo: IChangeRecord<RawCycle>;
  planoaccao: IChangeRecord<RawActionPlan>;
  reporteplanoaccao: IChangeRecord<RawActionPlanReport>;
  visitamonitoria: IChangeRecord<RawMonitoringVisit>;
}
