import { date, field, lazy, nochange, text } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import { differenceInYears } from 'date-fns';
import { IRawSyncableRecord, SyncableModel } from './models';

export type IBeneficiaryType = 'civic-incubator' | 'vdo' | 'peace-ambassador';
export interface RawBeneficiary extends IRawSyncableRecord {
  codigo?: string;
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
  povoado?: string;
}

export class Beneficiary extends SyncableModel {
  static table = 'beneficiario';
  public _raw!: RawBeneficiary;

  public static associations: Associations = {
    beneficiarioiniciativa: {
      type: 'has_many',
      foreignKey: 'beneficiary_id',
    },
    participantesaccao: {
      type: 'has_many',
      foreignKey: 'idBeneficiario',
    },
    poupancabeneficiario: {
      type: 'has_many',
      foreignKey: 'idBeneficiario',
    },
  };

  @text('nome') firstName!: string;
  @text('apelido') lastName!: string;
  @date('dataNascimento') dateOfBirth!: Date;
  @text('escolaridade') grade!: string;
  @text('funcao') function!: string;
  @text('genero') gender!: string;
  @nochange @text('codigo') code!: string;
  @text('estadoCivil') maritalStatus!: string;
  @field('nrFilhos') numberOfChildren?: number;
  @text('bens') wealth?: string;
  @field('viveComParentes') livingWithParents?: boolean;
  @text('motivoDesistencia') quittingReason?: string;
  @text('conhecimentoEspaco') spaceKnowleadge!: boolean;
  @text('participacaoEspaco') spaceParticipation!: boolean;
  @text('actividadePolitica') politicalActivity!: boolean;
  @text('observacoes') observations!: string;
  @field('latitude') latitude!: string;
  @field('longitude') longitude!: number;
  @text('foto') picture!: string;
  @text('conhecimentoIncubadora') incubatorKnowledge?: string;
  @text('povoado') zone?: string;
  @lazy age = differenceInYears(Date.now(), this.dateOfBirth);
  @lazy fullName = this.firstName + ' ' + this.lastName;

}