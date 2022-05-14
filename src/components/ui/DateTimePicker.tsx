import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import TimePicker from '@mui/lab/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

type BasicDateTimePickerProps={
  initValue: number;
  onAccept: Function;
  // allowEmpty: boolean;
}

const isValidDate = (d:any ) => {
  return d instanceof Date && !isNaN(d as unknown as number);
}

export default function BasicDateTimePicker(props: BasicDateTimePickerProps) {
  const {initValue, onAccept } = props;
  const initDate:Date = new Date(initValue);
  const [value, setValue] = React.useState<Date | null>(initDate);

  const onChangeTime = (newValue:any)=>{
    console.log('New time: ', newValue);
    // console.log('Run onChangeTime! newValue: ', newValue);
    // if (typeof onAccept==='function' && (isValidDate(newValue) || newValue==null)) {
    if (typeof onAccept==='function') {
      onAccept(newValue);
    };

    setValue(newValue);
  }

  // const onAcceptNewValue = (acceptValue: Date)=>{
  //   console.log('Run onAcceptNewValue!');
  //   if (typeof onAccept==='function' && acceptValue instanceof Date) {
  //     // const seconds = newValue.getHours()*3600 + newValue.getMinutes()*60 + newValue.getSeconds();
  //     onAccept(acceptValue);
  //   }
  // }
        // onAccept={onAcceptNewValue}
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        value={value}
        ampm={false}
        ampmInClock={false}
        cancelText="Cancel"
        InputAdornmentProps={{sx: {width:'24px', "& button":{p:0.5}, "& :hover": {color: 'primary'}}}}
        onChange={onChangeTime}

        openTo="day"
        views={['day', 'month', 'year', 'hours', 'minutes', 'seconds']}
        inputFormat="dd.MM.yyyy, HH:mm:ss"
        mask="__.__.____, __:__:__"
        renderInput={(params) => <TextField
          {...params}
          variant="standard"

          InputProps={{...params.InputProps,
            sx:{
              '& input': {width:'130px',flex:"none"},
              fontSize:'0.875rem',
              color:'#01579b'
            }}}
          sx={{ width:"165px", py:'1px'}}
        />}
      />
    </LocalizationProvider>
  );
}
