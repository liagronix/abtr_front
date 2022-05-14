export type TAppField = {[key:string]:any}
export type TAppFieldObj = {[key:string]:TAppField}


export interface IFeatherService {
  get: Function;
  find: Function;
  create: Function;
  update: Function;
  patch: Function;
  remove: Function;
  hooks?: Function;
  // authentication?: Function;
}

export type IRoute = {
  id: number;
  title: string;
  code: string;
  is_active: boolean
}

export type TStatus = 'success' | 'warning' | 'error' | 'info';
export type TStatusNotistack = {variant:TStatus}
export type IOrder = 'asc' | 'desc';
export type TArray = any[];
