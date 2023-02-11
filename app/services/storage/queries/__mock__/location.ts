import { Model } from "@nozbe/watermelondb"
import { database } from "storage/database"
import { Location } from "storage/models"

export const provinces = [
  { name: "Maputo Cidade", id: "1" },
  {
    id: "2",
    name: "Maputo Província",
  },
  {
    id: "3",
    name: "Gaza",
  },
]

export const districts = [
  {
    id: "11",
    idPai: "1",
    name: "KaMavota",
  },
  {
    id: "21",
    idPai: "2",
    name: "Matola C",
  },
  {
    id: "31",
    idPai: "3",
    name: "Vilanculus",
  },
]

export function getAllProvinces() {
  return provinces.map((p) => ({ name: p.name, id: p.id }))
}
export function getAllDistricts() {
  return districts.map((d) => ({ name: d.name, id: d.id }))
}

export async function populateFindAllLocations() {
  const location = database.get<Location>(Location.table)

  const batch = [] as Model[]
  batch.push(
    ...[
      ...provinces.map(({ id, name }) =>
        location.prepareCreate((rec) => {
          rec._raw.id = id
          rec._raw.designacao = name
        }),
      ),
      ...districts.map(({ id, idPai, name }) =>
        location.prepareCreate((rec) => {
          rec._raw.id = id
          rec._raw.designacao = name
          rec._raw.idPai = idPai
        }),
      ),
    ],
  )

  await database.write(() => database.batch(...batch))
}
