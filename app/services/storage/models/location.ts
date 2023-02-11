import { Observable } from 'rxjs';
import { Model, RawRecord } from "@nozbe/watermelondb"
import { lazy, text } from "@nozbe/watermelondb/decorators"
import { IRawSyncableRecord } from './models';

export interface RawLocation extends IRawSyncableRecord {
  idPai?: string
  designacao: string
}
export class Location extends Model {
  static table = "Localizacao"
  public _raw!: RawLocation

  @text("designacao") name!: string

  @lazy parent = this._raw.idPai ? this.collection.findAndObserve(this._raw.idPai) as Observable<this> : null 
}
