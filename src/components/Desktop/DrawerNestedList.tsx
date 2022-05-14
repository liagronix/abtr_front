import React from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export const StyledListItemButton = styled(ListItemButton)`
  padding: 0 0 0 10px;
  height: ${process.env.REACT_APP_DRAWER_ITEM_HEIGHT}px;
`;

export const EmptyIcon = styled('span')`
  width: 24px;
  height: 24px;
  flex: 0 0;
`;

export const StyledValue = styled('span')( ({ theme }) => `
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: ${theme.palette.grey.A100};
  margin: 0 10px;
`);

export default function DrawerNestedList(props:any) {
  const {title, subTitle, action, tabIndex} = props;
  const [open, setOpen] = React.useState(true);

  // const Icon = icon || <span></span>;
  // const handleClick = () => {
  //   setOpen(!open);
  // };

  const doAction = ()=>{
    if (typeof action == "function") {
      action();
  }}
  // pt: 2.5,
  // pb: open ? 0 : 2.5,
  return (
    <Box
      sx={{
        bgcolor: open ? 'rgba(71, 98, 130, 0.03)' : 'transparent',
        pb: open ? 2 : 0,
      }}
    >
      <ListItem component="div" disablePadding sx={{borderBottom: "1px solid", borderColor: 'grey.300'}}>

        <StyledListItemButton
          alignItems="center"
          onClick={doAction}
          tabIndex={-1}
        >

        <IconButton tabIndex={tabIndex} sx={{flex:"none"}} onClick={() => setOpen(!open)}>
          <KeyboardArrowDown
            fontSize="medium"
            color="primary"
            sx={{
              transform: open ? 'rotate(-180deg)' : 'rotate(0)',
              transition: '0.2s',
            }}
          />
        </IconButton>

          <ListItemText
            primary=
              {<Typography variant="h5" color="primary" sx={{mr:1,p:0, wordWrap: 'break-word'}}>
                {title}
              </Typography>}
            sx={{ my: 0 }}
          />

        </StyledListItemButton>

      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {props.children}
      </Collapse>

    </Box>
)}


// primaryTypographyProps={{
//   fontSize: 15,
//   fontWeight: 'medium',
//   lineHeight: '20px',
//   mb: '2px',
// }}
// {open && props.children}
//
// return (
//   <>
//     <ListItemButton onClick={handleClick}>
//       {Icon &&
//         <ListItemIcon sx={{ minWidth:'40px' }}>
//           <Icon color='primary' fontSize='large'/>
//         </ListItemIcon>}
//
//       <ListItemText primary="Inbox" />
//       {open ? <ExpandLess /> : <ExpandMore />}
//     </ListItemButton>
//
//     <Collapse in={open} timeout="auto" unmountOnExit>
//       {props.children}
//     </Collapse>
//   </>
// )}

// <List component="div" disablePadding>
//   <ListItemButton sx={{ pl: 4 }}>
//     <ListItemIcon>
//       <StarBorder />
//     </ListItemIcon>
//     <ListItemText primary="Starred" />
//   </ListItemButton>
// </List>
