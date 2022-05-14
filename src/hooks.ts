import React from 'react';
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// import CQuestion from './src/api/Content/CQuestion';
// import type { RootState, AppDispatch } from './src/store/store'
import type { TListenerType } from './api/CListener'
import type CListener from './api/CListener'


export const useListener = ( listener: CListener, type: TListenerType = 'refresh', updateFields : string[] = undefined ) => {
  const [updateFlag, setUpdateFlag] = React.useState(0);
  const updateSettingHandler = () => {
    // console.log('Refresh SettingPanel. Update Flag: ', updateFlag+1)
    setUpdateFlag( updateFlag+1 );
  }

  React.useEffect(() => {
    // const updateFields = [
    //   'is_active', 'fixed_order', 'type', 'weight',
    //   'marker', 'algorithm', 'difficulty' ]
    listener.add(type, updateSettingHandler, updateFields);
    return () => {
      listener.remove(updateSettingHandler);
    }
  });

  return updateFlag;
}
