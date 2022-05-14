import type { TAppField } from './AppTypes';

// import CContainer from './Models';
import type CContainer from "./Models"
import CAbstractObject from "./CAbstractObject"
// import * as errors from '../errors';
// import {api} from '../root';

const MVehicles = {
  // title: {default: "[Рег номер...]", type: "string"},
  RegNum: {default: "[Рег номер...]", type: "string"},
  IMEI: {default: undefined as string, type: "string"},
  type: {default: 0, type: "number"},
  model: {default: 0, type: "number"},
  route_id: {default: 0, type: "number"},
  displayed: {default: false, type: "boolean"},
  carrier: {default: 0, type: "number"},
  last_coord: {default: '', type: "string"},
  diff_in: {default: 999, type: "number"},
}
Object.defineProperty(MVehicles, 'name', {value:"Vehicles"});
Object.freeze(MVehicles);


export default class CVehicles extends CAbstractObject {
  id: number;
  RegNum: string;
  IMEI: string;
  type: number;
  model: number;
  route_id: number;
  displayed: boolean;
  carrier: number;

  static model: any = MVehicles;
  static apiUrl: string = '/vehiclea';
  static storeNode: string = 'CVehicles';

  constructor(source:any = undefined) {
    // console.log('constructor. source: ', source);
    const model = CVehicles.model;
    const newItem : TAppField = {} ;
    for (var key in model) {
      newItem[key] = (source && source[key]) ? source[key] : model[key].default;
    }

    if (source.id) {
      newItem.id = source.id;
    }
    super(newItem);
    Object.defineProperty(this, 'id', {value: Number(source.id)||this.getNewID(), writable: true, enumerable: true, configurable:false} );
    for (var key in model) {
      let value : any;
      if (source.hasOwnProperty(key)) {
        if (model[key].type==="datetime") {
          try {
            value = source[key] ? Date.parse(source[key]) : undefined;
          } catch {
            value = undefined;
          }
          // if (value instanceof Date) {
          //   value.setHours(0);
          //   value.setMinutes(0);
          //   value.setSeconds(0);
          // }
        } else {
          value = source[key];
          // value = source[key]||undefined;
        }
      } else {
        value = undefined; //model[key].default;
      }

      // if (key=='is_active') {
        // console.log('A constructor. key: ', key);
        // console.log('A constructor. source[key]: ', source[key]);
        // console.log('A constructor. value: ', value);
      // }
      // Object.defineProperty(this, key, {value, writable: true, enumerable: true, configurable:false} );
      this[key] = value;
    }

    // console.log('QQQ: ', this);
    // console.log('--Constructor. newItem: ', newItem);
  };

  getModel(): typeof MVehicles {
    return CVehicles.model;
  }

  getTitle(): string {
    return this.RegNum;
  }

  getApiUrl(): string {
    return CVehicles.apiUrl;
  }

  setRoute(newRoute:number) :void{
    console.log(`Set new route for RegNum ${this.RegNum}: ${newRoute}`);
  }

}
