import {Database, Q} from '@nozbe/watermelondb';
import {mergeMap, Observable, of, toArray} from 'rxjs';
import {Issue} from 'storage/models/issue';

export type ITaskItem = {
  id: string;
  name: string;
  date: number | Date;
  location: string;
  isPending: boolean;
};

export function listAllTasks(
  database: Database,
  queryText?: string,
): Observable<ITaskItem[]> {
  const query = !queryText
    ? database.get<Issue>(Issue.table).query()
    : database
        .get<Issue>(Issue.table)
        .query(
          Q.where('subject', Q.like(`%${Q.sanitizeLikeString(queryText)}%`)),
        );

  return query.observe().pipe(
    mergeMap(list =>
      of(...list).pipe(
        mergeMap(async issue => {
          return Promise.resolve({
            id: issue.id,
            date: issue.dueDate,
            isPending: !issue.isApproved,
            location: (await (await issue.initiative.fetch())?.location.fetch())
              ?.name,
            name: issue.subject,
          } as ITaskItem);
        }),
        toArray(),
      ),
    ),
  );
}
