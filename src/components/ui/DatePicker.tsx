import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

type BasicDateTimePickerProps={
  initValue: number;
  onAccept: Function;
}

const isValidDate = (d:any ) => {
  return d instanceof Date && !isNaN(d as unknown as number);
}

export default function BasicDateTimePicker(props: BasicDateTimePickerProps) {
  const {initValue, onAccept } = props;
  const initDate:Date = new Date(initValue);
  const [value, setValue] = React.useState<Date | null>(initDate);

  const onChangeTime = (newValue:any)=>{
    if (typeof onAccept==='function') {
      onAccept(newValue);
    };

    setValue(newValue);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={value}
        cancelText="Cancel"
        InputAdornmentProps={{sx: {width:'24px', "& button":{p:0.5}, "& :hover": {color: 'primary'}}}}
        onChange={onChangeTime}

        openTo="day"
        views={['day', 'month', 'year']}
        inputFormat="[dd.MM.yyyy]"
        mask="[__.__.____]"
        renderInput={(params:any) => <TextField
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
