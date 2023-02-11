import { Initiative, RawInitiative } from './initiative';

type InitiativeRecordBuilder = (record: Initiative) => void;
export type CreateInitiativeRecordParams = {
  id?: string;
  name: string;
  districtId: string;
  type: RawInitiative['tipoIniciativa'];
  projectId?: string;
  locality?: string;
  zone: string;
  dateOfConstitution: number;
  provinceId: string;
  latLng?: {
    latitude: number;
    longitude: number;
  };
};

export function createInitiativeRecord({
  id,
  name,
  districtId,
  type,
  projectId,
  locality,
  latLng,
  zone,
  dateOfConstitution,
  provinceId,
}: CreateInitiativeRecordParams): InitiativeRecordBuilder {
  return (rec: Initiative) => {
    if (id) {
      rec._raw.id = id;
    }

    rec.date = new Date(dateOfConstitution);
    rec._raw.idLocalizacao = districtId;
    rec.name = name;
    rec._raw.tipoIniciativa = type;
    rec._raw.project_id = projectId;
    rec._raw.bairro = zone;
    //FIXME add the replace Math.ramdom for an incremental number
    rec._raw.codigo = provinceId + '/' + districtId + '/' + Math.random();
    if (latLng) {
      rec._raw.latitude = latLng.latitude;
      rec._raw.longitude = latLng.longitude;
    }
  };
}
