import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
// import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

//
// export default function SkeletonMainTable() {
//   return (
//     <React.Fragment>
//       <Box sx={{mx:6, my:2, p:0}}>
//         <Skeleton height={40}/>
//         <Skeleton variant="rectangular" height={350} />
//         <Skeleton height={35}/>
//         <Skeleton height={35}/>
//         <Skeleton height={35} width="60%" />
//       </Box>
//     </React.Fragment>
// )}

export default function SkeletonMainTable() {
  return (
    <Box sx={{m:1,p:0}}>
      <Skeleton height={46}/>
      <Skeleton height={46}/>
      <Skeleton height={46}/>
      <Skeleton height={46}/>
      <Skeleton height={46}/>
    </Box>
)}


export function TryAgain(props: any) {
  const { message, action } = props;
  const onClick = ()=>{
    if (typeof action == 'function') {
      action();
  } }

  return (
    <Box sx={{width:'100%', height:'100%', display:'flex', justifyContent: 'center', flexFlow:'column'}}>

      <Typography
        color="error"
        variant="h3"
        align="center"
        noWrap={true}
        sx={{m:0, p:1, lineHeight:"40px", flex:"none"}}
      >
        {message||'Data is not loaded'}
      </Typography>

      <Box sx={{width: '100%', flexGrow:1, display: 'flex', justifyContent: 'center'}}>
        <IconButton color="primary" sx={{alignSelf: 'center', flexGrow:0 }} onClick={onClick}>
          <RefreshIcon fontSize='large'/>
        </IconButton>
      </Box>
    </Box>
  )
}
