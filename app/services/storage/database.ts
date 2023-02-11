import { MonitoringVisit } from './models/monitoring-visit';
import { Database } from '@nozbe/watermelondb';
import { Project } from './models/project';
import { SavingsGroupBeneficiary } from './models/savings-group-beneficiary';
import { SavingsGroupMonitoring } from './models/savings-group-monitoring';

import adapter from './adapter';
import { Action } from './models/action';
import { ActionType } from './models/action-type';
import { Beneficiary } from './models/beneficiary';
import { BeneficiaryInitiative } from './models/beneficiary-initiative';
import { Cycle } from './models/cycle';
import { Initiative } from './models/initiative';
import { Issue } from './models/issue';
import { Location } from './models/location';
import { ParticipantAction } from './models/participant-action';
import { SavingsGroup } from './models/savings-group';
import { TimeEntry } from './models/time-entry';
import { ActionPlan } from './models/action-plan';
import { User } from './models/user';
import { ActionPlanReport } from './models/action-plan-report';
import { SavingsGroupBeneficiaryMonitoring } from './models/savings-group-beneficiary-monitoring';
// Then, make a Watermelon database from it!
export const database = new Database({
  adapter,
  modelClasses: [
    Location,
    User,
    Initiative,
    Beneficiary,
    BeneficiaryInitiative,
    Action,
    ActionType,
    ParticipantAction,
    Project,
    Issue,
    TimeEntry,
    SavingsGroup,
    SavingsGroupMonitoring,
    SavingsGroupBeneficiary,
    Cycle,
    ActionPlan,
    ActionPlanReport,
    SavingsGroupBeneficiaryMonitoring,
    MonitoringVisit,
  ],
});

export const resetDatabase = async () =>
  await database.write(async () => await database.unsafeResetDatabase());

if (__DEV__ && !__TEST__) {
  const {
    connectDatabases,
    WatermelonDB,
  } = require('react-native-flipper-databases');
  connectDatabases([
    new WatermelonDB(database), // Pass in database definition
  ]);
}
