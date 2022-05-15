import type { IRootAPI } from './root'
import CUserActivities from "./CUserActivities"
import { scaleBand, scaleLinear } from '@visx/scale';
// import * as errors from '../errors';

const appObjects:{[key:string]: any} = {
  "UserActivities": CUserActivities,
};

const Day_ms = 24*60*60*1000;

export default class CContainer {
  static api: IRootAPI;
  storage: any[];
  dataVersion: number;
  rollingRetention: number;
  is_db_operating: boolean;
  is_calculatingRR: boolean;
  is_calculatingGDS: boolean;
  graph_data: any;
  // graph_data: {[key:string|number]:number};
  timer: any;
  autoLoadDataCompletedCallback: Function;
  autoLoadPendingTasks: Function[];

  _classProto: any;
  // work: boolean;

  constructor(baseClass: string) {
    this.storage = [];
    this.dataVersion = undefined;
    this.is_db_operating = false;
    this.is_calculatingRR = false;
    this.is_calculatingGDS = false;
    this.timer = undefined;
    this.autoLoadPendingTasks = [];
    this.graph_data = undefined;
    this.rollingRetention = undefined;
    this.autoLoadDataCompletedCallback = undefined;

    this._calculateRollingRetention = this._calculateRollingRetention.bind(this);
    this._calculateGraphDataSet = this._calculateGraphDataSet.bind(this);
    this.calculateMetrics = this.calculateMetrics.bind(this);
    this.autoLoadDataSet = this.autoLoadDataSet.bind(this);
    // CContainer.api = api;
    const classProto = appObjects[baseClass];
    if (!classProto) {
      throw new Error(`Incorrect class name "${baseClass}". Container NOT created.`);
    }

    classProto.container = this;
    // Object.defineProperty(classProto, 'container', {value: this});
    Object.defineProperty(this, '_classProto', {value: classProto});
    // console.log(`Container class of "${baseClass}" created.`);
    // this.work = true;
  }

  stopAutoLoading() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
      this.autoLoadDataCompletedCallback = undefined;
      this.dataVersion = 0;
    }
  }

  startAutoLoading(autoLoadDataCompletedCallback: Function = undefined) {
    if (!this.timer) {
      this.dataVersion = 0;
      this.autoLoadDataSet();
      this.timer = setInterval(this.autoLoadDataSet, 1000);
      this.autoLoadDataCompletedCallback = autoLoadDataCompletedCallback;
    }
  }

  autoLoadDataSet() :void {
    if (this.is_db_operating)
      return;

    // console.log('start auto load operation...');
    const api = CContainer.api;
    // api.db_abtr.core.authentication.reAuthenticate()
    //   .then( (auth:any) => {
    // console.log('AutoLoad. auth: ', auth);
    this.is_db_operating = true;

    // api.db_abtr.userActivities.find()
    api.db2_abtr.ua.find()
      .then( (response:any) => {
        // console.log('autoLoadDataSet. response.version: ', response.version);
        if (!response.version || response.version==this.dataVersion || !Array.isArray(response.dataset)) {
          return
        }

        this.bulkLoad(response.dataset);
        this.dataVersion = response.version;
        // console.log('AutoLoad. bulkLoad done');
        if (typeof this.autoLoadDataCompletedCallback == 'function') {
          this.autoLoadDataCompletedCallback();
        };

        while (this.autoLoadPendingTasks.length) {
          const task = this.autoLoadPendingTasks.pop();
          if (typeof task=='function') {
            task();
          }
        }
      })
      .catch( (err:any)=>{
        const txt = err.message+ (err.message==='Network Error' ? '. Check the connection to the Internet.' : '');
        const message = `${err.status || '[SYSTEM]' }: ${txt || 'Error of loading data from server'}`;
        console.log('Auto load data error:' + message);
      })
    .finally( ()=>{
      this.is_db_operating = false;
    })

  }


  create(param:any) {
    const newInstance = new this._classProto(param);
    this.storage.push(newInstance);
    return newInstance;
  }

  clear():void {
    this.storage = [];
  }

  get(id:number = undefined): any[] | any {
    if (typeof id==='number') {
      return this.getItemByID(id);
    }
    return this.storage;
    // console.log(`Storage of container:`);
    // console.log(this.storage);
  }

  getItemByID(id:number): any {
    const result = this.storage.find( (item:any) => item.id==id);
    return result;
  }


  pushItem(item:any):any {
    const newInstance = new this._classProto(item);
    this.storage.push(newInstance);
    return newInstance;
  }

  popItem(item:any, raiseError: boolean = false):any {
    const id = typeof item == 'object' ? item.id : item;
    const index = this.storage.findIndex( (item:any) => item.id==id);
    if (index==-1) {
      return undefined;
    }
    const removeItem = this.storage.splice( index, 1);
    return removeItem;
  }

  replaceOrPushItem(item:any):any {
    const index = this.storage.findIndex( (i:any) => i.id==item.id);
    if (index>-1) {
      this.popItem(item);
    }
    return this.pushItem(item);
  }

  bulkLoad(items:any) {
    this.clear();
    if (!Array.isArray(items)) {
      return false;
    }
    for (var i=0; i<items.length; ++i) {
      const newInstance = this.pushItem(items[i]);
    }
  }

  isHaveError() : boolean {
    return this.get().some( (item:any)=>item.isWrong);
  }

  isEditing() : boolean {
    return this.get().some( (item:any)=>item.isEdit);
  }

  save() : Promise<any> {
    const raw_data = this.get();
    const user_activities = raw_data.map ( (record:any) => ({
      id: record.id,
      user_id: record.user_id,
      registration: record.registration.toLocaleDateString("fr-CA"),
      last_activity: (record.last_activity instanceof Date) ? record.last_activity.toLocaleDateString("fr-CA") : null
    }))

    const data = {
      user_activities
    }
    return CContainer.api.db2_abtr.ua.save(data);
    // return CContainer.api.db_abtr.userActivities.create(data);
  }


  async loadData() : Promise<CUserActivities[]|any> {
    const api = CContainer.api;
    api.db2_abtr.isLoading = true;
    api.db2_abtr.isDataReady = false;
    api.listeners.run('refresh', ['main-table']);
    this.clear();
    return api.db2_abtr.ua.find()
    // return api.db_abtr.userActivities.find()
      .then( (response:any) => {
        // console.log('onGetDataClick. response: ', response);
        if (Array.isArray(response.dataset)) {
          this.bulkLoad(response.dataset);
          this.storage.forEach( (item:CUserActivities)=>item.check(api));
          api.db2_abtr.isDataReady = true;
          this.dataVersion = response.version;
          api.log.informSuccess('Data from server successfully loaded');
          return Promise.resolve(this.storage);
        }
      })
      .catch( (err:any)=>{
        const txt = err.message+ (err.message==='Network Error' ? '. Check the connection to the Internet.' : '');
        const message = `${err.status || '[SYSTEM]' }: ${txt || 'Error of loading data from server'}`;
        api.log.informError(message);
        // console.log('Error in loadData: ');
        // console.dir(err);
        // console.dir(err.message.status , { depth: null });
        return Promise.reject(err);
      })
      .finally( ()=>{
        api.db2_abtr.isLoading = false;
        api.listeners.run('refresh', ['main-table']);
      })
  }

  calculateMetrics(days:number=7) {
    if (this.is_db_operating) {
      this.autoLoadPendingTasks.push(this._calculateRollingRetention);
      this.autoLoadPendingTasks.push(this._calculateGraphDataSet);
    } else {
      this._calculateRollingRetention(days);
      this._calculateGraphDataSet();
    };
  }

  _calculateRollingRetention(days:number=7) {
    if (this.is_calculatingRR) {
      return;
    }

    const api = CContainer.api;
    api.listeners.run('refresh', ['rolling-retention']);
    let returnCnt = 0;
    let registerCnt = 0;
    const _now : Date = api.setDateMidnight(new Date());
    this.is_calculatingRR=true;

    const records = this.get();

    // console.log('RECORDS: ', records);
    if (!Array.isArray(records)) {
      this.rollingRetention = undefined;
      api.log.informWarning('Data of wrong format received from the server');
    } else if (!records.length) {
      this.rollingRetention = undefined;
      api.log.informWarning('Empty saved data set received from server');
    } else {
      records.forEach( (record:CUserActivities) => {
        const item = new CUserActivities(record);
          if (item.last_activity &&
              ((item.last_activity as any - (item.registration as any)) /Day_ms) >= days) {
            returnCnt ++;
          }

          if (item.registration && ((_now as any - (item.registration as any))/Day_ms) >= days) {
            registerCnt++;
          }
      });
      this.rollingRetention = !registerCnt ? null :
        Math.round(returnCnt/registerCnt*100);
    }

    this.is_calculatingRR=false;
    api.listeners.run('refresh', ['rolling-retention']);

  }

  getGraphData() {
    return this.graph_data;
  }

  _calculateGraphDataSet() {
    if (this.is_calculatingGDS) {
      return;
    }
    this.is_calculatingGDS=true;

    const api = CContainer.api;
    const records = this.get();

    const temp_data : {[key:string|number]:number} = {
      // no_activity: 0
    }

    records.forEach( (record:CUserActivities) => {
      const day_diff = this._dateDayDiff(record.registration, record.last_activity);
      if (temp_data.hasOwnProperty(day_diff)) {
        temp_data[day_diff]++;
      } else {
        temp_data[day_diff]=1;
      }
    });

    const adata = []


    for (var key in temp_data) {
      adata.push( {
        days: key,
        count: temp_data[key],
        label: key=='-1' ? 'NA' : ( key=='0' ? '<1' : key),
        title: key=='-1' ? process.env.REACT_APP_NO_DATETIME_PLACEHOLDER : ( key=='0' ? 'Less than one day' : `Days: ${key}`),
      })
    }

    adata.sort( (a:any, b:any)=>a.days-b.days);

    // console.log('graph_data: ', this.graph_data);
    const verticalMargin = Number(process.env.REACT_APP_GRAPH_AREA_VERTICAL_MARGIN) || 60;
    const width=process.env.REACT_APP_BASE_WIDTH ? Number(process.env.REACT_APP_BASE_WIDTH)-32 : 770;
    const height = Number(process.env.REACT_APP_GRAPH_AREA_HEIGHT) || 500;
    const xMax = width;
    const yMax = height - verticalMargin;
    const maxYvalue = Math.max(...adata.map((d:any)=>d.count));

    const xScale = scaleBand<string>({
      range: [-1, xMax],
      round: true,
      domain: adata.map((d:any)=>d.label),
      padding: 0.4,
    });

    const yScale = scaleLinear<number>({
      range: [yMax, 0],
      round: true,
      domain: [0, maxYvalue],
    });

    this.graph_data={
      dataSet: adata,
      width,
      height,
      xMax,
      yMax,
      maxYvalue,
      xScale,
      yScale,
      verticalMargin
    };

    api.listeners.run('refresh', ['life-span-graph']);
    this.is_calculatingGDS=false;
    // return graph_data;
  }

  _dateDayDiff(start_date: Date, finish_date: Date) {
    if (!(start_date instanceof Date) || !(finish_date instanceof Date)) {
      return '-1';
    } else {
      return Math.floor(((finish_date as any) - (start_date as any)) / Day_ms);
    }
  }


  getRollingRetention() {
    const r = this.rollingRetention;
    if (r === null || r === undefined) {
      return 'Not calculated'
    } else {
      return `${r}%`;
    }
  }

    // format_date( value: Date) {
    //   return `${value.getFullYear()}-${value.getMonth()}-${value.getDay()}`;
    // }
}
