// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }
import * as React from 'react'
import * as ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import ApiProvider from "./api/api_provider";
import {useListener} from './hooks';
import {useApi} from './api/api_provider';

// import { ThemeProvider } from '@mui/styles';
import { ThemeProvider } from '@mui/material/styles';
// import AppSnackbar from './components/ui/AppSnackbarMulti';

// import { Toaster } from 'react-hot-toast';
// import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from './components/theme';
// import {isLogged} from './api/api_provider';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SnackbarProvider, useSnackbar} from 'notistack';
// import { useSnackbar } from 'notistack';


// import Button from './interface/EButton';
// import logo from './logo.svg';
// import './App.css';
// import Desktop from './components/Desktop/Desktop'
// import MainTable from './components/MainTable/MainTable';
// import About from './components/About/About';
// import Map from './components/Map/Map';
// import ABTRMain from './components/ABTRMain/ABTRMain';
// import ABTRMainTabs from './components/ABTRMain/ABTRMainTabs';
// import Login from './components/Login/Login';

const AppRouter = () => {
  const api=useApi();
  api.location = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  api.log.setSnackbar(enqueueSnackbar, closeSnackbar);
  const refresher = useListener(api.listeners, 'refresh', ['login']);
  // console.log('Router. api.is_logged: ',api.is_logged)
  // <Route path="map" element={<Map />} />
  // <Route path="abtr" element={<ABTRMain />} />
  // <Route path="abtr_tabs" element={<ABTRMainTabs />} />

  return (
    <Routes>
      <Route path="/" element={
        !api.is_logged ? (
          <About />
        ) : (
          <RootPageLazy />
        )}
      />

      <Route path="about" element={<About />} />
      <Route path="login" element={
        api.is_logged ? (
          <Navigate replace to="/" />
        ) : (
          <Login />
        )}
      />
    </Routes>
  )
}

// const MainTable = React.lazy(() => import('./components/MainTable/MainTable'));
const ABTRMainTabs = React.lazy(() => import('./components/ABTRMain/ABTRMainTabs'));
const About = React.lazy(() => import('./components/About/About'));
const Login = React.lazy(() => import('./components/Login/Login'));
function RootPageLazy() {
  return(
        <React.Fragment>
          <React.Suspense fallback={<div>Loading...</div>}>
            <ABTRMainTabs />
          </React.Suspense>
        </React.Fragment>
      );
    }

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
        <ThemeProvider theme={theme}>
          <ApiProvider>
            <SnackbarProvider maxSnack={5} style={{borderRadius:"10px"}}>
              <AppRouter />
            </SnackbarProvider>
          </ApiProvider>
        </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
// <AppSnackbar/>
              // <Route path="/" element={<MainTableLazy />} />
// <Toaster position="bottom-left"/>
// document.getElementById("root")
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
