import { Model, Relation } from '@nozbe/watermelondb';
import {
  date,
  field, readonly,
  relation,
  text
} from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import { Cycle } from './cycle';
import { IRawSyncableRecord, SyncableModel } from './models';
import { SavingsGroup } from './savings-group';
import { User } from './user';

export interface RawSavingsGroupMonitoring extends IRawSyncableRecord {
  idGrupoPoupanca: string;
  idCiclo: string;
  idUser: string;
  idBeneficiario: string;
  jurosObtidosPoupanca: number;
  jurosObtidosFundoSocial: number;
  evoluiuCooperativa?: boolean;
  tipoCooperativa: number;
  problemasGrupo: string;
  dataMonitoria: number;
}

export class SavingsGroupMonitoring extends SyncableModel {
  static table = 'monitoriagrupo';
  public _raw!: RawSavingsGroupMonitoring;

  public static associations: Associations = {
    grupopoupanca: {
      type: 'belongs_to',
      key: 'idGrupoPoupanca',
    },
    ciclo: {
      type: 'belongs_to',
      key: 'idCiclo',
    },
    users: {
      type: 'belongs_to',
      key: 'idUser',
    },
  };
  @relation(SavingsGroup.table, 'idGrupoPoupanca')
  savingsGroup!: Relation<SavingsGroup>;
  @relation(User.table, 'idUser')
  user!: Relation<User>;
  @relation(Cycle.table, 'idCiclo') cycle!: Relation<Cycle>;

  @field('jurosObtidosPoupanca') savingsInterest!: number;
  @field('jurosObtidosFundoSocial') socialFundInterest!: number;
  @date('dataMonitoria') date!: Date;
  @text('tipoCooperativa') type!: string;
  @field('evoluiuCooperativa') isCooperativeEvolved!: boolean;
  @text('problemasGrupo') problems!: string;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
