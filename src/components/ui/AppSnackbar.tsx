import React from 'react';
// import { styled } from '@mui/material/styles';
import {useApi} from '../../api/api_provider';
import type { TStatus } from '../../api/AppTypes';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const snackBarVariants= ['success', 'warning', 'error', 'info']

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function AppSnackbar(props: any) {
  const api = useApi();
  const [open, setOpen] = React.useState(true);
  const [message, setMessage] = React.useState("Система запущена");
  const [variant, setVariant] = React.useState("info" as TStatus);

  const closeSnackbar = () => {
    setOpen(false);
  };

  const enqueueSnackbar = (message: string, variant: TStatus = "info") => {
    setMessage(message);
    if ( typeof variant=="string"&&snackBarVariants.includes(variant) ) {
      setVariant(variant);
    } else {
      setVariant("info");
    }
    setOpen(true);
  }
  api.log.setSnackbar(enqueueSnackbar, closeSnackbar);

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        onClose={closeSnackbar}
        autoHideDuration={7000}
        key={message}
      >
        <Alert onClose={closeSnackbar} severity={variant} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
