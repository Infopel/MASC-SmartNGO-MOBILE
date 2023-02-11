import {Model, Query, RawRecord} from '@nozbe/watermelondb';
import {date, readonly, relation} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';
import Relation from '@nozbe/watermelondb/Relation';
import {Beneficiary} from './beneficiary';
import {Initiative} from './initiative';
import { IRawSyncableRecord } from './models';

export  interface RawBeneficiaryInitiative extends IRawSyncableRecord {
  beneficiary_id: string;
  initiative_id: string;
}

export class BeneficiaryInitiative extends Model {
  static table = 'beneficiarioiniciativa';
  public _raw!: RawBeneficiaryInitiative;

  public static associations: Associations = {
    iniciativa: {
      type: 'belongs_to',
      key: 'initiative_id',
    },
    beneficiario: {
      type: 'belongs_to',
      key: 'beneficiary_id',
    },
  };

  @relation(Beneficiary.table, 'beneficiary_id')
  beneficiary!: Relation<Beneficiary>;
  @relation(Initiative.table, 'initiative_id')
  initiative!: Relation<Initiative>;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}

type BeneficiaryinitiativeRecordBuilder = (record: BeneficiaryInitiative) => void;

export function createBeneficiaryInitiativeRecord(
  beneficiary: Beneficiary,
  initiative: Initiative,
): BeneficiaryinitiativeRecordBuilder {
  return (rec: BeneficiaryInitiative) => {
    rec._raw.id = beneficiary._raw.id + '_' + initiative._raw.id;
    rec._raw.beneficiary_id = beneficiary._raw.id;
    rec._raw.initiative_id = initiative._raw.id;
  };
}
