import React from 'react';
import {desktop_abtr as desktop_style} from '../theme'
import { StyledLink } from '../ui/StyledElements';
import Tooltip from '@mui/material/Tooltip';

// import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import SearchIcon from '@mui/icons-material/Search';
// import CloseIcon from '@mui/icons-material/Close';
// import InputIcon from '@mui/icons-material/Input';
import MenuIcon from '@mui/icons-material/Menu';
// import SaveIcon from '@mui/icons-material/Save';
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import Typography from '@mui/material/Typography';

import type {IRootAPI} from '../../api/root';
import {useApi} from '../../api/api_provider';
import {useListener} from '../../hooks';
let api:IRootAPI;

// const StyledBox: any = styled('div')( ({ theme }) => `
const StyledBox: any = styled('div')`
  padding-left: 23px;
  margin: 0;
  z-index: 1205;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-grow: 0;
  position: fixed;
  box-sizing: border-box;
  color: ${desktop_style?.header?.css?.color||'#5D6D97'};
  box-shadow: ${desktop_style?.header?.css?.boxShadow||'0 0 5px 2px #999'};
  background-color: ${desktop_style?.header?.css?.backgroundColor||'white'}
  @media (max-width: 500px) {
    padding-left: 0
  }
`;

const StyledDivSearch = styled('div')( ({ theme }) => `
  display: flex;
  margin-left: 50px;
  margin-right: 16px;
  padding: 0 8px;
  width: 100%;
  height: 28px;
  background: #FFFFFF;
  border: 1px solid;
  border-color: transparent;
  border-radius: 20px;
  color: #BBBBBB;
  transition: margin 500ms ease-out;
  tabindex: 999;
  @media (max-width: 350px) {
    display: none;
  };
  @media (max-width: 500px) {
    margin-left: 8px;
    margin-right: 8px;
    transition: margin 200ms ease-out;
  };
  :hover, :active, :focus {
    border-color:  ${theme.palette.primary.main};
  };
`);

// padding: ${theme.spacing(0.5, 1)};
const StyledSpanSearchIcon = styled('span')`
  height: 100%;
  pointer-events: none;
  flex:none;
  padding: 2px 0;
  @media (max-width: 450px) {
    display: none;
  }
`;

const StyledInputElement = styled('input')( ({ theme }) => `
  width: 276px;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  transition: width 500ms ease;
  background: transparent;
  color: #BBBBBB;
  border: none;
  tabindex: 1;
  ::placeholder {color: #BBBBBB};
  :hover {
    color: ${theme.palette.primary.main};
  };
  :focus {
    color: ${theme.palette.primary.main};
    outline: none;
    width: 450px;
    transition: width 200ms ease-out;
  };
  @media (max-width: 700px) {
    width: 120px
  }
  `);

const StyledToolbar: any = styled('div')(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  flexDirection: "row",
  ...theme.mixins.toolbar,
}));

const StyledRightBlock = styled('span')`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-grow: 0
`;


export default function UWHeader(props:any) {
  const {onClose, subTitle} = props;
  const title=process.env.REACT_APP_TITLE;
  api=useApi();
  const headerConfig = (desktop_style && desktop_style.header) || {css:{}};
  const refresher = useListener(api.listeners, 'refresh', ['header']);
  const doToggleDrawerOpen = (e:any)=>{
    e.preventDefault();
    e.stopPropagation();
    api.toggleDrawerOpen();
  }

  const onLogout = (e:any)=>{
    if (api.is_logged) {
      api.db2_abtr.logout()
    }
  }

  return (
    <>
      <StyledBox
        sx={{...(headerConfig.css||{}) }}
      >

        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={doToggleDrawerOpen}
            tabIndex={1}
            sx={{
              m: 0,
              display: { xs: props.drawerBody ? 'flex' : 'none', md: 'none' }
          }}>
            <MenuIcon />
          </IconButton>


          {subTitle&&api.is_logged
            ?
              <Box sx={{flex: 'none', position:'relative'}}>
                <Typography variant="h1" noWrap color="primary">
                  {title}
                </Typography>
                <Box sx={{position:'absolute', whiteSpace: 'nowrap', bottom:"-12px", opacity: '0.7', fontWeight:'normal', fontSize: 14,lineHeight: '14px'}}>
                  {subTitle}
                </Box>
              </Box>
            :
              <Typography variant="h1" noWrap sx={{flex: 'none'}} color="primary">
                {title}
              </Typography>
          }


          <StyledDivSearch>
            <StyledSpanSearchIcon>
              <SearchIcon sx={{color:"#BBBBBB"}}/>
            </StyledSpanSearchIcon>
            <StyledInputElement
              placeholder="Поиск…"
              tabIndex={2}
            />
          </StyledDivSearch>



        </StyledToolbar>

        <StyledRightBlock>

        {api.is_logged && <Avatar
          alt="Nice User"
          src="/img/face01.png"
          sx={{ "@media (max-width:450px)": {display: "none"} }}
        />}

          <Tooltip title={api.is_logged ? 'Выйти' : 'Войти'} arrow>
            <StyledLink to={!api.is_logged ? '/login' : '/'} tabIndex={-1}>
              <IconButton
                edge="start"
                onClick={api.is_logged ? onLogout : ()=>{}}
                aria-label="close"
                tabIndex={3}
                sx={{color:'primary.main', ml:{ xs: 0.5, sm: 1, md: 3 }, mr: { xs: 0.5, sm: 1, md: 2 }}}
              >
                {api.is_logged ? <LogoutIcon fontSize="medium"/> : <ExitToAppIcon fontSize="medium"/>}
              </IconButton>
            </StyledLink>
          </Tooltip>
        </StyledRightBlock>

      </StyledBox>
      <Toolbar sx={{zIndex:1, m:0}}/>
    </>
)}
