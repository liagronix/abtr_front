import type { ISubAPI, IRootAPI } from './root';
import type { TStatus, TStatusNotistack } from './AppTypes';

interface ILogAPI extends ISubAPI {
  // root: any;
  console: boolean;
  __enqueueSnackbar: any;
  __closeSnackbar: any;

  setSnackbar(enqueueSnackbar: any, closeSnackbar: any): void;
  // enqueueSnackbar(message: string, variant:TStatus): void;
  informWarning(message:string):void;
  inform(message:string):void;
  informSuccess(message:string):void;
  informError(message:string):void;
  showError(errorObj: any, showSnackBarMessage: boolean): void;
}


export default class CLogAPI implements ILogAPI {
  root: IRootAPI;
  console: boolean;
  // errors: {[key:string]:{[key:string]:any}};
  __enqueueSnackbar: any;
  __closeSnackbar: any;

  constructor(root: IRootAPI) {
    this.root = root;
    this.console = true;
    this.__enqueueSnackbar = null;
    this.__closeSnackbar = null;
    // this.errors =errors_bundle;
  }



  setSnackbar(enqueueSnackbar: any, closeSnackbar: any): void {
    this.__enqueueSnackbar = enqueueSnackbar;
    this.__closeSnackbar = closeSnackbar;
  }

  // https://iamhosseindhv.com/notistack/demos
  // config = {variant: 'default' | 'success' | 'error' | 'warning' | 'info'}
  enqueueSnackbar(message: string, variant:TStatus|TStatusNotistack): void {
    if (this.__enqueueSnackbar) {
      this.__enqueueSnackbar(message, variant);
    }
  }

  informWarning(message:string):void {
    this.enqueueSnackbar(message, {variant: "warning"});
  }

  inform(message:string):void {
    this.enqueueSnackbar(message, {variant: "info"});
  }

  informSuccess(message:string):void {
    this.enqueueSnackbar(message, {variant: "success"});
  }

  informError(message:string):void {
    this.enqueueSnackbar(message, {variant: "error"});
  }

  showError(errorObj: any, showSnackBarMessage: boolean = false): void {
    if (this.console) {
      console.dir(errorObj);
    }

    if (showSnackBarMessage) {
      this.enqueueSnackbar(errorObj.message, 'error');
    }
  }
  // dialogInform(title:string, text:string):void {
  //   const dialogConfig:TUDialogConfig = {
  //     'warning': 'success',
  //     title,
  //     text,
  //   }
  //   this.root.ui.dialog.setConfig(dialogConfig);
  //   this.root.ui.dialog.open();
  // }
}
