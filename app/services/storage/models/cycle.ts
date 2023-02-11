import { Relation } from '@nozbe/watermelondb';
import { date, relation, text } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import { IRawSyncableRecord, SyncableModel } from './models';
import { SavingsGroup } from './savings-group';

export interface RawCycle extends IRawSyncableRecord {
  cod?: string;
  nome?: string;
  dataInicio?: number;
  dataFim?: number;
  idGrupoPoupanca: string;
}

export class Cycle extends SyncableModel {
  static table = 'ciclo';
  public _raw!: RawCycle;

  public static associations: Associations = {
    grupopoupanca: {
      type: 'belongs_to',
      key: 'idGrupoPoupanca',
    },
    poupancabeneficiario: {
      type: 'belongs_to',
      key: 'idCiclo',
    },
    monitoriagrupo: {
      type: 'belongs_to',
      key: 'idCiclo',
    },
  };
  @relation(SavingsGroup.table, 'idGrupoPoupanca')
  savingsGroup!: Relation<SavingsGroup>;

  @date('dataInicio') startDate!: Date;
  @date('dataFim') endDate!: Date;
  @text('cod') code!: string;
  @text('nome') name!: string;
}

