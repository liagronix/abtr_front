import React from 'react';
import UWHeader from './UWHeader';
import { styled } from '@mui/material/styles';
import {desktop_abtr as desktop_style} from '../theme'

import Box from '@mui/material/Box';
import UDrawer from './UDrawer';

const StyledMain: any = styled('main')( ({theme}) => ({
  display: 'flex',
  flexGrow: 1,
  maxWidth: '100%',
  height: `${document.scrollingElement.clientHeight - (theme.mixins.toolbar.minHeight as number)-2}px`
}));

export default function DesktopFullWidth(props: any) {
  const bodyConfig = (desktop_style && desktop_style.body) || { css:{} };
  return (
  <Box sx={{overflow: 'hidden'}}>
    <UWHeader {...props}/>

    <Box sx={{display: 'flex'}}>
      {props.drawerBody&&<UDrawer {...props}/>}
      <StyledMain
        sx={{
          width: { xs: '100%', sm: '100%', md: `calc(100vw - ${process.env.REACT_APP_DRAWER_WIDTH}px)` },
          p: {xs:0, md: 0},
          backgroundColor: "#E8F1FF",
          ...(bodyConfig.css||{})
      }}>
          {props.children}
      </StyledMain>
    </Box>

  </Box>
)}
