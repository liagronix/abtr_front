// import React from 'react';
import * as React from 'react'
import {RootAPI} from './root';
// const api = new RootAPI;
// const api = RootAPI.getInstance();

const api = new RootAPI();

const ApiContext = React.createContext(api);
ApiContext.displayName = 'ABRealTest frontend api';


export default function ApiProvider(props:any) {
  return (
    <ApiContext.Provider value={api}>
      {props.children}
    </ApiContext.Provider>
  )
}

export function useApi() {
  const context = React.useContext(ApiContext)
  if (context === undefined) {
    throw new Error('useApi must be used within a ApiProvider')
  }
  return context
}

export function isLogged() : boolean {
  return api.is_logged;
}
