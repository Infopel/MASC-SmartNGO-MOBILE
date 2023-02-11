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
import { map, of, switchMap } from 'rxjs';
import { Location } from './location';
import { IRawSyncableRecord } from './models';
import { Project } from './project';

export type IInitiativeType =
  | 'civic-incubator'
  | 'vdo'
  | 'peace-ambassador'
  | 'savings-group';
export interface RawInitiative extends IRawSyncableRecord {
  codigo?: string;
  bairro?: string;
  nome?: string;
  dataConstituicao?: number;
  tipoIniciativa?: IInitiativeType;
  idLocalizacao?: string;
  idMobilizador?: string;
  idResponsavel?: string;

  latitude?: number;
  longitude?: number;
  project_id: string;
}

export class Initiative extends Model {
  static table = 'iniciativa';
  public _raw!: RawInitiative;

  public static associations: Associations = {
    beneficiarioiniciativa: {
      type: 'has_many',
      foreignKey: 'initiative_id',
    },
    grupopoupanca: {
      type: 'has_many',
      foreignKey: 'idIniciativa',
    },
    projects: {
      type: 'belongs_to',
      key: 'project_id',
    },
  };
  @relation(Location.table, 'idLocalizacao') location!: Relation<Location>;
  @relation(Project.table, 'project_id') project!: Relation<Project>;

  // @lazy
  // initiatives = this.collections
  //   .get<BeneficiaryInitiative>(BeneficiaryInitiative.table)
  //   .query(Q.on(BeneficiaryInitiative.table, 'initiative_id', this.id));
  // @lazy
  // savingGroups = this.collections
  //   .get<SavingsGroup>(SavingsGroup.table)
  //   .query(Q.on(SavingsGroup.table, 'idIniciativa', this.id));

  @text('nome') name!: string;
  @date('dataConstituicao') date!: Date;
  @field('tipoIniciativa') type!: IInitiativeType;
  @text('localidade') locality!: string;
  @text('posto_admin') adminPost!: string;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  @lazy province = this.location.observe().pipe(
    switchMap(location =>
      !location
        ? of(null)
        : this.database
            .get<Location>(Location.table)
            .findAndObserve(location?._raw.idPai),
    ),
    map(loc => {
      if (loc) {
        return loc.name;
      } else return null;
    }),
  );

  @lazy district = this.location.observe().pipe(
    map(loc => {
      if (loc) {
        return loc.name;
      } else return null;
    }),
  );
}
