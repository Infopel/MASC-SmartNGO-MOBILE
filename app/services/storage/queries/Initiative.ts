import {Q} from '@nozbe/watermelondb';
import Database from '@nozbe/watermelondb/Database';
import {
  combineLatest,
  filter,
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
import {BeneficiaryInitiative} from 'storage/models/beneficiary-initiative';
import {Initiative, RawInitiative} from 'storage/models/initiative';

export interface IInitiative {
  id: string;
  date: number;
  name: string;
  district: string;
  province: string;
}
export interface IPeaceEmbassadorVDO extends IInitiative {
  //     Código
  // •	Nome
  // •	Localização
  // •	Número de membros
  // •	Data de última actualização

  numberOfActiveMembers: number;
}
export interface IPeaceEmbassadorVDOMember {
  // •	Nome do membro;
  // •	Idade
  // •	Função
  // •	Data de adesão

  id: string;
  age: number;
  name: string;
  function: string;
  subscribedAt: number | Date;
}
export interface IPeaceEmbassadorVDOAction {
  // •	Data de realização;
  // •	Tipo de secção;
  // •	Nome da secção;
  // •	Coordenador;
  // •	Nr. total de participantes;

  id: string;
  date: number | Date;
  name: string;
  coordinatorName: string;
  numberOfActiveMembers: number;
}
export interface ICivicIncubator {
  id: string;
  date: number | Date;
  name: string;
  district: string;
  province: string;
}

export interface ICivicIncubatorParticipant {
  id: string;
  age: number;
  name: string;
  grade: string;
}

export type IInitiativeParticipant = ICivicIncubatorParticipant &
  IPeaceEmbassadorVDOMember;

export function findAllInitiatives(
  database: Database,
  type: NonNullable<RawInitiative['tipoIniciativa']>,
): Observable<IInitiative[]> {
  return database
    .get<Initiative>(Initiative.table)
    .query(Q.where('tipoIniciativa', type))
    .observe()
    .pipe(
      mergeMap(list =>
        merge(list.map(parseToInitiative)).pipe(
          mergeMap(x => x),
          toArray(),
        ),
      ),
    );
}
export function findInitiativeById(
  id: string,
  database: Database,
): Observable<IInitiative> {
  return database
    .get<Initiative>(Initiative.table)
    .findAndObserve(id)
    .pipe(mergeMap(parseToInitiative));
}

export function findAllParticipantsFromInitiative(
  database: Database,
  initiativeId: string,
  queryText: string = '',
): Observable<IInitiativeParticipant[]> {
  return database
    .get<BeneficiaryInitiative>(BeneficiaryInitiative.table)
    .query(Q.where('initiative_id', initiativeId))
    .extend
    // Q.on(Beneficiary.table, 'nome', Q.like(Q.sanitizeLikeString(queryText))),
    // Q.on(Beneficiary.table, 'apelido', Q.like(Q.sanitizeLikeString(queryText))),
    ()
    .observe()
    .pipe(
      switchMap(x =>
        of(...x).pipe(
          mergeMap(b => {
            return b.beneficiary.observe().pipe(
              first(),
              filter(x => x !== null),
              map(
                ({age, grade, function: f, id, fullName}) =>
                  ({
                    age,
                    grade,
                    id,
                    subscribedAt: b.createdAt,
                    function: f,
                    name: fullName,
                  } as IInitiativeParticipant),
              ),
            );
          }),
          // filter(x =>
          //   x.name
          //     .toUpperCase()
          //     .includes(Q.sanitizeLikeString(queryText.toLocaleUpperCase())),
          // ),
          toArray(),
          map(list => list.sort((a, b) => a.name.localeCompare(b.name))),
        ),
      ),
      map(x => x.sort((a, b) => a.name.localeCompare(b.name))),
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

function parseToInitiative(iniciative: Initiative): Observable<IInitiative> {
  const date = of(iniciative.date.getTime());
  const name = of(iniciative.name);
  const id = of(iniciative.id);
  const district = iniciative.district.pipe(first());
  const province = iniciative.province.pipe(first());
  return combineLatest(
    [date, id, name, district, province],
    (_date, _id, _name, _district, _province) => {
      return {
        date: _date,
        name: _name,
        id: _id,
        district: _district as string, //district ?? "missing",
        province: _province as string,
      };
    },
  );
}
