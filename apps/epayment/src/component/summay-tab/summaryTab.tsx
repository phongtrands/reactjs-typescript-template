import React, { useEffect, useState } from 'react';

import Search from './search/search';
import { useAppDispatch, useAppSelector } from '@core/services';
import { changeTypeFile } from '../../services/stores';
import Mt940 from './table/mt940';
import HostFile from './table/hostFile';
import { TYPE_FILE } from '../../config/config';
import { Tabs } from '@core/components';

const SummaryTab: React.FC = () => {
  const typeFile = useAppSelector((state) => state.epayment?.typeFile);
  const [activeTab, setActiveTab] = useState(typeFile || TYPE_FILE.MT940);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setActiveTab(typeFile);
  }, [typeFile]);

  const tabs = [
    {
      label: 'MT940',
      value: TYPE_FILE.MT940,
      content: <Mt940 />,
      onClick: () => {
        dispatch(changeTypeFile(TYPE_FILE.MT940));
      },
    },
    {
      label: 'Host File',
      value: TYPE_FILE.HOST_FILE,
      content: <HostFile />,
      onClick: () => {
        dispatch(changeTypeFile(TYPE_FILE.HOST_FILE));
      },
    },
  ];
  return (
    <>
      <Search />
      <div style={{ marginTop: '16px' }}>
        <Tabs tabs={tabs} defaultTab={activeTab} />
      </div>
    </>
  );
};

export default SummaryTab;
