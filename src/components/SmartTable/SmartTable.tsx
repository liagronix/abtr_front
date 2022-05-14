import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { BsCheckSquare } from 'react-icons/bs';
import { BsSquare } from 'react-icons/bs';
import { VscTrash } from 'react-icons/vsc';
import { FiMoreVertical } from 'react-icons/fi';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
// import SmartHeader from '../SmartTable/SmartHeader';

import {desktop_abtr as desktop_style} from '../theme'

import type { IOrder } from '../../api/AppTypes';
import {useApi} from '../../api/api_provider';
import type {IRootAPI} from '../../api/root';
// import {useListener} from '../../hooks';

let api:IRootAPI;

const StyledSpan: any = styled('span')( () => ({
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  top: 20,
  width: 1,
}));

const StyledDateTime: any = styled('div')`
  width: 165px;
  min-width: 165px;
  text-align: left;
`;

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
  const {headCells} = props;
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

        {headCells.map((headCell:any) => (
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


function SmartRow(props:any) {
  const {item} = props
  const [selected, setSelected] = React.useState(false);

  const leftBorderColor = item.isWrong ?
    'error.light' : (
      (item.id<0 || item.isChanged) ? 'success.light' : 'primary.main'
    );

  const onDeleteClick = ()=>{
    // api.cw.userActivities.popItem(item);
    // api.listeners.run('refresh', ['main-table']);
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
          readOnly={true}
          multiline={false}
          disableUnderline={true}
          value={item.user_id}
          margin="none"
          placeholder="User ID"
          fullWidth
          inputProps={{sx:{textOverflow: "ellipsis"}}}
        />
      </TableCell>




      <TableCell align="left" sx={{pl:"4px"}}>
          <StyledDateTime>
            {`[${api.formatDate(item.registration)}]`}
          </StyledDateTime>
      </TableCell>

      <TableCell align="left" sx={{pl:"4px"}}>
          <StyledDateTime>
            {`[${api.formatDate(item.last_activity)}]`}
          </StyledDateTime>
      </TableCell>

      <TableCell align="left">
        <span style={{display: "inline-flex"}}>
          <IconButton onClick={onDeleteClick} color="primary" sx={{ml:-1, p:0.5}}>
            <VscTrash fontSize="20px"/>
          </IconButton>

          <IconButton color="primary" sx={{p:0.5}}>
            <FiMoreVertical fontSize="20px" />
          </IconButton>
        </span>
      </TableCell>

      <TableCell sx={{m:0, width:'5px', bgcolor: desktop_style?.paper?.css?.backgroundColor || 'transparent'}}>
          <Box sx={{borderRadius:"0 5px 5px 0", height: `${process.env.REACT_APP_TABLE_ROW_HEIGHT||46}px`, width: '5px', backgroundColor: 'primary.main'}}></Box>
      </TableCell>

    </TableRow>
  )
}

export default function SmartTable(props:any) {
  const {headCells, dataset} = props;
  api = useApi();
  const [order, setOrder] = React.useState('asc' as IOrder);
  const [orderBy, setOrderBy] = React.useState('user_id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const items = dataset;

  const handleRequestSort = (event: any, property: any) => {
    const isAsc: boolean = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds: number[] = items.map((n: any) => n.id);
      setSelected(newSelecteds);
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


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

  const rows:any[] = api.stableSort(items, api.getComparator(order, orderBy as IOrder))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((item: any, i: number) =>
        <SmartRow key={`row-${item.id}`} item={item} num={i}/>
      )

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
            headCells={headCells}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={items.length}
          />
          <TableBody>
            {rows}
            {(emptyRows && items.length>rowsPerPage) ?
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

    </>
  )
}
