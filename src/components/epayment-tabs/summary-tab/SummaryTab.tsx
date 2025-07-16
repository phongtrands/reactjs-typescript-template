import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import Mt940 from './table/MT940';
import HostFile from './table/HostFile';
import Search from './search/Search';

import { TYPE_FILE } from '~/configs/epayment.config';
import { Tab } from '~/components';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { changeTypeFile } from '~/redux';

const SummaryTab: React.FC = () => {
  const typeFile: string = useAppSelector((state) => state.epayment?.typeFile);
  const [activeTab, setActiveTab] = useState<string>(typeFile || TYPE_FILE.MT940);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setActiveTab(typeFile || TYPE_FILE.MT940);
  }, [typeFile]);

  const onChange = (value: string) => {
    dispatch(changeTypeFile(value));
  };

  const tabs = [
    {
      label: 'MT940',
      value: TYPE_FILE.MT940,
      content: <Mt940 />,
    },
    {
      label: 'Host File',
      value: TYPE_FILE.HOST_FILE,
      content: <HostFile />,
    },
  ];
  return (
    <>
      <Search />
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
        <Tab tabs={tabs} activeTab={activeTab} onTabChange={onChange} />
      </Box>
    </>
  );
};

export default SummaryTab;
