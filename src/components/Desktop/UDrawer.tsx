import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {desktop_abtr as desktop_style} from '../theme'
import ClickAwayListener from '@mui/material/ClickAwayListener';

import Toolbar from '@mui/material/Toolbar';

import type {IRootAPI} from '../../api/root';
import {useApi} from '../../api/api_provider';
import {useListener} from '../../hooks';
let api:IRootAPI;

export default function UDrawer(props: any) {
  api=useApi();
  const drawerConfig = (desktop_style && desktop_style.drawer) || {css:{}};
  return(
    <UDrawerLayout drawerConfig={drawerConfig} {...props}/>
  )
}

function UDrawerLayout(props: any) {
  // const $GR = props.GRouter;
  const {drawerBody, drawerConfig} = props;
  const refresher = useListener(api.listeners, 'refresh', ['drawer']);
  const open = api.isDrawerOpen;
  // const open = false;
  const handleClickAway = ()=>{
    api.toggleDrawerOpen(false);
  }

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Drawer
          variant="permanent"
          PaperProps={{sx:{
            backgroundColor: "usertest.extraLight",
            background: 'linear-gradient(160deg, rgba(243,240,238,1) 0%, rgba(255,239,221,1) 40%, rgba(193,208,232,1) 100%)',
            boxShadow: "0 0 4px 2px #bbb",
            transition: 'margin 500ms ease',
            overflowX: 'hidden',
            justifyContent: 'flex-start',
            alignContent : 'flex-start',

            width: `${process.env.REACT_APP_DRAWER_WIDTH}px`,
            marginLeft: {
              xs: ( open ? 0 : `-${process.env.REACT_APP_DRAWER_WIDTH}px`),
              md: 0
            },
            ...(drawerConfig.css||{})
          }}}
        >
          <Toolbar sx={{zIndex:1}}/>
          {drawerBody}
        </Drawer>
      </ClickAwayListener>

        <Box sx={{
          transition: 'width 500ms ease',
          alignSelf:"stretch",
          width: { xs: 0, md: `${process.env.REACT_APP_DRAWER_WIDTH}px`, flex:'none' }
        }}/>
    </>
)}
