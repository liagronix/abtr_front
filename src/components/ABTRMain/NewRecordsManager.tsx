import React from 'react';
// import { styled } from '@mui/material/styles';
import swal from 'sweetalert';
// import {StyledH3} from '../theme';

import type { IOrder } from '../../api/AppTypes';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DateTimePicker from '../ui/DatePicker';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { VscTrash } from 'react-icons/vsc';
import { VscEdit } from 'react-icons/vsc';
import { VscSave } from 'react-icons/vsc';
import { VscCircleSlash } from 'react-icons/vsc';
import { VscChecklist } from 'react-icons/vsc';
// import { FiMoreVertical } from 'react-icons/fi';
import { BsCheckSquare } from 'react-icons/bs';
import { BsSquare } from 'react-icons/bs';


import {useApi} from '../../api/api_provider';
import type {IRootAPI} from '../../api/root';
import {useListener} from '../../hooks';

import {desktop_abtr as desktop_style} from '../theme'
// import SkeletonMainTable, {TryAgain} from './SkeletonMainTable';
import {headCells, StyledDateTime, StyledSpan} from './ABTRMain';

let api : IRootAPI;

const ThinkCheckBox = function(props:any) {
  return(
    <Checkbox
      checkedIcon={<BsCheckSquare/>}
      icon={<BsSquare/>}
      {...props}
      sx={{fontSize:"1.5em"}}
    />
)}


function EnhancedTableHead(props: any) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
    api.listeners.run('refresh', ['main-table']);
  };

  return (
    <TableHead>
      <TableRow>

        <TableCell sx={{m:0, width:'5px', bgcolor: 'transparent'}}>
            <span></span>
        </TableCell>

        <TableCell sx={{width:"36px", pl:"3px"}}>
          <ThinkCheckBox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            sx={{ color: 'primary.dark', opacity: 0.4, width: '26px'}}
            inputProps={{ 'aria-label': 'select all questions' }}
          />
        </TableCell>

        {headCells.map(headCell => (
          <TableCell
            key={`head-${headCell.id}`}
            align={headCell.align}
            sx={{ color: 'primary.dark', ml: "3px", borderWidth:0, opacity: 0.4, width: headCell.width || 'auto' }}
            padding='none'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >

              <Typography variant="body1" color='inherit' sx={{textTransform: 'uppercase', fontWeight: 400}}>
                {headCell.label}
              </Typography>

              {orderBy === headCell.id ? (
                <StyledSpan>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </StyledSpan>
              ) : null}
            </TableSortLabel>
            :
            <Typography variant="body1" color='inherit' sx={{textTransform: 'uppercase', fontWeight: 400}}>
              {headCell.label}
            </Typography>
          }

          </TableCell>
        ))}

        <TableCell sx={{m:0, borderWidth:0, width:'5px', bgcolor: 'transparent'}}>
            <span></span>
        </TableCell>

      </TableRow>
    </TableHead>
  );
}

function ARow(props:any) {
  const {item} = props
  const [selected, setSelected] = React.useState(false);
  const [edit, setEdit] = React.useState(item.isEdit);

  const [userID, setUserID] = React.useState(item.user_id);
  const [registration, setRegistration] = React.useState(item.registration);
  const [lastActivity, setLastActivity] = React.useState(item.last_activity);
  const [refresher, setRefresher] = React.useState(1);
  const inputEl = React.useRef(null);

  const onEditClick = ()=>{
    setEdit(true);
    doCheck();
    item.isEdit=true;
    inputEl.current.focus();
  }

  const leftBorderColor = item.isWrong ?
    'error.light' : (
      (item.id<0 || item.isChanged) ? 'success.light' : 'primary.main'
    );

  const onCancelClick = ()=>{
    setUserID(item.user_id);
    setRegistration(item.registration);
    setLastActivity(item.last_activity);
    item.check(api, item.user_id, item.registration, item.last_activity);
    setEdit(false);
    item.isEdit=false;
  }

  const onSaveClick = ()=>{
    doCheck();
    if (!item.isWrong) {
      item.setFields({user_id: userID, registration, last_activity: lastActivity})
      setEdit(false);
      item.isEdit=false;
    }
  }

  const onDeleteClick = ()=>{
    api.cw.userActivities.popItem(item);
    api.listeners.run('refresh', ['main-table']);
  }

  const onChangeUserID = (e:any)=>{
    if (isNaN(e.target.value)) {
      setUserID(userID);
      return;
    };
    const value = Number(e.target.value);
    if (value>0 && value<Number.MAX_SAFE_INTEGER) {
      setUserID(value)
    } else if (value<=0) {
      api.log.informWarning('ID пользователя должно быть больше нуля');
      setUserID(userID);
    } else {
      api.log.informWarning('Указано слишком большое значение ID пользователя');
      setUserID(userID);
    }
  }

  const doCheck = () => {
    const checkResult = item.check(api, userID, registration, lastActivity);
    if (checkResult.length) {
      checkResult.forEach( (element:any) => {
        api.log.informError(element);
      });
    } else {
      api.log.informSuccess('Data is correct');
    }
    setRefresher(refresher+1);
  }

  return(
    <TableRow
      hover
      tabIndex={-1}
      selected={selected}
      color="primary"
      sx={{":hover": {backgroundColor: "#fffeba!important"}}}
    >

      <TableCell sx={{m:0, width:'5px', bgcolor: desktop_style?.paper?.css?.backgroundColor || 'transparent'}}>
        <Box sx={{backgroundColor: `${leftBorderColor}`, borderRadius:"5px 0 0 5px", height: `${process.env.REACT_APP_TABLE_ROW_HEIGHT||46}px`, width: '5px' }}></Box>
      </TableCell>

      <TableCell sx={{pl:"3px"}}>
        <ThinkCheckBox
          onChange={()=>{setSelected(!selected)}}
          checked={selected}
          sx={{ color: 'primary.dark', opacity:0.6, width: '26px'}}
        />
      </TableCell>

      <TableCell align="left">
        <Input
          readOnly={!edit}
          multiline={false}
          disableUnderline={!edit}
          value={userID}
          onChange={onChangeUserID}
          margin="none"
          placeholder="User ID"
          inputRef={inputEl}
          fullWidth
          inputProps={{sx:{textOverflow: "ellipsis"}}}
          sx={{"& :focus": {fontWeight:edit?700:300}}}
        />
      </TableCell>

      <TableCell align="left" sx={{pl:"4px"}}>
        {edit ?
          <DateTimePicker initValue={registration} onAccept={(newValue:any)=>setRegistration(newValue)}/>
          :
          <StyledDateTime>
            {`[${api.formatDate(registration)}]`}
          </StyledDateTime>
        }
      </TableCell>

      <TableCell align="left" sx={{pl:"4px"}}>
        {edit ?
          <DateTimePicker initValue={lastActivity} onAccept={(newValue:any)=>setLastActivity(newValue)}/>
          :
          <StyledDateTime>
            {`[${api.formatDate(lastActivity)}]`}
          </StyledDateTime>
        }
      </TableCell>

      <TableCell align="left">
        <span style={{display: "inline-flex"}}>
          { edit ?
            <>
              <IconButton onClick={onSaveClick} color="success" sx={{ml:-1, p:0.5}}>
                <VscSave fontSize="20px" style={{color: '#17a942'}}/>
              </IconButton>

              <IconButton onClick={onCancelClick} color="error" sx={{p:0.5}}>
                <VscCircleSlash fontSize="20px" style={{color: '#c20000'}}/>
              </IconButton>
            </>
          :
            <>
              <IconButton
                color="primary"
                onClick={onEditClick}
                sx={{ml:-1, p:0.5}}
              >
                <VscEdit fontSize="20px"/>
              </IconButton>

              <IconButton onClick={onDeleteClick} color="primary" sx={{p:0.5}}>
                <VscTrash fontSize="20px"/>
              </IconButton>
            </>
          }

          <IconButton
            color="primary"
            onClick={doCheck}
            sx={{p:0.5}}
          >
            <VscChecklist fontSize="20px"/>
          </IconButton>

          <IconButton color="primary" sx={{p:0.5}}>
            <MoreVertIcon sx={{fontSize:"20px"}} />
          </IconButton>

        </span>
      </TableCell>

      <TableCell sx={{m:0, width:'5px', bgcolor: desktop_style?.paper?.css?.backgroundColor || 'transparent'}}>
          <Box sx={{borderRadius:"0 5px 5px 0", height: `${process.env.REACT_APP_TABLE_ROW_HEIGHT||46}px`, width: '5px', backgroundColor: 'primary.main'}}></Box>
      </TableCell>

    </TableRow>
  )
}

function ATable(props:any){
  const [order, setOrder] = React.useState('asc' as IOrder);
  const [orderBy, setOrderBy] = React.useState('user_id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const refresher = useListener(api.listeners, 'refresh', ['main-table']);
  const items = api.cw.userActivities.get();

  const handleRequestSort = (event: any, property: any) => {
    const isAsc: boolean = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds: number[] = items.map((n: any) => n.id);
      setSelected(newSelecteds);
      // return;
    } else {
      setSelected([]);
    }
  };


  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [openBackdrop , setOpenBackdrop ] = React.useState(false);
  const handleCloseBackdrop  = () => {
    setOpenBackdrop(false);
  };



  // const isSelected = (id: any) => selected.indexOf(id) !== -1;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

  const _save = () => {
    setOpenBackdrop(true);
    api.cw.userActivities.save()
      .then( (response:any) => {
        if (response.version && response.version!==api.cw.savedData.dataVersion) {
          api.cw.savedData.bulkLoad(response.dataset);
        };
        swal({
          title: "Data successfully saved to server!",
          text: (response.msg||'')+' Clear table?',
          icon: "success",
          buttons: {
            clear: {value: 'clear', text:"Yes", className: 'ok_button swal_button'},
            dontclear: {value: 'cancel', text:"No", className: 'cancel_button swal_button'},
          }
        })
          .then ( (result:string)=>{
            if (result==='clear') {
              api.cw.userActivities.clear();
              api.listeners.run('refresh', ['main-table']);
            }
          });
      })
      .catch( (err:any) => {
        swal({
          title: "Saving data to server failed!",
          text: err.errorMessage || err.message || 'Network error. Please check the Internet connection and try again.',
          icon: "error",
          buttons: { ok: {value: 'save', text:"OK", className: 'ok_button swal_button'}}
        });
      })
      .finally( ()=>{
        setOpenBackdrop(false);
      });

  }

  const onSaveClick = () => {
    if (api.cw.userActivities.isEditing()) {
      swal({
        title: "Some record is editing",
        text: "Please finish editing data to save",
        icon: "warning",
        buttons: { ok: {value: 'OK', text:"OK", className: 'ok_button swal_button'}}
      })
    } else if (api.cw.userActivities.isHaveError()) {
      swal({
        title: "Are you sure?",
        text: "Some data errors detected! Continue saving data to the server?",
        icon: "warning",
        buttons: {
          catch: {value: 'save', text:"Continue", className: 'confirm_button swal_button'},
          dontsave: {value: 'cancel', text:"Cancel", className: 'cancel_button swal_button'}},
      })
      .then((result) => {
        if (result==='cancel') {
          swal("Saving data canceled!", {buttons: { ok: {value: 'OK', text:"OK", className: 'ok_button swal_button'}} });
        } else {
          _save();
        }
        return;
        }
      );
    } else {
      _save();
    }

  }

  const onCalculateClick = () => {
    api.cw.savedData.calculateMetrics();
  }

  const onAddRecordClick = () => {
    const lastPage :number = Math.floor(api.cw.userActivities.get().length / rowsPerPage);
    const newItem = api.cw.userActivities.pushItem({});
    newItem.isWrong = true;
    newItem.isEdit = true;

    setPage(lastPage);
    api.listeners.run('refresh', ['main-table']);
  }

  const rows:any[] = api.stableSort(items, api.getComparator(order, orderBy as IOrder))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((item: any, i: number) =>
        <ARow key={`row-${item.id}`} item={item} num={i}/>
      )

  // const disabledButton = !api.db_abtr.isDataReady;

  return(
    <>
      <TableContainer>
        <Table
          padding="none"
          sx={{
            borderSpacing: '0 2px',
            borderCollapse: 'separate',
            "& tr":{height: `${process.env.REACT_APP_TABLE_ROW_HEIGHT||46}px`, backgroundColor: 'white'},
            "& svg, & input":{color: 'primary.main'},
            "& thead th": { borderWidth: 0 },
            "& tr td": {
              fontWeight: 300,
              fontSize: '14px',
              lineHeight: '16px',
              color: 'primary.main',

              borderWidth: 0,

        }}}>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={items.length}
          />
          <TableBody>
            {rows}
            {(emptyRows) ?
              <TableRow sx={{ height: `${((Number(process.env.REACT_APP_TABLE_ROW_HEIGHT)+2) * emptyRows - 2)}px!important` }}>
                <TableCell colSpan={7} />
              </TableRow>
            : null}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{p:0, color:'primary.main', height:`${process.env.REACT_APP_TABLE_ROW_HEIGHT||46}px`, textAlign:'right'}}
      />

      <Box sx={{width:'100%', display:'inline-flex', justifyContent:'flex-end'}}>
        <Button color="secondary" variant="contained" onClick={onSaveClick}>Save</Button>
        <Button color="secondary" variant="contained" onClick={onCalculateClick}>Calculate</Button>
        <Button color="secondary" variant="contained" onClick={onAddRecordClick}>Add new record</Button>
      </Box>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default function NewRecordsManager(props:any) {
  api = useApi();

  return (
    <Box>
      <Typography variant="h5" color="primary.dark" sx={{m:1,p:0, wordWrap: 'break-word', textAlign:'left', opacity: 0.4}}>
        New records manager
      </Typography>

      <Box>
        <ATable/>
      </Box>

    </Box>
  )
}
