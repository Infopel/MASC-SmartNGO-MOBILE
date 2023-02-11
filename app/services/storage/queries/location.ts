import { Q } from "@nozbe/watermelondb"
import Database from "@nozbe/watermelondb/Database"
import { map, Observable } from "rxjs"
import { Location } from "storage/models/location"
export type ILocation = { name: string; id: string }

export function findAllProvinces(database: Database): Observable<ILocation[]> {
  return database
    .get<Location>(Location.table)
    .query(Q.where("idPai", Q.eq(null)), Q.sortBy("id", Q.asc))
    .observe()
    .pipe(map((list) => list.map((item) => ({ name: item.name, id: item.id }))))
}
export function findAllDistricts(database: Database): Observable<ILocation[]> {
  return database
    .get<Location>(Location.table)
    .query(Q.where("idPai", Q.notEq(null)))
    .observe()
    .pipe(map((list) => list.map((item) => ({ name: item.name, id: item.id }))))
}
