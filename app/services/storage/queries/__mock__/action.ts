import { Model } from '@nozbe/watermelondb';
import { database } from 'storage/database';
import { ActionType } from 'storage/models/action-type';

export const actionTypes = [
  {id: '1', name: 'palestra'},
  {id: '2', name: 'oficina temática'},
  {id: '3', name: 'conversas que inspiram'},
  {id: '4', name: 'formação'},
  {id: '5', name: 'conversas que inspiram'},
  {id: '6', name: 'outro'},
];

export function getAllActionTypes() {
  return actionTypes.map(p => ({name: p.name, id: p.id}));
}

export async function populateFindActionTypes() {
  const location = database.get<ActionType>(ActionType.table);

  const batch = [] as Model[];
  batch.push(
    ...[
      ...actionTypes.map(({id, name}) =>
        location.prepareCreate(rec => {
          rec._raw.id = id;
          rec._raw.descricao = name;
        }),
      ),
    ],
  );

  await database.write(() => database.batch(...batch));
}
