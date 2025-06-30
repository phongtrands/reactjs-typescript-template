import React, { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '@core/services';
import { Tab } from '@core/components';

// import { changeTypeFile } from '../../services/stores';
import { Box, Divider } from '@mui/material';

import { TYPE_FILE } from './../../configs/config';
import Search from './search/search';
import Mt940 from './table/mt940';
import HostFile from './table/hostFile';

const SummaryTab: React.FC = () => {
  // const typeFile = useAppSelector((state) => state.epayment?.typeFile);
  // const [activeTab, setActiveTab] = useState(typeFile || TYPE_FILE.MT940);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   setActiveTab(typeFile);
  // }, [typeFile]);

  const tabs = [
    {
      label: 'MT940',
      value: TYPE_FILE.MT940,
      content: <Mt940 />,
      // onClick: () => {
      //   dispatch(changeTypeFile(TYPE_FILE.MT940));
      // },
    },
    {
      label: 'Host File',
      value: TYPE_FILE.HOST_FILE,
      content: <HostFile />,
      // onClick: () => {
      //   dispatch(changeTypeFile(TYPE_FILE.HOST_FILE));
      // },
    },
  ];
  return (
    <>
      <Search />
      {/* <Divider sx={{ py: 2, borderColor: '#bdbdbd' }} /> */}
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: '#fff',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          mt: 4,
        }}
      >
        <Tab tabs={tabs} defaultTab={''} tabType='contained' />
      </Box>
    </>
  );
};

export default SummaryTab;
