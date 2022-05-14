import React from 'react';
import { styled } from '@mui/material/styles';


import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Desktop from '../Desktop/Desktop'
import {useApi} from '../../api/api_provider';
import type {IRootAPI} from '../../api/root';

let api:IRootAPI;

export default function About(props:any) {



  return (
    <Desktop>
      <Box sx={{m:'auto', pb:'15%', minWidth:'300px', flex:'0 1 auto', width: "350px"}}>
        <Typography variant="h1" noWrap color="primary" sx={{m:2}}>
          The sample project 
        </Typography>
      </Box>
    </Desktop>
  )
}
