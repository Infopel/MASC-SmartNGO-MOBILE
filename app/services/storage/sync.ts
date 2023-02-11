import { hasUnsyncedChanges, synchronize } from '@nozbe/watermelondb/sync';
import { SyncApi } from 'api/sync-api';
import { isNil } from 'lodash';
import { Environment } from 'models/environment';
import { map } from 'rxjs/operators';
import { database } from './database';
import {
  Action,
  ActionPlan,
  ActionPlanReport,
  ActionType,
  Beneficiary,
  BeneficiaryInitiative,
  Initiative,
  ParticipantAction
} from './models';
import { Cycle } from './models/cycle';
import { MonitoringVisit } from './models/monitoring-visit';
import { SavingsGroup } from './models/savings-group';
import { SavingsGroupBeneficiary } from './models/savings-group-beneficiary';
import { SavingsGroupBeneficiaryMonitoring } from './models/savings-group-beneficiary-monitoring';
import { SavingsGroupMonitoring } from './models/savings-group-monitoring';
export async function isAnyUnsyncedChanges(): Promise<boolean> {
  return await hasUnsyncedChanges({
    database,
  });
}

export async function sync() {
  const env = new Environment();
  await env.setup();
  const api = new SyncApi(env.api);
  await synchronize({
    database,
    pullChanges: async ({lastPulledAt, schemaVersion, migration}) => {
      const response = await api.pull(lastPulledAt, schemaVersion, migration);
      if (response.kind !== 'ok') {
        throw new Error(response.kind);
      }
      const {changes, timestamp} = response.result;

      return {changes, timestamp};
    },
    pushChanges: async ({changes, lastPulledAt}) => {
      const response = await api.push(changes, lastPulledAt);
      if (response.kind !== 'ok') {
        throw new Error(response.kind);
      }
    },
    // migrationsEnabledAtVersion: 1,
  });
}

export function whenUpdatableDataSetChanges() {
  return database
    .withChangesForTables(
      [
        Cycle,
        SavingsGroupBeneficiary,
        SavingsGroupMonitoring,
        ParticipantAction,
        Action,
        ActionType,
        Initiative,
        BeneficiaryInitiative,
        Beneficiary,
        SavingsGroup,
        ActionPlan,
        ActionPlanReport,
        MonitoringVisit,
        SavingsGroupBeneficiaryMonitoring,
      ].map(table => table.table),
    )
    .pipe(
      map(allTables => {
        return allTables?.filter(
          table => table.record._raw._status !== 'synced',
        );
      }),
      map(x => {
        console.log("whenUpdatableDataSetChanges -> ", x?.map((x)=> x.record._raw))
        if (isNil(x)) return false;

        return x.length > 0;
      }),
    );
}
