import React from 'react';

import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import {StyledListItemButton, EmptyIcon, StyledValue} from './DrawerNestedList';

export default function DrawerItem(props:any) {
  const {title, variant, Icon, action, iconColor, color, value, tabIndex, borderColor} = props;

  const doAction = ()=>{
    if (typeof action == "function") {
      action();
  }}

  return (
    <ListItem component="div" disablePadding sx={{borderBottom: "1px solid", borderColor: (borderColor || 'transparent')}}>
      <StyledListItemButton
        onClick={doAction}
        tabIndex={tabIndex}
      >

        <ListItemIcon sx={{ flex:"none", p:1, minWidth:24, width:24 }}>
          {Icon ? <Icon color={iconColor || 'primary'} fontSize='medium'/> : <EmptyIcon/>}
        </ListItemIcon>

        <ListItemText
          primary=
          {<>
            <Typography variant={variant||'body1'} color={color || "primary"} sx={{mr:4,p:0, wordWrap: 'break-word'}}>
            {title}
            {value && <StyledValue>{value}</StyledValue>}
          </Typography>
          </>}
        />

      </StyledListItemButton>
    </ListItem>
)}
