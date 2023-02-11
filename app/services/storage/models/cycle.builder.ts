import { Cycle } from './cycle';
import { IRawSyncableRecord } from './models';
import { SavingsGroup } from './savings-group';

export interface RawCycle extends IRawSyncableRecord {
  cod?: string;
  nome?: string;
  dataInicio?: number;
  dataFim?: number;
  idGrupoPoupanca: string;
}


type CycleRecordBuilder = (record: Cycle) => void;
export type CreateCycleRecordParams = {
  startDate: Date;
  endDate: Date;
  code?: string;
  name: string;
  id?: string;
};

export function createCycleRecord(
  {endDate, startDate, id, name, code}: CreateCycleRecordParams,
  savingsGroup: SavingsGroup,
): CycleRecordBuilder {
  return (rec: Cycle) => {
    if (id) {
      rec._raw.id = id;
    }
    if (id) {
      rec._raw.cod = code;
    }

    console.log("CycleRecordBuilder", {endDate, startDate, id, name, code})

    rec.savingsGroup.set(savingsGroup);
    rec.name = name;
    rec.startDate = startDate;
    rec.endDate = endDate;
  };
}
