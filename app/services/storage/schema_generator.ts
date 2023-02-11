import { convertRemToAbsolute } from "native-base/lib/typescript/theme/tools";

const initiative = `codigo?: string;
bairro?: string;
nome?: string;
dataConstituicao?: number;
tipoIniciativa?: IInitiativeType;
idLocalizacao?: string;
idMobilizador?: string;
idResponsavel?: string;

latitude?: number;
longitude?: number;
project_id: string;`;
const savingsGroup = `initiative_id: string;
nrCiclos?: number;
nrMembros?: number;
nrMembrosActivos?: number;
fundoSocial?: number;
valorMulta?: number;
taxaJuro?: number;
codigo: string;
idIniciativa?: number;
dataConstituicao: Date;
idLocalizacao?: string;`;
const cycle = `cod?: string;
dataInicio?: number;
dataFim?: number;
idGrupoPoupanca: string;`;

const participantAction = `idAccao: string;
idBeneficiario: string`;
const project = `name: string;
description?: string;
homepage: string;
is_public: boolean;
parent_id?: string;
author_id: string;
identifier?: string;
status: number;
has_shared_budget: number;
type: string;
lft?: number;
rgt?: number;
inherit_members: boolean;
default_version_id?: number;
default_assigned_to_id?: number;
start_date?: number;
due_date?:  number;
deleted_at?:  number;
validated_on?:  number;`;

const timeEntry = `  project_id: number;
user_id: number;
issue_id?: number;
hours: number;
comments?: string;
activity_id: number;
spent_on: Date;
tyear: number;
tmonth: number;
tweek: number;
start_date?: number;
due_date?: number;
masc_contribuition?: string;
falloup?: string;
challenge_lessons?: string;
metting_result?: string;
metting_descrption?: string;
verification_type?: string;
evidence_type?: string;
peoople_to_inform?: string;
custom_type: string;
is_reported: boolean;
is_approved: boolean`;
const issue = `  tracker_id: number;
project_id: number;
subject: string;
description?: string;
due_date?: number;
category_id?: number;
status_id: number;
assigned_to_id?: number;
priority_id: number;
fixed_version_id?: number;
author_id: number;
lock_version: number;
start_date?: number;
done_ratio: number;
estimated_hours?: number;
parent_id?: number;
root_id?: number;
lft?: number;
rgt?: number;
is_private?: boolean;
closed_at?: number;
is_aproved?: boolean;
aproved_by?: number;
aproved_at?: number;
solicitacao_fundos_id?: number;
iniciativa_id?: string;`

const action = `  idIniciativa: string;
tipoAccao?: number;
assunto?: string;
dataFormacao?: number;
coordenador?: string;
descricao?: string;
nrParticipantesHomesn?: number;
resultados?: string;
observacoes?: string;
nrParticipantesMulheres?: number;`

const user = `  firstname: string;
lastname: string;
status: number;
language: string;
type: string;
login: string;`

const beneficiary = `    codigo?: string;
nome?: string;
apelido?: string;
dataNascimento?: number;
estadoCivil?: string;
genero?: string;
escolaridade?: string;
nrFilhos?: number;
bens?: string;
viveComParentes?: boolean;
motivoDesistencia?: string;
conhecimentoEspaco?: boolean;
participacaoEspaco?: boolean;
actividadePolitica?: boolean;
observacoes?: string;
latitude?: number;
longitude?: number;
foto?: string;
conhecimentoIncubadora?: string;
funcao?: string;
povoado?: string;`
const savingsGroupMonitoring = `  idGrupoPoupanca: string;
idCiclo: string;
jurosObtidosPoupanca: number;
jurosObtidosFundoSocial: number;
evoluiuCooperativa?: boolean;
tipoCooperativa: number;
problemasGrupo: string;
dataMonitoria: number;`
const savingsGroupBeneficiary = `idGrupoPoupanca: string;
idCiclo: string;
idBeneficiario: string;
valorPoupanca?: number;
valorEmprestimo?: number;
taxaJuro?: number;
valorMulta?: number;
taxaJuroMulta?: number;
juro?: number;
valorFundoSocal?: number;
actividade: string;
aplicacaoDinheiro?: string;
beneficioCredito?: string;
membroActivo?: boolean;`
const actionPlan = `name: string;
idIniciativa: string;
start_date: number;
end_date: number;
done_ration: number;`

const monitoriapoupanca = `idPoupancaBen?: string;
valorPoupado?: number;
valorEmprestimo?: number;
valorJuro?: number;
contribuiuFundoSocial?: boolean;
dataMonitoria?: number;
valorMulta?: number;
actividadeRendimento?: string;
aplicacaoDinheiro?: string;
beneficioCredito?: string;`


// console.log(JSON.stringify(generateFields(participantAction)));
// console.log(JSON.stringify(generateFields(initiative)));
// console.log(JSON.stringify(generateFields(project)));
// console.log(JSON.stringify(generateFields(action)));
// console.log(JSON.stringify(generateFields(timeEntry)));
// console.log(JSON.stringify(generateFields(user)));
console.log(JSON.stringify(generateFields(beneficiary)));
// console.log(JSON.stringify(generateFields(savingsGroup)));
// console.log(JSON.stringify(generateFields(savingsGroupMonitoring)));
// console.log(JSON.stringify(generateFields(savingsGroupBeneficiary)));
// console.log(JSON.stringify(generateFields(actionPlan)));
// console.log(JSON.stringify(generateFields(monitoriapoupanca)));
// console.log(JSON.stringify(generateFields(cycle)));

function generateFields(columns: string) {
  let text = columns.trim();
  const lastIndex = text.length - 1;
  if (text[lastIndex] === ';') {
    text = text.substring(0, lastIndex);
  }
  return text
    .replace(/\n/g, '')
    .split(';')
    .map(x => {
      const splitter = x.split(':');
      const prefix = splitter[0].trim();
      const suffix = splitter[1].trim();
      const name = prefix.replace(/\?/g, '');
      const optional = prefix.includes('?') ? ',isOptional: true' : '';
      const type =
        suffix === 'number' 
        || suffix === 'Date'
          ? 'number'
          : suffix === 'boolean'
          ? 'boolean'
          : 'string';

      return `{ name: '${name}' ${optional} ,  type: '${type}'}`;
    })
    .reduce((acc, x) => acc + ',' + x);
}
