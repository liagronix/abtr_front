import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { IoNewspaperOutline } from 'react-icons/io5';
import { GoGraph } from 'react-icons/go';
import { VscTable } from 'react-icons/vsc';

import NewRecordsManager from './NewRecordsManager';
import SavedDataTable from './SavedDataTable';
import DistributionLifeSpanGraph from './DistributionLifeSpanGraph';
import RollingRetention from './RollingRetention';

import Desktop from '../Desktop/Desktop';
import {drawerBody} from './ABTRMain';
import Typography from '@mui/material/Typography';

import {useApi} from '../../api/api_provider';
import type {IRootAPI} from '../../api/root';
// import {useListener} from '../../hooks';

let api:IRootAPI;

const StyledTab = styled(Tab)`
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 18px;
  text-transform: none;
  button: {
    padding: 8px 29px;
    height: 21px!important;
  }
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{backgroundColor:'transparent'}}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ABTRMainTabs() {
  const [tab, setTab] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };
  api = useApi();
  React.useEffect(() => {
    const callback = ()=>api.listeners.run('refresh', ['graphics']);
    api.cw.savedData.startAutoLoading(callback);
    return () => {
      api.cw.savedData.stopAutoLoading();
      // api.cw.savedData.dataVersion = undefined;
    };
  },[]);

  return (
    <Desktop drawerBody={drawerBody}>
      <Typography variant="h3" color="primary.dark" sx={{m:1,p:0, wordWrap: 'break-word', textAlign:'left', opacity: 0.4}}>
        User Activity Log
      </Typography>

      <Tabs
        sx={{pt:'5px'}}
        value={tab}
        onChange={handleChange}
        aria-label="icon position tabs example"
      >
        <StyledTab icon={<IoNewspaperOutline />} iconPosition="start" label="New Records" {...a11yProps(0)}/>
        <StyledTab icon={<VscTable />} iconPosition="start" label="Saved Data" {...a11yProps(1)}/>
        <StyledTab icon={<GoGraph />} iconPosition="start" label="Metrics" {...a11yProps(2)}/>
      </Tabs>

      <TabPanel value={tab} index={0}>
        <NewRecordsManager/>
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <SavedDataTable/>
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <RollingRetention/>
        <DistributionLifeSpanGraph/>
      </TabPanel>

    </Desktop>
  );
}
