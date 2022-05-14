import type { TAppField } from './AppTypes';

// import CContainer from './Models';
import type CContainer from "./Models"
import CAbstractObject from "./CAbstractObject"
// import * as errors from '../errors';
// import {api} from '../root';

const MUserActivity = {
  // title: {default: "[Рег номер...]", type: "string"},
  user_id: {default: "10001", type: "number"},
  registration: {default: null as Date, type: "datetime"},
  last_activity: {default: null as Date, type: "datetime"}
}
Object.defineProperty(MUserActivity, 'name', {value:"UserActivity"});
Object.freeze(MUserActivity);


export default class CUserActivities extends CAbstractObject {
  user_id: number;
  registration: Date;
  last_activity: Date;
  errorList: string[];

  static model: any = MUserActivity;
  static apiUrl: string = 'useractivity';
  static storeNode: string = 'CUserActivities';

  constructor(source:any = undefined) {
    // console.log('constructor. source: ', source);
    const model = CUserActivities.model;
    const newItem : TAppField = {} ;
    for (var key in model) {
      newItem[key] = (source && source[key]) ? source[key] : model[key].default;
    }

    if (source.id) {
      newItem.id = source.id;
    }
    super(newItem);
    Object.defineProperty(this, 'id', {value: Number(source.id)||this.getNewID(), writable: true, enumerable: true, configurable:false} );
    Object.defineProperty(this, 'isEditing', {value: false, writable: true, enumerable: false, configurable:false} );
    Object.defineProperty(this, 'isWrong', {value: false, writable: true, enumerable: false, configurable:false} );
    Object.defineProperty(this, 'isEdit', {value: false, writable: true, enumerable: false, configurable:false} );
    Object.defineProperty(this, 'errorList', {value: [], writable: true, enumerable: false, configurable:false} );
    for (var key in model) {
      let value;
      if (source.hasOwnProperty(key)) {
        if (model[key].type=="datetime") {
          try {
            const _v = Date.parse(source[key]);
            value = isNaN(_v) ? null : CAbstractObject.api.setDateMidnight(new Date(_v));
            // console.log('value: ', value);
          } catch {
            value = null;
          }
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

  getModel(): typeof MUserActivity {
    return CUserActivities.model;
  }

  getTitle(): string {
    return `User ID: ${this.user_id}`;
  }

  getApiUrl(): string {
    return CUserActivities.apiUrl;
  }

  isValidDate(d:any ) {
    return d instanceof Date && !isNaN(d as unknown as number);
  }

  check(api:any, userID : number = undefined, registration : Date = undefined, last_activity: Date = undefined) {
    // const api = this.container.api;

    this.errorList = [];
    const _now = new Date();
    const _user_id = userID || this.user_id;
    const _registration = registration===undefined ?  this.registration : registration;
    const _last_activity = last_activity===undefined ?  this.last_activity : last_activity;
    // const _last_activity = last_activity || this.last_activity;

    const ua = api.cw.userActivities.get();
    const filterItems = ua.filter( (item:any) => item.user_id===_user_id);

    if (!_user_id) {
      this.errorList.push('User ID must be positive number');
    } else if (filterItems.length>1 || (filterItems.length==1 && filterItems[0]!=this)) { // В контейнере есть запись с таким же ID
      // console.log('filterItems: ',filterItems);
      // console.log('userID: ',userID);
      this.errorList.push('Exist record with the same User ID');
      // return false;
    }

    if (_registration==null) {
      this.errorList.push('Registration date is not specified');
    } else if (!this.isValidDate(_registration)) {
      this.errorList.push('Registration date is wrong');
    } else if (_registration>_now) {
      this.errorList.push('Registration date is greater than the current date');
    }

    if (_last_activity!=null && !this.isValidDate(_last_activity)) {
      this.errorList.push('Last activity date is wrong');
    } else if (_last_activity>_now) {
      this.errorList.push('Last activity date is greater than the current date');
    }

    if (this.isValidDate(_last_activity) && this.isValidDate(_registration) && _last_activity<_registration) {
      this.errorList.push('Last activity date is less than registration date');
    }

    this.isWrong = Boolean(this.errorList.length);
    return this.errorList;
  }

}
