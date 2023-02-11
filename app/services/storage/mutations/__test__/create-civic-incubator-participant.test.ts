import {
  createBeneficiaryAndInitiative,
  createBeneficiaryAndInitiativeParams
} from 'storage/mutations/beneficiary-and-initiative.mutations';
describe('Create Civic Incubator', () => {
  it('should take a function with all params and return a void', () => {
    const incubator: createBeneficiaryAndInitiativeParams = {
      firstName: 'Pedro Xibuto',
      lastName: 'Xibuto',
      dateOfBirth: 474588000000,
      grade: 'Tecnico Medio',
      actividadePolitica: true,
      comments: 'Nothing important here',
      conhecimentoEspaco: true,
      conhecimentoIncubadora: 'never ',
      participacaoEspaco: true,
      gender: 'M',
      maritalStatus: 'Solteiro',
      initiativeId: 'asdhsakjd',
      occupation: 'Diretor Clínico',
    };

    expect(createBeneficiaryAndInitiative(incubator)).resolves.toBeEmpty();
  });
  it('should take a function missing any params and return an error', () => {
    //@ts-ignore
    const incubator: createBeneficiaryAndInitiativeParams = {
      firstName: 'Pedro Xibuto',
      lastName: 'Xibuto',
      dateOfBirth: 474588000000,
      grade: 'Tecnico Medio',
      actividadePolitica: true,
      comments: 'Nothing important here',
      conhecimentoEspaco: true,
      conhecimentoIncubadora: 'never ',
      participacaoEspaco: true,
      gender: 'M',
      maritalStatus: 'Solteiro',
      // initiativeId: 'asdhsakjd',
      occupation: 'Diretor Clínico',
    };

    expect(createBeneficiaryAndInitiative(incubator)).rejects.toBeTruthy();
    expect(createBeneficiaryAndInitiative(incubator)).resolves.toBeTruthy();
  });
});
