import React from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import IconButton from '@mui/material/IconButton';

import {StyledListItemButton, EmptyIcon, StyledValue} from './DrawerNestedList';

export default function DrawerGroupItem(props:any) {
  const {title, Icon, color, iconColor, tabIndex} = props;

  return (
      <ListItem
        component="div"
        disablePadding
        tabIndex={-1}
        sx={{
          borderBottom: "1px solid",
          borderColor: 'grey.300',
          pl: '10px',
          height: '52px'
        }}
      >

          <ListItemIcon sx={{ flex:"none", p:1, minWidth:24, width:24 }}>
            {Icon ? <Icon color={iconColor || 'primary'} fontSize='medium'/> : <EmptyIcon/>}
          </ListItemIcon>

          <ListItemText
            primary=
              {<Typography variant="h5" color={color || 'primary'} sx={{mr:1,p:0, wordWrap: 'break-word'}}>
                {title}
              </Typography>}
            sx={{ my: 0 }}
          />
      </ListItem>
)}
