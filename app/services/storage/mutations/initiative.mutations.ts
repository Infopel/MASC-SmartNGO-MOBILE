import {database} from 'storage/database';
import {IInitiativeType, Initiative} from 'storage/models/initiative';
import {createInitiativeRecord} from 'storage/models/initiative.builder';
import logger from 'utils/logger';

type Latlon = {
  latitude: number;
  longitude: number;
};
export type CreateInitiativeParams = {
  name: string;
  districtId: string;
  provinceId: string;
  locality: string;
  zone: string;
  latLng: Latlon;
  adminPost: string;
  dateConstitution: number;
  type: IInitiativeType;
  projectId: number;
};

export async function createInitiative({
  name,
  latLng,
  locality,
  type,
  districtId,
  provinceId,
  zone,
  adminPost,
  projectId,
  dateConstitution,
}: CreateInitiativeParams): Promise<void> {
  console.log({
    name,
    latLng,
    locality,
    type,
    districtId,
    provinceId,
    zone,
    adminPost,
    projectId,
    dateConstitution,
  });
  // if (
  //   !name ||
  //   !locality ||
  //   !districtId ||
  //   !type ||
  //   !provinceId ||
  //   // !latLng ||
  //   // !adminPost ||
  //   !dateConstitution
  // ) {
  //   throw new Error('the params should not be empty');
  // }
  return database.write(() =>
    database
      .get<Initiative>(Initiative.table)
      .create(
        createInitiativeRecord({
          dateOfConstitution: dateConstitution,
          latLng,
          name,
          districtId,
          projectId,
          provinceId,
          locality,
          type,
          zone,
          //TODO add adminPost,
        }),
      )
      .then(),
  );
}

export async function deleteInitiative(id: string) {
  try {
    const item = await database.get<Initiative>(Initiative.table).find(id);
    return database.write(async () => {
      item.markAsDeleted();
    });
  } catch (error) {
    logger.error(error);
  }
}
