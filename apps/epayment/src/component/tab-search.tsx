import { useEffect, useState } from 'react';
import SummaryTab from './summay-tab/summaryTab';
import MatchingTab from './matching-tab/MatchingTab';
import ExceptionsTab from './exceptions-tab/ExceptionsTab';
import { Tabs } from '@core/components';
import { useAppSelector } from '@core/services';
import { TYPE_FILE } from '../config/config';

const TabsEpayment = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [hidden, setHidden] = useState('');
  const epayment = useAppSelector((state) => state.epayment);

  useEffect(() => {
    if (epayment?.typeFile) {
      setHidden(epayment?.typeFile === TYPE_FILE.HOST_FILE ? 'matching' : '');
    }
  }, [epayment]);

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

  return <Tabs tabs={tabs} defaultTab={activeTab} />;
};

export default TabsEpayment;
