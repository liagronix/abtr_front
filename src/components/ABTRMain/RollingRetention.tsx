import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {useApi} from '../../api/api_provider';
import type {IRootAPI} from '../../api/root';
import {useListener} from '../../hooks';

let api:IRootAPI;

const BoldSpan = styled('span')`
  font-weight: 700;
`


export default function RollingRetention(props:any) {
  const {days} = props;
  api = useApi();
  const refresher = useListener(api.listeners, 'refresh', ['rolling-retention']);
  const rollingRetention = api.cw.savedData.getRollingRetention();

  const onCalculateClick = () => {
    api.cw.savedData.calculateMetrics();
  }

  return (
    <Box sx={{p:2, display:'inline-flex', boxSizing: "border-box", justifyContent:'space-between', width:'100%'}}>
      <Typography variant="h3" color='primary' align="left">
        Rolling Retention 7 day:&nbsp;
        <BoldSpan>{rollingRetention}</BoldSpan>
      </Typography>

      <Button color="secondary" variant="contained" onClick={onCalculateClick}>Calculate</Button>
    </Box>
)}
