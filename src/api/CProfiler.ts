import type { ISubAPI, IRootAPI } from './root';
// import type { TStatus, TStatusNotistack } from './AppTypes';

type TProfileDataSet = CProfilerRecord[];
interface IProfilerAPI extends ISubAPI {
  // root: any;
  is_profiling: boolean;
  profiler_dataset: TProfileDataSet;
  usingAreaList: TAreaList[];
  new_id: number;
  startTrace(area:TAreaList):number;
  finishTrace(id:number):number;
}

type TAreaList = 'records-manager' | 'records-viewer' | 'metrics-area' | 'db-auto-fetch' | 'db-save';

export default class CProfilerAPI implements IProfilerAPI {
  root: IRootAPI;
  console: boolean;
  is_profiling: boolean;
  profiler_dataset: TProfileDataSet;
  usingAreaList: TAreaList[];
  new_id: number;

  constructor(root: IRootAPI) {
    this.root = root;
    this.is_profiling = false;
    this.profiler_dataset = [];
    this.usingAreaList = [];
    new_id = 0;
  }

  startTrace(area:TAreaList):number{
    this.new_id++;
    const record = new CProfilerRecord(this.new_id, area);
    this.profiler_dataset.push(record);
    this._checkArea(area);
    return record;
  }

  // finishTrace(id:number):number {
  //
  // }
  addTraceRecord(area:TAreaList, startedAt: Date, finishedAt: Date){
    this.new_id++;
    const record = new CProfilerRecord(this.new_id, area, startedAt, finishedAt);
    this.profiler_dataset.push(record);
    this._checkArea(area);
    return record;
  }

  getAreaRecords(area:TAreaList) : TProfileDataSet {
    const areaDataSet = this.profiler_dataset.filter( (item:CProfilerRecord)=> item.area===area);
    return areaDataSet;
  }

  calculateAverageDuration(area:TAreaList) {
    const records = this.getAreaRecords(area);
    let duration = 0;
    let cnt = 0;
    records.forEach( (record:CProfilerRecord) => {
      duration += record.duration;
      cnt++;
    });
    const averageDuration = cnt ? duration/cnt : undefined;
    return averageDuration;
  }

  getAreas() : TAreaList[] {
    return this.usingAreaList;
  }

  _checkArea(area:TAreaList){
    if (this.usingAreaList.indexOf(area)===-1) {
      this.usingAreaList.push(area);
    }
  }

}



// interface IProfilerRecord {
//   id: number;
//   area: TAreaList;
//   start: number;
//   finish: number;
//   duration: number;
// }

// export class CProfilerRecord implements IProfilerRecord {
export class CProfilerRecord {
  id: number;
  area: TAreaList;
  startedAt: number;
  finishedAt: number;
  duration: number;

  constructor(id: number, area:TAreaList, startedAt:Date=undefined, finishedAt: Date = undefined, duration:number = undefined) {
    this.id = id;
    this.area = area;
    this.startedAt = startedAt || new Date();
    this.finishedAt = finishedAt;
    this.duration = duration|| (startedAt&&finishedAt ? finishedAt-startedAt : undefined);
  }

  finish(){
    this.finish = new Date();
    this.duration = this.finish - this.start;
  }
}
