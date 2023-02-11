import {Model, Relation} from '@nozbe/watermelondb';
import {
  date,
  field,
  readonly,
  relation,
  text,
} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';
import {Beneficiary} from 'storage/models/beneficiary';
import {Cycle} from './cycle';
import {IRawSyncableRecord, SyncableModel} from './models';
import {SavingsGroup} from './savings-group';

export interface RawSavingsGroupBeneficiary extends IRawSyncableRecord {
  idGrupoPoupanca: string;
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
  membroActivo?: boolean;
}

export class SavingsGroupBeneficiary extends SyncableModel {
  static table = 'poupancabeneficiario';
  public _raw!: RawSavingsGroupBeneficiary;

  public static associations: Associations = {
    grupopoupanca: {
      type: 'belongs_to',
      key: 'idGrupoPoupanca',
    },
    ciclo: {
      type: 'belongs_to',
      key: 'idCiclo',
    },
    beneficiario: {
      type: 'belongs_to',
      key: 'idBeneficiario',
    },
  };

  @relation(Beneficiary.table, 'idBeneficiario')
  beneficiary!: Relation<Beneficiary>;
  @relation(SavingsGroup.table, 'idGrupoPoupanca')
  savingsGroup!: Relation<SavingsGroup>;
  @relation(Cycle.table, 'idCiclo') cycle!: Relation<Cycle>;

  @field('valorPoupanca') savings!: number;
  @field('valorEmprestimo') loan!: number;
  @field('taxaJuro') interestFee!: number;
  @field('valorMulta') fine!: number;
  @field('taxaJuroMulta') interestFeeFine!: number;
  @field('juro') interest!: number;
  @field('valorFundoSocal') socialFundValue!: number;
  @text('actividade') activity!: string;
  @text('aplicacaoDinheiro') savingsApplication!: string;
  @text('beneficioCredito') creditBenefit!: string;
  @field('membroActivo') activeMember?: boolean;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}