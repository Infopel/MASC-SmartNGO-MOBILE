import {database} from 'storage/database';
import {Beneficiary} from 'storage/models/beneficiary';
import {
  createBeneficiaryRecord,
  CreateBeneficiaryRecordParams,
} from 'storage/models/beneficiary.builder';

const users: CreateBeneficiaryRecordParams[] = [
  {
    id: 'asdsadsad',
    firstName: 'Marie',
    lastName: 'Williams',
    dateOfBirth: 292888800000,
    grade: 'Superior',
    actividadePolitica: false,
    comments: 'Simple comments about',
    conhecimentoEspaco: false,
    gender: 'F',
    maritalStatus: 'Casada',
    occupation: 'Professora',
    participacaoEspaco: true,
    conhecimentoIncubadora: 'SAsad',
    motivoDesistencia: 'Pessima esperiencia',
  },
  {
    id: 'asddhgfhsad',
    firstName: 'Pedro Xibuto',
    lastName: 'Xibuto',
    dateOfBirth: 474588000000,
    grade: 'Tecnico Medio',
    actividadePolitica: true,
    comments: 'Simple comments about',
    conhecimentoEspaco: true,
    gender: 'M',
    maritalStatus: 'Casado',
    occupation: 'Ministro',
    participacaoEspaco: false,
    conhecimentoIncubadora: 'dsfdsfdsf',
  },
  {
    id: 'asdsad',
    firstName: 'Paul',
    lastName: 'Allen',
    dateOfBirth: 753321600000,
    grade: '12 classe',
    actividadePolitica: true,
    comments: 'Nada de mais',
    conhecimentoEspaco: false,
    gender: 'M',
    maritalStatus: 'Viúvo',
    occupation: 'PCA',
    participacaoEspaco: true,
  },
  {
    id: 'asdasdasdsad',
    firstName: 'Antonino',
    lastName: 'Sumbana',
    dateOfBirth: -607658400000,
    grade: 'Superior',
    actividadePolitica: true,
    comments: 'Nothing to brag about',
    conhecimentoEspaco: false,
    gender: 'M',
    maritalStatus: 'Separado',
    occupation: 'asda',
    participacaoEspaco: true,
    motivoDesistencia: 'Pessima esperiencia',
  },
  {
    id: 'gdfg',
    firstName: 'Josefina',
    lastName: 'Abreu',
    dateOfBirth: 1029974400000,
    grade: '12 classe',
    actividadePolitica: true,
    comments: 'Nothing importnt',
    conhecimentoEspaco: true,
    gender: 'F',
    maritalStatus: 'Solteira',
    occupation: 'Director Administrativo',
    participacaoEspaco: false,
  },
];

export function findAllBeneficiaries() {
  return users
    .map(({id, firstName, occupation, lastName, dateOfBirth, grade}) => ({
      id,
      firstName,
      lastName,
      dateOfBirth,
      grade,
      occupation,
    }))
    .sort((a, b) => a.firstName.localeCompare(b.firstName));
}

export async function populateFindAllBeneficiaries() {
  const userCollection = database.get<Beneficiary>(Beneficiary.table);

  return await database.write(async () => {
    return await database.batch(
      ...users.map(u =>
        userCollection.prepareCreate(createBeneficiaryRecord(u)),
      ),
    );
  });
}
