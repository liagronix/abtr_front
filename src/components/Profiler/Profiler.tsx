import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


import {useApi} from '../../api/api_provider';
import type {IRootAPI} from '../../api/root';
import type {CProfilerRecord, TProfileDataSet} from '../../api/CProfiler';
import {useListener} from '../../hooks';

let api:IRootAPI;

const BoldSpan = styled('span')`
  font-weight: 700;
`;


export default function Profiler(props:any) {
  const [area, setArea] = React.useState('');

  api = useApi();
  const areaList : TAreaList[] = api.profiler.getAreas();
  const areaRecords : TProfileDataSet = api.profiler.getAreaRecords(area);
  const refresher = useListener(api.listeners, 'refresh', ['profiler']);

  const handleChange = (event: SelectChangeEvent) => {
      setArea(event.target.value as string);
  };



  return (
    <Box sx={{p:2, display:'inline-flex', boxSizing: "border-box", justifyContent:'space-between', width:'100%'}}>
      <Typography variant="h3" color='primary' align="left">
        Choose area:
        <Box sx={{minWidth:120}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Area</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={area}
              label="Area"
              onChange={handleChange}
            >
              {areaList.map( (item:string, i:number)=>
                <MenuItem key={`area-${i}`} value={item}>{item}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
      </Typography>

      {areaRecords.map( (record:CProfilerRecord)=> {
        <Box>{`Start at: ${record.duration}. Duration: ${record.duration}`}</Box>
      })}
    </Box>
)}
