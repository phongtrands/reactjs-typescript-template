import React, { useState } from 'react';
import { SpTabs } from '@shared/ui-components';
import Search from './summay-tab/search';

const TabsEpayment = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [hidden, setHidden] = useState('');

  const isHidden = (value: string) => {
    if (value === hidden) {
      return true;
    }
    return false;
  };
  const tabs = [
    {
      label: 'Summary',
      value: 'summary',
      content: <Search />,
      isHidden: isHidden('summary'),
      onClick: () => setActiveTab('summary'),
    },
    {
      label: 'Matching',
      value: 'matching',
      content: <div>Products tab</div>,
      isHidden: isHidden('matching'),
      onClick: () => setActiveTab('matching'),
    },
    {
      label: 'Exception',
      value: 'exception',
      content: <div>Contact tab</div>,
      isHidden: isHidden('exception'),
      onClick: () => setActiveTab('exception'),
    },
  ];

  return <SpTabs tabs={tabs} defaultTab={activeTab} />;
};

export default TabsEpayment;
