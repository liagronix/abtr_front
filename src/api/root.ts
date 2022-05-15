import CContainer from './Models';
import CListener from "./CListener";
// import CDB from './CDB';
// import CD_ABTR from './CDB_ABTR';
import CDB2_ABTR from './CDB2_ABTR';
import CAbstractObject from './CAbstractObject';
import CLogAPI from './CLog';
import CProfiler from './Profiler';

import type { IOrder, IRoute, TArray } from './AppTypes';

export interface IRootAPI {
  hello() : void;
  getNewID() : number;
  toggleDrawerOpen(value?:boolean) : void;
  getComparator(order: IOrder, orderBy: string): any;
  descendingComparator(a: any, b: any, orderBy: string): any;
  stableSort(array: TArray, comparator: any): any;
  isNumber(num: any): boolean;
  formatDate(source: Date) : string;
  setDateMidnight<Type>(value: Type) : Type
  // isNumberString(value: string): boolean;

  // db: CDB;
  // db_abtr: CD_ABTR;
  db2_abtr: CDB2_ABTR;
  log: CLogAPI;
  profiler: CProfiler;
  isDrawerOpen : boolean;
  location : any;
  is_logged: boolean;
  is_changed: boolean;
  listeners : CListener;
  // carrierName : string;
  // data : {
  //   routes : IRoute[];
  // }

  cw: {
    // vehicles: CContainer;
    userActivities: CContainer;
    savedData: CContainer;
  };
}


export interface ISubAPI {
  root: IRootAPI;
}


export class RootAPI implements IRootAPI {
  // server: AxiosInstance;
  static instance?: RootAPI;
  location : any;
  newID : number;
  isDrawerOpen : boolean;
  is_logged: boolean;
  is_changed: boolean;
  listeners: CListener;
  carrierName : string;
  // db: CDB;
  // db_abtr: CD_ABTR;
  db2_abtr: CDB2_ABTR;
  log: CLogAPI;
  profiler: CProfiler;
  // data : {
  //   routes : IRoute[];
  // }

  cw: {
    // vehicles: CContainer;
    userActivities: CContainer;
    savedData: CContainer;
  };

  constructor() {
    this.newID = -1000;
    this.isDrawerOpen = false;
    this.is_logged = false;
    this.is_changed = false;
    this.listeners = new CListener(this);
    this.carrierName ='';
    this.location = '/';
    CContainer.api = this;
    CAbstractObject.api = this;
    this.cw = { // Data Containers Warehouse
      // loggingData: new CContainer("LoggingData", this)
      // vehicles: new CContainer("Vehicles"),
      userActivities: new CContainer("UserActivities"),
      savedData: new CContainer("UserActivities")
    }
    this.log = new CLogAPI(this);
    this.profiler = new CProfiler(this);
    // this.db = new CDB(this);
    // this.db_abtr = new CD_ABTR(this);
    this.db2_abtr = new CDB2_ABTR(this);
    // this.data={
    //   routes: []
    // }

  }

  static getInstance(): RootAPI {
     if (RootAPI.instance == null) {
       RootAPI.instance = new RootAPI();
     }
     return RootAPI.instance;
  };

  hello() : void {
    console.log('Hello from root api!');
  };

  getNewID() : number {
    this.newID --;
    return this.newID;
  }

  // toggleDrawerOpen() : void {
  //   this.isDrawerOpen = !this.isDrawerOpen;
  // }

  toggleDrawerOpen(value:boolean=undefined) {
    if (value===undefined) {
      this.isDrawerOpen = !this.isDrawerOpen;
    } else if (this.isDrawerOpen==Boolean(value)) {
        return;
    } else {
      this.isDrawerOpen = Boolean(value);
    }

    this.listeners.run('refresh',['drawer']);
  }


    getComparator(order: IOrder, orderBy: string):any {
      return order === 'desc'
        ? (a: any, b: any) => this.descendingComparator(a, b, orderBy)
        : (a: any, b: any) => - this.descendingComparator(a, b, orderBy);
    }

    descendingComparator(a: any, b: any, orderBy: string): any {
      // console.log('descendingComparator. b[orderBy]: ', b[orderBy]);
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }


    stableSort(array: any[], comparator: any): any {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        // console.log('stableSort. a[0], b[0], order: ',a[0], b[0], order);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    }

  isNumber(num: any): boolean {
  	return typeof num === 'number' && !isNaN(num);
  }

  formatDate(source: Date) : string {
    if (!(source instanceof Date)) {
      return process.env.REACT_APP_NO_DATETIME_PLACEHOLDER || 'Not specified';
    }
    return source.toLocaleDateString('ru-RU');
  }

  formatDateTime(source: Date) : string {
    if (!(source instanceof Date)) {
      return process.env.REACT_APP_NO_DATETIME_PLACEHOLDER || 'Not specified';
    }
    return source.toLocaleString('ru-RU');
  }

  setDateMidnight<Type>(value: Type) : Type {
    if (value instanceof Date) {
      value.setHours(0);
      value.setMinutes(0);
      value.setSeconds(0);
    };
    return value;
  }

  isValidDate(d:any ) {
    return d instanceof Date && !isNaN(d as unknown as number);
  }

}
