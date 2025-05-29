import React, { useState } from 'react';

import TableTab from '../table/TableTab';
import { Tabs } from '@core/components';

const FileTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mt940');
  const tabs = [
    {
      label: 'MT940',
      value: 'mt940',
      content: <TableTab />,
      onClick: () => setActiveTab('summary'),
    },
    {
      label: 'Host File',
      value: 'hotstFile',
      content: <div>Host File</div>,
      onClick: () => setActiveTab('hotstFile'),
    },
  ];
  return (
    <div style={{ marginTop: '16px' }}>
      <Tabs tabs={tabs} defaultTab={activeTab} />
    </div>
  );
};

export default FileTab;
