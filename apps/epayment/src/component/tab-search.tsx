import React, { useState } from 'react';
import { SpTabs } from '@libs/ui-shared';
import SummaryTab from './summay-tab/summaryTab';
import MatchingTab from './matching-tab/MatchingTab';
import ExceptionsTab from './exceptions-tab/ExceptionsTab';

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
      content: <SummaryTab />,
      isHidden: isHidden('summary'),
      onClick: () => setActiveTab('summary'),
    },
    {
      label: 'Matching',
      value: 'matching',
      content: <MatchingTab />,
      isHidden: isHidden('matching'),
      onClick: () => setActiveTab('matching'),
    },
    {
      label: 'Exception',
      value: 'exception',
      content: <ExceptionsTab />,
      isHidden: isHidden('exception'),
      onClick: () => setActiveTab('exception'),
    },
  ];

  return <SpTabs tabs={tabs} defaultTab={activeTab} />;
};

export default TabsEpayment;
