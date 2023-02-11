import { Model, Relation } from '@nozbe/watermelondb';
import {
  date,
  field,
  lazy,
  readonly,
  relation,
  text
} from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import { isNil } from 'lodash';
import { map } from 'rxjs/operators';
import { ActionType } from './action-type';
import { IRawSyncableRecord } from './models';

export  interface RawAction extends IRawSyncableRecord {
  idIniciativa: string;
  tipoAccao?: number;
  assunto?: string;
  dataFormacao?: number;
  coordenador?: string;
  descricao?: string;
  nrParticipantesHomesn?: number;
  resultados?: string;
  observacoes?: string;
  nrParticipantesMulheres?: number;
}

export class Action extends Model {
  static table = 'accao';
  public _raw!: RawAction;

  public static associations: Associations = {
    participantesaccao: {
      type: 'has_many',
      foreignKey: 'idAccao',
    },
  };

  @text('descricao') name!: string;
  @field('nrParticipantesHomesn') maleParticipants!: number;
  @field('nrParticipantesMulheres') femaleParticipants!: number;

  @lazy participants = this.maleParticipants + this.femaleParticipants;

  @relation(ActionType.table, 'tipoAccao') typeAction!: Relation<ActionType>;
  @lazy type = this.typeAction
    .observe()
    .pipe(map(action => (isNil(action) ? action : action._raw.descricao)));

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}