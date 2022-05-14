import type {TListenerType} from "./CListener"
import type {IRootAPI} from "./root"
// import * as errors from '../errors';
import CContainer from "./Models";
import CListener from "./CListener";

export default abstract class CAbstractObject {
  [key:string]: any;
  // root: IRootAPI;
  id: number;
  title: string;
  isChanged: boolean;
  meta: {[key:string]: any};
  updateHandler: any;
  listeners: CListener;

  static api: IRootAPI = undefined;
  static model: any = {name: "Abstract"};
  static containers: CContainer = undefined;
  static apiUrl: string;
  static storeNode: string;
  // static api: IRootAPI;

  abstract getApiUrl():string;
  abstract getModel():{[key:string]:any};
  // abstract isValid(): boolean;
  // abstract getInput(): any;

  // TODO Проверить уникальность ID создаваемого объекта
  constructor(source:any={}) {
    // console.log('Abstract constructor. source: ', source);
    this.save = this.save.bind(this);
    this.setFields = this.setFields.bind(this);
    // Object.defineProperty(this, 'apiUrl', {value: apiUrl} );
    // Object.defineProperty(this, 'storeNode', {value: storeNode} );
    // console.log('Incoming data: ', source);
    // CAbstractObject.api = api;
    if (typeof(source)!=='object') {
      source = {source};
    };

    const model = this.getModel();
    // this.isChanged = false;
    // this.meta = {};
    Object.defineProperty(this, 'meta', {value: {}, writable: true, enumerable: false, configurable:false} );
    Object.defineProperty(this.meta, 'model', {value: model} );
    // Object.defineProperty(this.meta, 'changedFields', {value: [], writable: true} );
    Object.defineProperty(this.meta, 'isNeedUpload', {value: false, writable: true} );
    // Object.defineProperty(this, 'updateHandler', {value: undefined, writable: true, enumerable: false, configurable:false} );
    Object.defineProperty(this, 'listeners', {value: undefined, writable: true, enumerable: false, configurable:false} );
    // Object.defineProperty(this, 'id', {value: Number(source.id)||this.getNewID(), writable: true, enumerable: true, configurable:false} );
    // Object.defineProperty(this, 'title', {value: source.title||'Новый объект', writable: true, enumerable: true, configurable:false} );
    Object.defineProperty(this, 'isChanged', {value: false, writable: true, enumerable: false, configurable:false} );
    // for (var key in model) {
    //   let value;
    //   if (source.hasOwnProperty(key)) {
    //     if (model[key].type==="datetime") {
    //       try {
    //         value = source[key] ? Date.parse(source[key]) : undefined;
    //       } catch {
    //         value = undefined;
    //       }
    //     } else {
    //       value = source[key];
    //       // value = source[key]||undefined;
    //     }
    //   } else {
    //     value = undefined; //model[key].default;
    //   }
    //   // Object.defineProperty(this, key, {value, writable: true, enumerable: true, configurable:false} );
    //
    //   // if (key=='is_active') {
    //     // console.log('A constructor. key: ', key);
    //     // console.log('A constructor. source[key]: ', source[key]);
    //     // console.log('A constructor. value: ', value);
    //   // }
    //   // this[key] = value;
    //   // console.log(`A constructor. this[${key}]: `, this[key]);
    //   // console.log('SSS: ', this);
    // }
    // console.log('ZZZ: ', this);
  }


  getNewID():number {
    return CContainer.api.getNewID();
  }

  get() {
    console.log(`Getting instance of ${this.getModel().name!}: "${this.title}", id=${this.id}`);
    // console.log(`API URL: `, this.getApiUrl());
    return this;
  }

  setByModel(source: any): void {
    const model = this.getModel();
    let value;
    for (var key in model) {
      if (source.hasOwnProperty(key)) {
        if (model[key].type==="datetime") {
          try {
            value = source[key] ? Date.parse(source[key]) : undefined;
          } catch {
            value = source[key];
          }
        } else {
          value = source[key];
          // value = source[key]||undefined;
        }
        Object.defineProperty(this, key, {value, writable: true, enumerable: true, configurable:false} );
        // Object.defineProperty(this, key, {value: source[key]} );
      }
    }
    // if (source?.meta.hasOwnProperty('isNeedUpload')) {
    //   // console.log("this.meta.isNeedUpload!!!");
    //   this.meta.isNeedUpload = source.meta.isNeedUpload;
    // }
  }

  set(source: any): void {
    for(var key in this) {
      if (source[key]) {
        Object.defineProperty(this, key, {value: source[key]} );
      }
    }
    if (source.meta && source.meta.hasOwnProperty('isNeedUpload')) {
      // console.log("this.meta.isNeedUpload!!!");
      this.meta.isNeedUpload = source.meta.isNeedUpload;
    }
  }

  markUpdated() {
    console.log('Run markUpdated()');
    if (!this.isChanged) {
      this.setFields({isChanged: true});
      this.markForUpload();
      CAbstractObject.api.is_changed = true;
    };
  }

  setFields(values: {[key:string]: any}) : void {
    // this.get();
    // console.log('setFields. values: ',values);
    const blockedFields = ['answers', 'id'];
    const updatedFields = [];
    if (typeof(values)!='object') {
      // throw new errors.AppError(110);
    }

    for (var key in values) {
      if (blockedFields.includes(key)) {
        continue;
      }

      if (!(key in this)) {
        console.log(`Попытка установить значение для поля "${key}", которое отсутствует у объекта ${this.getModel().name}`);
        continue;
      };

      if (this[key] !== values[key]) {
        updatedFields.push(key);
        this[key] = values[key];
        // console.log(`Установка значение для поля "${key}": ${values[key]}`);
      }

      if ( updatedFields.length>0 && !this.isChanged && !('isChanged' in values) ) {
        this.isChanged = true;
        updatedFields.push('isChanged');
        if (!CAbstractObject.api.is_changed) {
          CAbstractObject.api.is_changed = true;
          // console.log('is_changed: ', CAbstractObject.api.is_changed);
          CAbstractObject.api.listeners.run('refresh',['header']);
        };
      }

      if (updatedFields.length) {
        this.markForUpload();
        this.runListeners('update', updatedFields);
      }
    }
  }


  runListeners(type: TListenerType, updatedFields: string[] = undefined) {
    if (this.listeners) {
      this.listeners.run(type, updatedFields);
    }
  }


  addListener(...arg: [TListenerType, any, string[]? ]) {
    if (this.listeners) {
      this.listeners.add(...arg);
    } else {
      // const errObj = new errors.AppError(113);
      // CAbstractObject.api.log.addError( errObj );
      console.log('Error 113. Listeners not defined')
      return;
    }
  }


  removeListener(handler: any) {
    if (this.listeners) {
      this.listeners.remove(handler);
    } else {
      // const errObj = new errors.AppError(114);
      // CAbstractObject.api.log.addError( errObj );
      return;
    }
  }


  initListeners() {
    this.listeners = new CListener(this);
  }


  destroyListeners() {
    this.listeners = undefined;
  }


  markForUpload(value : boolean = true) {
    this.meta.isNeedUpload = value;
  }


  save() {
    // console.log('CAbstractObject.save()');
    this.setFields({isChanged: false});
    this.markForUpload();
  }

  // Возвращает данные объекта для выгрузки на сервер,
  // соответствующие структуре модели. Остальное игнорируется.
  //
  getModelData(includeEmpty:boolean=false) :{[key:string]:any}{
    const model = this.getModel();
    const modelData={};
    let value;

    for (var key in model) {
      if (model[key].dontUpload ) {
        continue;
      }

      if (model[key].type==="datetime" && this[key] instanceof Date) {
        // console.log('getModelData. key: ',key);
        // console.log('getModelData. this[key]: ',this[key]);
        // value = this[key].format('YYYY-MM-DD HH:mm');
        value = this[key].toISOString().slice(0, 19).replace('T', ' ');
      } else {
        value = this[key];
      }
      if (typeof value==="undefined" && !includeEmpty) {
        continue;
      }
      Object.defineProperty(modelData, key, {value, writable: true, enumerable: true, configurable:false} );
    }
    return modelData;
  }

}
