import {Model, RawRecord, Relation} from '@nozbe/watermelondb';
import {date, readonly, relation} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';
import {Action} from './action';
import {Beneficiary} from './beneficiary';
import { IRawSyncableRecord } from './models';

export interface RawParticipantAction extends IRawSyncableRecord {
  idAccao: string;
  idBeneficiario: string;
}

export class ParticipantAction extends Model {
  static table = 'participantesaccao';
  public _raw!: RawParticipantAction;

  public static associations: Associations = {
    accao: {
      type: 'belongs_to',
      key: 'idAccao',
    },
    beneficiario: {
      type: 'belongs_to',
      key: 'idBeneficiario',
    },
  };

  @relation(Beneficiary.table, 'idBeneficiario')
  beneficiary!: Relation<Beneficiary>;
  @relation(Action.table, 'idAccao')
  initiative!: Relation<Action>;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
