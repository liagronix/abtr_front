import type { IRootAPI } from './root';
import feathers from '@feathersjs/client';
// import express from '@feathersjs/express';
// const express = require('@feathersjs/express');

// import feathers, {} from '@feathersjs/feathers';
// import {authentication} from '@feathersjs/authentication-client';
// import {authenticate } from '@feathersjs/authentication';
// import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
// import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
// import { Application } from '@feathersjs/feathers';
// import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import authentication from '@feathersjs/authentication-client';

import rest from '@feathersjs/rest-client';
import axios, {AxiosInstance} from 'axios';
import type { IFeatherService } from './AppTypes';

const day_seconds = 24*60*60;

const headers = {
  'Content-Type' : 'application/json',
  'Accept' : 'application/json',
  'Access-Control-Allow-Credentials': 'true',
  // 'Cookies': "feathers-jwt; ..."
};

// class MyJwtStrategy extends JWTStrategy {
// }

export const config = {
  timeout: 30000,
  withCredentials: true,
  responseType: 'json',
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers
};

const addTrailingSlash = (context: any)=>{
  if (context.id) {
    context.id = `${context.id}/`;
  }
};

export default class CDB2_ABTR {
  root: IRootAPI;
  authService: any;
  token: string;
  userActivities: IFeatherService;
  users: IFeatherService;
  core: any;
  isLoading : boolean;
  isDataReady : boolean;
  // auth: FormData;
  auth: {
    username: string;
    password: string;
  }
  raw_axios: AxiosInstance;
  ua: any;


  constructor(root:IRootAPI) {
    this.root = root;
    this.addAuthHeader = this.addAuthHeader.bind(this);

    this.raw_axios = axios.create({
      baseURL: process.env.REACT_APP_SERVER_ABTR_URL,
      ...config,
      headers
    } as any);

    this.ua = this.registerService('useractivity');

    this.isLoading = false;
    this.isDataReady = false;

    // this.token = localStorage.getItem('JWT_token');
    this.token = this.getStorageToken();

    if (this.token && this.getJWTExpireDate(this.token)) {
      this.axios('api-token-verify/')
        .then( (response:any)=>{
          if (response?.status==200) {
            this.root.is_logged = true;
            this.root.listeners.run('refresh',['login']);
            if (this.getJWTSecondsOfLife() < day_seconds) {
              this.refreshAccessToken();
            }
          }
        })
    } else {
      this.logout();
    }

  }

  refreshAccessToken() {
    this.axios('api-token-refresh/')
    .then( (response:any)=>{
      this.setStorageToken(response.token);
    })

  }

  getJWTSecondsOfLife(){
    const tokenDate = this.getJWTExpireDate(this.token);
    console.log('getJWTSecondsOfLife. tokenDate: ', tokenDate);
    if (!tokenDate) {
      return 0
    }

    const _now = new Date();
    const diff = Math.floor( (tokenDate as unknown as number -(_now as unknown as number))/1000 );
    console.log('getJWTSecondsOfLife. diff: ', diff);
    return diff;
  }

  getJWTExpireDate(jwtToken: string) {
    if (jwtToken) {
      try {
        const [, payload] = jwtToken.split('.');
        const { exp: expires } = JSON.parse(window.atob(payload));
        if (typeof expires === 'number') {
          return new Date(expires * 1000);
        }
      } catch {
        // ignore
      }
    }
    return null;
  }

  addAuthHeader(context: any) {
    context.params.headers = {
      ...context.params.headers,
      'Authorization': `${process.env.REACT_APP_JWT_AUTH_HEADER_PREFIX} ${this.token}`
    };
  }

  logout() : void {
    this.root.is_logged = false;
    this.token = '';
    this.setStorageToken('');
    this.root.listeners.run('refresh',['login']);
    this.root.log.inform('Выход из системы');
  }

  // theLogin() : any {
  login(email: string, password: string) : any {
    return this.axios('authentication/', {
        email: 'emamaev@mail.ru',
        password: 'Formula7%23',
    }, {method: 'post'})
      .then( (response:any)=>{
        console.log('Login. response: ', response);
        this.root.is_logged = true;
        this.setStorageToken(response.data.token);
        this.token = response.data.token;
        return Promise.resolve({'status': 200});
      })
      .catch( (error:any)=>{
        console.log('Login. error: ')
        console.dir(error);
        return Promise.reject(error);
      })
  }

  registerService(url:string) {
    return {
      find: () => {
        return this.axios(url)
          .then( (response:any)=>response.data);
      },
      save: (data:any) => {
        return this.axios(url, data, {method: 'post'})
          .then( (response:any)=>response.data);
      },
    }
  }


  async axios(url: string, data: any={}, config: any={}): Promise<any> {
    // const url = _url.startsWith('api') ? _url : 'api/'+_url;

    const axiosConfig = {
      ...config,
      data,
      url
    };

    if (!axiosConfig.method) {
      axiosConfig.method='get';
    };

    axiosConfig.headers = {
      ...headers,
      ...axiosConfig.headers||{},
      'Authorization': `${process.env.REACT_APP_JWT_AUTH_HEADER_PREFIX} ${this.token}`
    };

    return await this.raw_axios.request(axiosConfig)
      .catch( (error:any) => {
        console.log('raw axios. status: ', error?.response?.status);
        const status = error?.response?.status;
        if (status==401) {
          console.log(`${status}: ${error?.response?.statusText}`);
          // this.root.log.inform('Выход из системы');
          this.logout();
        }
        return Promise.reject(error);
      });
  }

  getStorageToken() {
    const token = localStorage.getItem('jwt-token');
    return token;
  }

  setStorageToken(token:any) {
    localStorage.setItem('jwt-token', token);
  }

}
