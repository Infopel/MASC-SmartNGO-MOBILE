import { Model, Q } from '@nozbe/watermelondb';
import {
  date,
  field,
  lazy,
  readonly,
  relation
} from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import Relation from '@nozbe/watermelondb/Relation';
import { Cycle } from './cycle';
import { Initiative } from './initiative';
import { Location } from './location';
import { IRawSyncableRecord, lateCollections, SyncableModel } from './models';
import { SavingsGroupBeneficiary } from './savings-group-beneficiary';

export interface RawSavingsGroup extends IRawSyncableRecord {
  nrCiclos?: number;
  nrMembros?: number;
  nrMembrosActivos?: number;
  fundoSocial?: number;
  valorMulta?: number;
  taxaJuro?: number;
  codigo: string;
  idIniciativa?: number;
  dataConstituicao: number;
  idLocalizacao?: string;
}

export class SavingsGroup extends SyncableModel {
  static table = 'grupopoupanca';
  public _raw!: RawSavingsGroup;

  public static associations: Associations = {
    iniciativa: {
      type: 'belongs_to',
      key: 'idIniciativa',
    },
    Location: {
      type: 'belongs_to',
      key: 'idLocalizacao',
    },
    poupancabeneficiario: {
      type: 'has_many',
      foreignKey: 'idGrupoPoupanca',
    },
    ciclo: {
      type: 'has_many',
      foreignKey: 'idGrupoPoupanca',
    },
  };

  @relation(Initiative.table, 'idIniciativa')
  initiative!: Relation<Initiative>;
  @relation(Location.table, 'idLocalizacao')
  location!: Relation<Location>;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  @lazy cycles = lateCollections(this.collections, () => Cycle)
    .query(Q.where('idGrupoPoupanca', this.id))
  @lazy members = lateCollections(
    this.collections,
    () => SavingsGroupBeneficiary,
  ).query(Q.where('idGrupoPoupanca', this.id));
  @lazy activeMembers = this.members
    .extend(Q.where('membroActivo', true))
  @field('fundoSocial') socialFund?: number;
  @field('valorMulta') fineValue?: number;
  @field('taxaJuro') interestsFee?: number;
  @readonly @field('codigo') code?: string;
  @date('dataConstituicao') dateOfConstitution!: Date;
}