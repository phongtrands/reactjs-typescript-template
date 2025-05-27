import React, { useState } from 'react';

import { SpTabs } from '@libs/ui-shared';
import Table from '../table/table';

const FileTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mt940');
  const tabs = [
    {
      label: 'MT940',
      value: 'mt940',
      content: <Table />,
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
      <SpTabs tabs={tabs} defaultTab={activeTab} />
    </div>
  );
};

export default FileTab;
