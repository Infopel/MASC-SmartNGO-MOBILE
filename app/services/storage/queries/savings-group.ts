import {Q} from '@nozbe/watermelondb';
import Database from '@nozbe/watermelondb/Database';
import {differenceInDays} from 'date-fns';
import {
  combineLatest,
  first,
  map,
  merge,
  mergeMap,
  Observable,
  of,
  switchMap,
  toArray,
} from 'rxjs';
import {Action} from 'storage/models/action';
import {SavingsGroupMonitoring} from 'storage/models/savings-group-monitoring';
import {SavingsGroup} from './../models/savings-group';
import {SavingsGroupBeneficiary} from './../models/savings-group-beneficiary';

export type ISavingsGroup = {
  id: string;
  initiativeId: string;
  name: string;
  location: string;
  cycleDuration: number;
  numberOfCycles: number;
  numberOfMembers: number;
};
export type ISavingsGroupMemberItem = {
  id: string;
  name: string;
  age: number;
  savings: number;
  loan: number;
  lastMonitoredAt: number | Date;
};
export type ISavingsGroupMonitoringItem = {
  id: string;
  name: string;
  date: number;
  savings: number;
};

export function findAllSavingsGroups(
  database: Database,
): Observable<ISavingsGroup[]> {
  return database
    .get<SavingsGroup>(SavingsGroup.table)
    .query()
    .observe()
    .pipe(
      switchMap(list =>
        merge(list.map(parseToSavingGroup)).pipe(
          mergeMap(x => x),
          toArray(),
        ),
      ),
    );
}

function parseToSavingGroup(group: SavingsGroup): Observable<ISavingsGroup> {
  const cycles = group.cycles.observe().pipe(
    first(),
    map(x => ({
      duration: x.reduce((acc, v) => {

        return (acc || 0) + differenceInDays(v.endDate, v.startDate);
      }, 0),
      count: x.length,
    })),
  );

  const numberOfMembers = group.members.observe().pipe(
    first(),
    map(x => x.length),
  );
  const date = of(group.dateOfConstitution.getTime());
  const initiative = group.initiative.observe().pipe(first());
  const id = of(group.id);
  const location = group.location.observe().pipe(first());
  return combineLatest(
    [date, id, initiative, location, numberOfMembers, cycles],
    (
      _date,
      _id,
      _initiative,
      _location,
      _numberOfMembers,
      _cycles,
    ) => {
      return {
        cycleDuration: _cycles.duration,
        id: _id,
        initiativeId: _initiative?.id,
        location: _location?.name,
        name: _initiative?.name,
        numberOfCycles: _cycles.count,
        numberOfMembers: _numberOfMembers,
      } as ISavingsGroup;
    },
  );
}

export function getSavingsGroup(database: Database, groupId: string) {
  return database
    .get<SavingsGroup>(SavingsGroup.table)
    .findAndObserve(groupId)
    .pipe(mergeMap(parseToSavingGroup));
}

export function listAllParticipantsFromSavingsGroup(
  database: Database,
  groupId: string,
  queryText: string = '',
): Observable<ISavingsGroupMemberItem[]> {
  return database
    .get<SavingsGroupBeneficiary>(SavingsGroupBeneficiary.table)
    .query(Q.where('idGrupoPoupanca', groupId))
    .observeWithColumns(['beneficiary_id'])
    .pipe(
      first(),
      switchMap(s => s),
      switchMap(savingGroupbeneficiary =>
        savingGroupbeneficiary.beneficiary.observe().pipe(
          first(),
          map(beneficiary => {
            if (beneficiary === null)
              throw new Error('Beneficiary cannot be null on this query');

            return {
              age: beneficiary?.age,
              grade: beneficiary?.grade,
              id: savingGroupbeneficiary.id,
              lastMonitoredAt: savingGroupbeneficiary.updatedAt,
              loan: savingGroupbeneficiary.loan,
              savings: savingGroupbeneficiary.savings,
              name: beneficiary?.fullName,
            } as ISavingsGroupMemberItem;
          }),
        ),
      ),
      toArray(),
    );
}

export function listAllSavingsGroupMonitoring(
  database: Database,
  savingGroupId: string,
): Observable<ISavingsGroupMonitoringItem[]> {
  return database
    .get<SavingsGroupMonitoring>(SavingsGroupMonitoring.table)
    .query(Q.where('idGrupoPoupanca', savingGroupId))
    .observe()
    .pipe(
      first(),
      switchMap(s => s),
      switchMap(monitoring =>
        monitoring.user.observe().pipe(
          first(),
          map(user => {
            return {
              date: monitoring.date.getTime(),
              id: monitoring.id,
              savings: monitoring.savingsInterest,
              name: user?.fullName,
            } as ISavingsGroupMonitoringItem;
          }),
        ),
      ),
      toArray(),
    );
}
export function findAllEventsFromIncubator(
  database: Database,
  initiativeId: string,
  queryText: string = '',
): Observable<Action[]> {
  return database
    .get<Action>(Action.table)
    .query(Q.where('idIniciativa', initiativeId))
    .observe()
    .pipe();
}
