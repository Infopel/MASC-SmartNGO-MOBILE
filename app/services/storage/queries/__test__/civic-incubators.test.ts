import {TestScheduler} from 'rxjs/testing';
import {database, resetDatabase} from 'storage/database';
import {
  findAllParticipantsFromInitiative,
  findInitiativeById,
} from 'storage/queries/initiative';
import {DiagnosticError} from 'utils/test-utils/renderWithDB';
import {findAllInitiatives} from '../initiative';
import {
  getAllParticipants,
  getResultFindAllCivicIncubators,
  populateFindAllCivicIncubators,
  populateFindAllParticipants,
} from '../__mock__/civic-incubators';
describe('Query CivicIncubators', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should return an empty list', () => {
    testScheduler.run(helpers => {
      const {hot, expectObservable, cold} = helpers;
      const source$ = findAllInitiatives(database,'civic-incubator');
      expectObservable(source$).toEqual(cold('a', {a: []}));
    });
  });
  it('should list civic incubators', async () => {
    await populateFindAllCivicIncubators();
    testScheduler.run(helpers => {
      const {hot, expectObservable} = helpers;
      const source$ = findAllInitiatives(database,'civic-incubator');
      expectObservable(source$).toEqual(
        hot('z', {z: getResultFindAllCivicIncubators()}),
      );
    });
  });
});

afterEach(async () => await resetDatabase());
describe('findCivicIncubator', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should return an civic incubator', async () => {
    await populateFindAllCivicIncubators();

    testScheduler.run(helpers => {
      const incubator = getResultFindAllCivicIncubators()[0];
      const {hot, expectObservable} = helpers;
      const source$ = findInitiativeById(incubator.id, database);
      expectObservable(source$).toEqual(hot('z', {z: incubator}));
    });
  });
  it('should return an error', () => {
    testScheduler.run(helpers => {
      const {hot, expectObservable} = helpers;
      const source$ = findInitiativeById('unexistend incubator', database);
      expectObservable(source$).toEqual(
        hot(
          '#',
          undefined,
          new DiagnosticError(
            'Record iniciativa#unexistend incubator not found',
          ),
        ),
      );
    });
  });
});

describe('Query Participants', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should return an empty list', () => {
    testScheduler.run(helpers => {
      const {hot, expectObservable, cold} = helpers;
      const source$ = findAllParticipantsFromInitiative(database, '');
      expectObservable(source$).toEqual(hot('a', {a: []}));
    });
  });
  it('should list participants', async () => {
    await populateFindAllParticipants();
    const incubator = getResultFindAllCivicIncubators()[1];
    testScheduler.run(helpers => {
      const {hot, expectObservable} = helpers;
      const source$ = findAllParticipantsFromInitiative(database, incubator.id);
      expectObservable(source$).toEqual(hot('a', {a: getAllParticipants()}));
    });
  });
  it('should list participants with a filter', async () => {
    await populateFindAllParticipants();
    const incubator = getResultFindAllCivicIncubators()[1];
    const query = 'antonio';
    const participants = getAllParticipants().filter(x =>
      x.name.toLocaleLowerCase().includes(query),
    );

    testScheduler.run(helpers => {
      const {hot, expectObservable} = helpers;
      const source$ = findAllParticipantsFromInitiative(
        database,
        incubator.id,
        query,
      );
      expectObservable(source$).toEqual(hot('a', {a: participants}));
    });
  });
});
