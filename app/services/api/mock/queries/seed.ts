// import {faker} from '@faker-js/faker';
import {factory, oneOf, primaryKey} from '@mswjs/data';
import faker from 'faker';
import {random} from 'lodash';

// const randomize = legacyFaker.helpers.randomize;
const {datatype, name, address, lorem, date, internet, seed, company} = faker;
// faker.seed(10);

function randomize<T>(data: T[]): T {
  if (data.length === 0) {
    throw new Error('list should have at least one item');
  }
  const num = random(0, data.length - 1, false);
  return data[num];
}

export const db = factory({
  user: {
    id: primaryKey(() => datatype.number(100000000)),
    firstname: name.firstName,
    lastname: name.lastName,
    status: () => randomize([0, 1, 2]),
    language: () => randomize(['pt-PT', 'en-US', 'en-UK', 'pt-MZ']),
    login: datatype.uuid,
    type: () => 'user',
    token: datatype.uuid,
  },
  beneficiario: {
    id: primaryKey(datatype.uuid),
    codigo: datatype.string,
    nome: name.firstName,
    apelido: name.lastName,
    dataNascimento: () =>
      faker.date.between(
        new Date(Date.parse('12-12-1980')),
        new Date(Date.parse('01-10-2002')),
      ),
    estadoCivil: () => randomize(['casado', 'solteiro', 'viuvo']),
    genero: () => randomize(['M', 'F']),
    escolaridade: () =>
      randomize([
        '7a Classe',
        '12a Classe',
        'Licenciado',
        'Tecnico Medio',
        'Mestrado',
      ]),
    nrFilhos: () => datatype.number(8),
    bens: lorem.paragraph,
    viveComParentes: () => randomize([true, false]),
    motivoDesistencia: lorem.paragraph,
    conhecimentoEspaco: () => randomize([true, false]),
    participacaoEspaco: () => randomize([true, false]),
    actividadePolitica: () => randomize([true, false]),
    observacoes: lorem.paragraph,
    latitude: () => parseFloat(address.latitude()),
    longitude: () => parseFloat(address.longitude()),
    foto: internet.avatar,
    conhecimentoIncubadora: () => randomize([null, lorem.paragraph()]),
    funcao: lorem.paragraph,
    povoado: lorem.paragraph,
  },

  projects: {
    id: primaryKey(() => datatype.number(100000000)),
    created_on: date.past,
    updated_on: date.soon,
    created_by: () => oneOf('user'),
    removed_by: () => oneOf('user'),
    updated_by: () => oneOf('user'),
    author_id: () => oneOf('user'),
    start_date: date.past,
    due_date: date.soon,
    description: lorem.paragraph,
    name: () => lorem.words(2),
    codigo: datatype.uuid,
  },
  beneficiario_iniciativa: {
    id: primaryKey(datatype.uuid),
    idIniciativa: datatype.string,
    idBeneficiario: datatype.string,
  },
  iniciativa: {
    id: primaryKey(datatype.uuid),
    bairro: address.streetName,
    codigo: datatype.uuid,
    dataConstituicao: date.past,
    idMobilizador: datatype.string,
    idResponsavel: datatype.string,
    latitude: () => parseFloat(address.latitude()),
    longitude: () => parseFloat(address.longitude()),
    nome: () => lorem.words(2),
    project_id: () => lorem.words(2),
    // project_id: oneOf('projects'),
    tipoIniciativa: () =>
      randomize([
        'civic-incubator',
        'vdo',
        'peace-ambassadors',
        'savings-group',
      ]),
    created_on: date.past,
    updated_on: date.soon,
    created_by: datatype.number,
    removed_by: datatype.number,
    updated_by: datatype.number,
    idLocalizacao: () =>
      randomize(['11', '12', '13', '21', '22', '23', '31', '32', '33']),
  },
  savingGroup: {
    id: primaryKey(datatype.uuid),
    created_on: date.past,
    updated_on: date.soon,
    created_by: lorem.word,
    removed_by: datatype.number,
    updated_by: datatype.number,
    idLocalizacao: () =>
      randomize(['11', '12', '13', '21', '22', '23', '31', '32', '33']),

    nrCiclos: datatype.number,
    nrMembros: datatype.number,
    nrMembrosActivos: datatype.number,
    fundoSocial: datatype.number,
    valorMulta: datatype.number,
    taxaJuro: () => datatype.number({min: 1, max: 10}),
    codigo: datatype.string,
    idIniciativa: datatype.string,
  },
  planoaccao: {
    id: primaryKey(datatype.uuid),
    name: lorem.text,
    startDate: date.past,
    idIniciativa: datatype.string,
    endDate: () => date.between(date.recent(), date.future()),
    created_on: date.past,
    updated_on: date.soon,
    created_by: datatype.number,
    removed_by: datatype.number,
    updated_by: datatype.number,
  },
  reporteplanoaccao: {
    id: primaryKey(datatype.uuid),
    idPlanoAccao: datatype.uuid,
    observations: lorem.text,
    startDate: date.past,
    endDate: () => date.between(date.recent(), date.future()),
    doneRatio: () => datatype.number(100),
    created_on: date.past,
    updated_on: date.soon,
    created_by: datatype.number,
    removed_by: datatype.number,
    updated_by: datatype.number,
  },
  monitoriagrupo: {
    id: primaryKey(datatype.uuid),
    idGrupoPoupanca: datatype.string,
    idUser: datatype.number,
    idCiclo: datatype.string,
    jurosObtidosPoupanca: datatype.number,
    jurosObtidosFundoSocial: datatype.number,
    evoluiuCooperativa: () => randomize([true, false]),
    tipoCooperativa: company.bs,
    problemasGrupo: lorem.sentence,
    dataMonitoria: () => date.between(date.recent(), date.future()),

    created_on: date.past,
    updated_on: date.soon,
    created_by: datatype.number,
    removed_by: datatype.number,
    updated_by: datatype.number,
  },
  ciclo: {
    id: primaryKey(datatype.uuid),
    cod: lorem.word,
    nome: () => lorem.words(2),
    dataInicio: date.past,
    dataFim: () => date.between(date.recent(), date.future()),
    idGrupoPoupanca: datatype.string,

    created_on: date.past,
    updated_on: date.soon,
    created_by: datatype.number,
    removed_by: datatype.number,
    updated_by: datatype.number,
  },
  visitamonitoria: {
    id: primaryKey(datatype.uuid),
    date: date.past,
    type: () => randomize(['0', '1']),
    idIniciativa: datatype.string,
    motive: lorem.sentence,

    created_on: date.past,
    updated_on: date.soon,
    created_by: datatype.number,
    removed_by: datatype.number,
    updated_by: datatype.number,
  },
  poupancabeneficiario: {
    id: primaryKey(datatype.uuid),
    idGrupoPoupanca: datatype.string,
    idCiclo: datatype.string,
    idBeneficiario: datatype.string,
    valorPoupanca: datatype.number,
    valorEmprestimo: datatype.number,
    taxaJuro: datatype.number,
    valorMulta: datatype.number,
    taxaJuroMulta: datatype.number,
    juro: datatype.number,
    valorFundoSocal: datatype.number,
    actividade: lorem.paragraph,

    created_on: date.past,
    updated_on: date.soon,
    created_by: datatype.number,
    removed_by: datatype.number,
    updated_by: datatype.number,
  },
  time_entries: {
    id: primaryKey(() => datatype.number(100000000)),
    user_id: datatype.number,
    issue_id: datatype.number,
    hours: () => random(1, 25),
    comments: lorem.sentence,
    activity_id: datatype.number,
    spent_at: date.recent,
    tyear: () => random(2005, 2022),
    tmonth: () => random(1, 12),
    tweek: () => random(1, 7),
    start_date: date.past,
    due_date: () => date.between(date.recent(), date.future()),
    masc_contribuition: lorem.paragraph,
    falloup: lorem.sentence,
    challenge_lessons: lorem.sentence,
    metting_result: lorem.sentence,
    metting_descrption: lorem.paragraph,
    verification_type: lorem.sentence,
    evidence_type: lorem.sentence,
    peoople_to_inform: lorem.sentence,

    project_id: () => lorem.words(2),
    created_on: date.past,
    updated_on: date.soon,
    created_by: datatype.number,
    removed_by: datatype.number,
    updated_by: datatype.number,
  },
  issues: {
    id: primaryKey(() => datatype.number(100000000)),
    tracker_id: datatype.number,
    project_id: oneOf('projects'),
    subject: lorem.sentence,
    description: lorem.paragraph,
    due_date: () => date.between(date.recent(), date.future()),
    category_id: datatype.number,
    status_id: () => random(0, 2),
    assigned_to_id: datatype.number,
    priority_id: datatype.number,
    fixed_version_id: datatype.number,
    author_id: datatype.number,
    lock_version: datatype.number,
    start_date: datatype.number,
    done_ratio: datatype.number,
    estimated_hours: datatype.number,
    parent_id: datatype.number,
    root_id: datatype.number,
    lft: datatype.number,
    rgt: datatype.number,
    is_private: () => randomize([true, false]),
    closed_at: datatype.number,
    is_aproved: () => randomize([true, false]),
    aproved_by: oneOf('user'),
    solicitacao_fundos_id: datatype.number,
    deleted_on: datatype.number,
    iniciativa_id: datatype.string,

    created_on: date.past,
    updated_on: date.past,
    created_by: datatype.number,
    removed_by: datatype.number,
    updated_by: datatype.number,

    // project_id: () => lorem.words(2),
    // project_id: oneOf('projects'),
    tipoIniciativa: () =>
      randomize([
        'civic-incubator',
        'vdo',
        'peace-ambassadors',
        'savings-group',
      ]),
  },
});

const users = [
  db.user.create({login: 'user@admin'}),
  db.user.create({login: 'f.ricardo'}),
  db.user.create({login: 'fernando.matuss'}),
  db.user.create({login: 'bhavika@cesc'}),
  db.user.create({login: 'marco.polo'}),
  db.user.create({login: 'euclesia.cadia'}),
  db.user.create({login: 'admin'}),
];
const beneficiarios = Array.from({length: 40}).map(() =>
  db.beneficiario.create(),
);

const projects = Array.from({length: 4}).map(() => {
  const user = randomize(users);
  return db.projects.create({
    author_id: user.id,
    created_by: user.id,
    updated_by: user.id,
  });
});

const iniciativas = Array.from({length: 50}).map(() => {
  const project = randomize(projects);
  const user = randomize(users);
  return db.iniciativa.create({
    project_id: project.id,
    created_by: user.id,
    updated_by: user.id,
    idResponsavel: user.id,
    idMobilizador: user.id,
  });
});

const planoaccao = iniciativas.flatMap(i => {
  return Array.from({length: datatype.number(20)}).map(() => {
    const user = randomize(users);
    return db.planoaccao.create({
      created_by: user.id,
      updated_by: user.id,
      idIniciativa: i.id,
    });
  });
});

const visitaMonitoria = iniciativas.flatMap(i => {
  return Array.from({length: datatype.number(20)}).map(() => {
    const user = randomize(users);
    return db.visitamonitoria.create({
      created_by: user.id,
      updated_by: user.id,
      idIniciativa: i.id,
    });
  });
});
const reportePlanoAccao = planoaccao.flatMap(i => {
  return Array.from({length: datatype.number(8)}).map(() => {
    const user = randomize(users);
    return db.reporteplanoaccao.create({
      created_by: user.id,
      updated_by: user.id,
      idPlanoAccao: i.id,
    });
  });
});

const beneficiario_iniciativa = iniciativas
  .filter(x => x.tipoIniciativa !== 'savings-group')
  .map(iniciativa => {
    const beneficiario = randomize(beneficiarios);

    return db.beneficiario_iniciativa.create({
      idIniciativa: iniciativa.id,
      idBeneficiario: beneficiario.id,
    });
  });

const savingGroup = iniciativas
  .filter(x => x.tipoIniciativa === 'savings-group')
  .map(iniciativa => {
    const user = randomize(users);

    return db.savingGroup.create({
      idIniciativa: iniciativa.id,
      created_by: user.id,
      updated_by: user.id,
    });
  });

const cycle = Array.from({length: 20}).map(() => {
  const group = randomize(savingGroup);
  const user = randomize(users);
  return db.ciclo.create({
    idGrupoPoupanca: group.id,
    created_by: user.id,
    updated_by: user.id,
  });
});

const savingGroupBeneficiary = savingGroup.map(group => {
  return beneficiarios
    .filter(b => randomize([true, false]))
    .map(beneficiario =>
      db.poupancabeneficiario.create({
        idBeneficiario: beneficiario.id,
        idCiclo: randomize(['0', '1', '2', '3']),
        idGrupoPoupanca: group.id,
      }),
    );
});
const savingGroupMonitoria = Array.from({length: 200}).map(() => {
  const group = randomize(savingGroup);
  const user = randomize(users);

  return db.monitoriagrupo.create({
    idCiclo: randomize(['0', '1', '2', '3']),
    idGrupoPoupanca: group.id,
    idUser: user.id,
  });
});

const issues = iniciativas.map(iniciativa => {
  const user = randomize(users);
  return db.issues.create({
    iniciativa_id: iniciativa.id,
    author_id: user.id,
    // updated_by: user.id,
    // idResponsavel: user.id,
    // idMobilizador: user.id,
  });
});

const timeEntry = issues.map(issue => {
  const user = randomize(users);
  const project = randomize(projects);
  return db.time_entries.create({
    project_id: project.id,
    issue_id: issue.id,
    user_id: user.id,
    // updated_by: user.id,
    // idResponsavel: user.id,
    // idMobilizador: user.id,
  });
});

export const location = [
  {
    id: '1',
    designacao: 'Maputo Cidade',
  },
  {
    id: '2',
    designacao: 'Sofala',
  },
  {
    id: '3',
    designacao: 'Nampula',
  },
  {
    id: '11',
    designacao: 'Distrito Urbano de KaMpfumo',
    idPai: '1',
  },
  {
    id: '12',
    designacao: 'Distrito Urbano de KaMavota',
    idPai: '1',
  },
  {
    id: '13',
    designacao: 'Distrito Municipal de KaTembe',
    idPai: '1',
  },
  {
    id: '21',
    designacao: 'Beira',
    idPai: '2',
  },
  {
    id: '22',
    designacao: 'Buzi',
    idPai: '2',
  },
  {
    id: '23',
    designacao: 'Caia',
    idPai: '2',
  },
  {
    id: '31',
    designacao: 'Angoche',
    idPai: '3',
  },
  {
    id: '32',
    designacao: 'Nacala Porto',
    idPai: '3',
  },
  {
    id: '33',
    designacao: 'Ilha de Moçambique',
    idPai: '3',
  },
];
