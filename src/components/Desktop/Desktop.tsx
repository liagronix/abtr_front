import React from 'react';
import { styled } from '@mui/material/styles';
import { Scrollbars } from 'react-custom-scrollbars';

import UDrawer from './UDrawer';
import UWHeader from './UWHeader';
import {desktop_abtr as desktop_style} from '../theme'

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const StyledMain: any = styled('main')`
  display: flex;
  flex-grow: 1;
  width: 100%;
  padding: 0;
  transition: padding 500ms ease-out;
  background-color: ${desktop_style?.body?.css?.backgroundColor || '#E8F1FF'};
  box-shadow: ${desktop_style?.body?.css?.boxShadow || 'none'}
`;

const StyledPaper: any = styled(Paper)( ({theme}) => ({
    textAlign: 'center',
    width: `${process.env.REACT_APP_BASE_WIDTH}px`,
    maxWidth: `${process.env.REACT_APP_BASE_WIDTH}px`,
    minWidth: `${process.env.REACT_APP_MIN_WIDTH}px`,
    margin: theme.spacing(2, 'auto'),
    padding: theme.spacing(2),
    display: 'flex',
    flexFlow: 'column wrap',
    flexGrow: 1,
    boxSizing: 'border-box',
    alignSelf: 'stretch',
    backgroundColor: desktop_style?.paper?.css?.backgroundColor || 'white',
    minHeight: `calc(100vh - ${Number(process.env.REACT_APP_TOOLBAR_HEIGHT)+32}px )`,
    "@media (max-width:802px)": {
      margin: 0,
      minHeight: `calc(100vh - ${Number(process.env.REACT_APP_TOOLBAR_HEIGHT)}px )`
    },
}));

export default function UWindow(props: any) {

  return (
  <>
    <UWHeader {...props}/>

    <Box sx={{display: 'flex', alignItems:'stretch'}}>
      {props.drawerBody&&<UDrawer {...props}/>}
      <Scrollbars style={{ width: '100vw',
        height: `calc(100vh - ${process.env.REACT_APP_TOOLBAR_HEIGHT}px)`}}>
      <StyledMain>
          <StyledPaper elevation={5}>
            {props.children}
          </StyledPaper>
      </StyledMain>
      </Scrollbars>
    </Box>
  </>
)}
