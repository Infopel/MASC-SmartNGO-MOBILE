import {Model, Relation} from '@nozbe/watermelondb';
import {
  date,
  field,
  readonly,
  relation,
  text,
} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';
import {IRawSyncableRecord, SyncableModel} from './models';
import {SavingsGroupBeneficiary} from './savings-group-beneficiary';

export interface RawSavingsGroupBeneficiaryMonitoring
  extends IRawSyncableRecord {
  idPoupancaBen?: string;
  valorPoupado?: number;
  valorEmprestimo?: number;
  valorJuro?: number;
  contribuiuFundoSocial?: boolean;
  dataMonitoria?: number;
  valorMulta?: number;
  actividadeRendimento?: string;
  aplicacaoDinheiro?: string;
  beneficioCredito?: string;
}

export class SavingsGroupBeneficiaryMonitoring extends SyncableModel {
  static table = 'monitoriapoupanca';
  public _raw!: RawSavingsGroupBeneficiaryMonitoring;

  public static associations: Associations = {
    poupancabeneficiario: {
      type: 'belongs_to',
      key: 'idPoupancaBen',
    },
  };

  @relation(SavingsGroupBeneficiary.table, 'idPoupancaBen')
  savingsGroupBeneficiary!: Relation<SavingsGroupBeneficiary>;

  @field('valorPoupado') saved!: number;
  @field('valorEmprestimo') loan!: number;
  @field('valorJuro') interest!: number;
  @field('contribuiuFundoSocial') isSocialFundContribuited!: boolean;
  @field('valorMulta') fine?: number;
  @text('actividadeRendimento') activityIncomeValue?: string;
  @text('aplicacaoDinheiro') applicationMoney?: string;
  @text('beneficioCredito') beneficiaryCredit?: string;

  @date('dataMonitoria') date!: Date;
}
