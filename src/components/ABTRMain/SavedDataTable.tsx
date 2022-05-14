import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import SmartTable from '../SmartTable/SmartTable'; 

import {useApi} from '../../api/api_provider';
import type {IRootAPI} from '../../api/root';
import {useListener} from '../../hooks';
import {headCells} from './ABTRMain';

let api:IRootAPI;

export default function SavedDataTable(props:any) {
  api = useApi();
  const refresher = useListener(api.listeners, 'refresh', ['graphics']);
  const dataset = api.cw.savedData.get();
  const onCalculateClick = () => {
    api.cw.savedData.calculateMetrics();
  }
  return (
    <>
      <Typography variant="h5" color="primary.dark" sx={{m:1,p:0, wordWrap: 'break-word', textAlign:'left', opacity: 0.4}}>
        Current data from the server
      </Typography>
      <SmartTable headCells={headCells} dataset={dataset}/>
      <Box sx={{width:'100%', display:'inline-flex', justifyContent:'flex-end'}}>
        <Button color="secondary" variant="contained" onClick={onCalculateClick}>Calculate</Button>
      </Box>
    </>

)}
