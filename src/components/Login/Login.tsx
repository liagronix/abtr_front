import React from 'react';
import { styled } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import {StyledLink} from '../ui/StyledElements';
import Desktop from '../Desktop/Desktop'
import {useApi} from '../../api/api_provider';
import type {IRootAPI} from '../../api/root';

let api:IRootAPI;

export default function About(props:any) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleUsernameChange = (event: any): void => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event: any): void => {
    setPassword(event.target.value);
  }
  api= useApi();
  // api.hello();

  const onClick = ()=>{
    console.log('is_logged: ', api.is_logged);
    // api.hello();
  }

  const onClickLogin = ()=>{
    if (!username || !password) {
      setError('Укажите имя пользователя и пароль')
      return;
    }
    api.db2_abtr.login(username, password)
      .then( (result:any) =>{
        api.listeners.run('refresh',['login']);
        api.log.informSuccess('Успешный вход в систему');
      }
        // console.log('Result of login: ', result)
      )
      .catch( (error:any) => {
        console.dir( (error));
        if (error?.response?.status) {
          setError(`Ошибка ${error.response.status}. ${error?.response?.data?.detail || error?.response?.statusText}`);
          return;
        } else if (error.message&&error.message==='Network Error') {
          setError('Ошибка сети. Проверьте наличие подключения.');
          return
        }

          setError((error.data&&error.data.detail)|| error.msg ||'Ошибка регистрации пользователя на сервере');
      })
  }

  return (
    <Desktop>
      <Box sx={{m:'auto', pb:'15%', minWidth:'300px', flex:'0 1 auto', width: "350px"}}>
        <Typography variant="h1" noWrap color="primary" sx={{m:2}}>
          Вход в систему
        </Typography>

        {error&& (
          <TextField
            error
            fullWidth
            sx={{ marginTop: "8px" }}
            id="outlined-multiline-flexible"
            label="Ошибка авторизации"
            multiline
            value={error}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        )}


        <FormGroup>
          <TextField
            value = {username}
            margin="dense"
            id="username"
            label="Имя пользователя"
            type="text"
            fullWidth
            onChange = {handleUsernameChange}
          />
          <TextField
            value = {password}
            margin="dense"
            id="password"
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            onChange = {handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={()=>setShowPassword(!showPassword)}
                    onMouseDown={ (event:any) => event.preventDefault() }
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}}
          />
        </FormGroup>

        <span>
          <StyledLink to='/map'>
            <Button color="primary" variant="contained">Карта</Button>
          </StyledLink>
          <Button color="secondary" variant="contained" onClick={onClickLogin}>Войти</Button>
        </span>

      </Box>
    </Desktop>
  )
}
