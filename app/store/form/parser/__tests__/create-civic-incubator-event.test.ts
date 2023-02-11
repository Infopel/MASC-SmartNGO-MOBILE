import {createCivicIncubatorEvent} from '../create-civic-incubator-event';
import * as action from 'storage/mutations/action.mutations';

describe('createCivicIncubatorEvent', () => {
  it('should create an incubator event', () => {
   const mockedCreatAction =  jest.spyOn(action, 'createAction').mockImplementation(async () => {
      throw new Error('hgvjhv');
    });
    const req = createCivicIncubatorEvent(
      {
        action_results: '6',
        action_results_other: 'Some other action',
        coordinator: 'Pedro Marques',
        developed_actions: 'Nothing happens',
        name: 'Game Planning',
        number_of_participants_female: 4,
        number_of_participants_male: 6,
        observations: 'Not a big deal',
        realization_date: 1458955451515,
        subject: 'Strategic development',
        type: 5,
        type_other: 5,
        title: '',
      },
      'SomeWeirdId',
    );
    expect(mockedCreatAction).toBeCalled()
    expect(req).resolves.toBeUndefined();
    expect(req).rejects.toBeUndefined();
    // expect(await req).toBeUndefined();
  });
  it('should fail to create an incubator event', () => {
    const mockedCreatAction =  jest.spyOn(action, 'createAction').mockImplementation(async () => {
        throw new Error('hgvjhv');
      });
    const req = createCivicIncubatorEvent(
      {
        action_results: '6',
        action_results_other: 'Some other action',
        coordinator: 'Pedro Marques',
        developed_actions: 'Nothing happens',
        name: 'Game Planning',
        number_of_participants_female: 4,
        number_of_participants_male: 6,
        observations: 'Not a big deal',
        realization_date: 1458955451515,
        subject: 'Strategic development',
        type: 5,
        type_other: 5,
        title: '',
      },
      'SomeWeirdId',
    );
    return expect(req).rejects.toThrowError();
  });

  afterEach(() => jest.restoreAllMocks());
});
