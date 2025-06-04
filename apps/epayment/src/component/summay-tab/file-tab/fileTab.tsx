import React, { useState } from 'react';

import { Tabs } from '@core/components';
import { useAppDispatch, useAppSelector } from '@core/services';
import { changeTypeFile } from '../../../services/stores';
import Mt940 from '../table/mt940';
import HostFile from '../table/hostFile';
import { TYPE_FILE } from '../../../config/config';

const FileTab: React.FC = () => {
  const epayment = useAppSelector((state) => state.epayment);
  const [activeTab, setActiveTab] = useState(epayment?.typeFile || 'mt940');
  const dispatch = useAppDispatch();

  const tabs = [
    {
      label: 'MT940',
      value: 'mt940',
      content: <Mt940 />,
      onClick: () => {
        dispatch(changeTypeFile(TYPE_FILE.MT940));
        setActiveTab('summary');
      },
    },
    {
      label: 'Host File',
      value: 'hostFile',
      content: <HostFile />,
      onClick: () => {
        dispatch(changeTypeFile(TYPE_FILE.HOST_FILE));
        setActiveTab('hostFile');
      },
    },
  ];
  return (
    <div style={{ marginTop: '16px' }}>
      <Tabs tabs={tabs} defaultTab={activeTab} />
    </div>
  );
};

export default FileTab;
