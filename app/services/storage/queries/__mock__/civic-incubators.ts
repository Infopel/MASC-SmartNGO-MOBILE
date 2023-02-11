import { Model } from '@nozbe/watermelondb';
import { differenceInYears } from 'date-fns';
import { database } from 'storage/database';
import { BeneficiaryInitiative } from 'storage/models/beneficiary-initiative';
import { Initiative } from 'storage/models/initiative';
import { IInitiative, IInitiativeParticipant } from '../initiative';
import {
  findAllBeneficiaries,
  populateFindAllBeneficiaries
} from './beneficiary';
import { districts, populateFindAllLocations, provinces } from './location';

const civicIncubators = [
  {id: 'ssjj0m8pnn3u0ma1', name: 'Kupenda', date: 1685794521, location: '21'},
  {id: 'sj0m8jdurnb70ma1', name: 'Chile', date: 1685798621, location: '11'},
  {
    id: 'ssut7hjdyn3u0ma1',
    name: 'Amanda Cumeila',
    date: 16895394521,
    location: '31',
  },
  {
    id: 'ssjj0m8pnt6hj49s',
    name: 'Alpes de Maravel Bilinga',
    date: 16865294521,
    location: '11',
  },
];

export function getResultFindAllCivicIncubators(): IInitiative[] {
  return civicIncubators.map(({id, date, name, location}) => {
    const district = districts.find(d => d.id === location);
    const province = provinces.find(d => d.id === district?.idPai);

    return {
      id,
      date,
      name,
      district: district?.name as string,
      province: province?.name as string,
    };
  });
}

export async function populateFindAllCivicIncubators() {
  const civil = database.get<Initiative>(Initiative.table);
  const batch = [] as Model[];
  await populateFindAllLocations();
  batch.push(
    ...civicIncubators.map(({id, date, name, location}) =>
      civil.prepareCreate(rec => {
        rec._raw.id = id;
        rec._raw.nome = name;
        rec._raw.idLocalizacao = location;
        rec._raw.tipoIniciativa = 'civic-incubator';
        rec._raw.dataConstituicao = date;
      }),
    ),
  );

  await database.write(async () => await database.batch(...batch));
}

const INITIATIVE_PARTICIPANT_CREATED_AT = 1123214312432

export function getAllParticipants(): IInitiativeParticipant[] {
  return findAllBeneficiaries()
    .map(({lastName, firstName, dateOfBirth, grade, id, occupation}) => ({
      age: differenceInYears(Date.now(), dateOfBirth),
      grade,
      id: id + '',
      function: occupation,
      subscribedAt: new Date(INITIATIVE_PARTICIPANT_CREATED_AT),
      name: firstName + ' ' + lastName,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function populateFindAllParticipants() {
  const collection = database.get<BeneficiaryInitiative>(
    BeneficiaryInitiative.table,
  );
  const batch = [] as Model[];
  await populateFindAllCivicIncubators();
  await populateFindAllBeneficiaries();

  const incubators = getResultFindAllCivicIncubators();

  batch.push(
    ...incubators.flatMap(({id}) =>
      getAllParticipants().flatMap(x =>
        collection.prepareCreate(rec => {
          rec._raw.id = x.id + '-' + id;
          rec._raw.initiative_id = id;
          rec._raw.beneficiary_id = x.id;
          rec._raw.created_at = INITIATIVE_PARTICIPANT_CREATED_AT;
        }),
      ),
    ),
  );

  await database.write(async () => await database.batch(...batch));
}
