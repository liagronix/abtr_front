import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Settings from '@mui/icons-material/Settings';


export const StyledLink  = styled(Link)`
     text-decoration: none;
`;

export function DrawerItem(props:any) {
  const { title, icon, link } = props;
  // const refresher = useListener($PRE.listeners, 'update', [`block-${block.id}-title`]);
  const XIcon = icon;
  const onClick = ()=>{
    // $GR.miniRouter.set('blocks');
    // block.setActive();
  }

  return (
    <StyledLink to={link}>
      <ListItemButton
        onClick={onClick}
        divider
        sx={{ py: 0, minHeight: 64, color: 'rgba(50,105,100,.8)', flex:'none' }}
      >
        <ListItemIcon sx={{ color: 'primary' }}>
          <XIcon fontSize="medium"/>
        </ListItemIcon >
        <ListItemText
          primary={title}
          primaryTypographyProps={{ fontSize: 16, lineHeight: '18px', fontWeight: 400 }}
        />
      </ListItemButton>
    </StyledLink>
)}


export function DrawerItemRightButton(props: any) {
  const {LeftIcon, RightIcon, title, link, tip, doRotate, rightIconEnabled, onRightIconClick} = props;
  return (
    <StyledLink to={link}>
      <ListItem component="div" divider disablePadding sx={{color:'rgba(50,105,100,.8)'}}>
        <ListItemButton sx={{ height: 56 }}>
          <ListItemIcon>
            <LeftIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={title}
            primaryTypographyProps={{ fontSize: 16, lineHeight: '18px', fontWeight: 400 }}
          />
        </ListItemButton>
        <Tooltip title={tip || title}>
          <span>
            <IconButton
              onClick={ onRightIconClick || (()=>{}) }
              disabled={!rightIconEnabled}
              size="large"
              sx={{
                '& svg': {
                  color: 'rgba(55,75,180,0.8)',
                  transition: '1s',
                  transform: 'rotate(0)',
                },
                '&:hover, &:focus': {
                  bgcolor: 'unset',
                  '& svg:first-of-type': {
                    transform: 'rotate(220deg)',
                  },
                  '& svg:last-of-type': {
                    right: 0,
                    opacity: 1,
                  },
                },
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  height: '80%',
                  display: 'block',
                  left: 0,
                  width: '1px',
                  bgcolor: 'divider',
                },
              }}
            >
              {RightIcon ? <RightIcon /> : null}
            </IconButton>
          </span>
        </Tooltip>
      </ListItem>
    </StyledLink>
)}

export function DrawerItemSettings(props: any) {
  // const tree = api.ui.decodingTreePath($PRE.tree);
  // console.log('$PRE.tree: ', $PRE.tree);
  // console.log('tree: ', tree);
  return (
    <ListItem component="div" disablePadding>
      <ListItemButton sx={{ height: 56 }}>
        <ListItemIcon>
          <AppRegistrationIcon color="primary" />
        </ListItemIcon>
        <ListItemText
          primary="Настройки"
          primaryTypographyProps={{
            color: 'primary',
            fontWeight: 'medium',
            variant: 'body2',
          }}
        />
      </ListItemButton>
      <Tooltip title="Настройки теста">
        <IconButton
          size="large"
          sx={{
            '& svg': {
              color: 'rgba(55,75,180,0.8)',
              transition: '0.3s',
              transform: 'translateX(0) rotate(0)',
            },
            '&:hover, &:focus': {
              bgcolor: 'unset',
              '& svg:first-of-type': {
                transform: 'translateX(-4px) rotate(-20deg)',
              },
              '& svg:last-of-type': {
                right: 0,
                opacity: 1,
              },
            },
            '&:after': {
              content: '""',
              position: 'absolute',
              height: '80%',
              display: 'block',
              left: 0,
              width: '1px',
              bgcolor: 'divider',
            },
          }}
        >
          <Settings />
          <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
        </IconButton>
      </Tooltip>
    </ListItem>

)}
