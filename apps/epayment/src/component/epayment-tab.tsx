import { useEffect, useState } from 'react';
import SummaryTab from './summay-tab/summaryTab';
import MatchingTab from './matching-tab/MatchingTab';
import ExceptionsTab from './exceptions-tab/ExceptionsTab';
import { Tabs } from '@core/components';
import { useAppSelector } from '@core/services';
import { EPAYMENT_TAB, TYPE_FILE } from '../config/config';

const EpaymentTab = () => {
  const [activeTab, setActiveTab] = useState(EPAYMENT_TAB.SUMMARY);
  const [hidden, setHidden] = useState('');
  const epayment = useAppSelector((state) => state.epayment);

  useEffect(() => {
    if (epayment?.typeFile) {
      setHidden(epayment?.typeFile === TYPE_FILE.HOST_FILE ? EPAYMENT_TAB.MATCHING : '');
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
      value: EPAYMENT_TAB.SUMMARY,
      content: <SummaryTab />,
      isHidden: isHidden(EPAYMENT_TAB.SUMMARY),
      onClick: () => setActiveTab(EPAYMENT_TAB.SUMMARY),
    },
    {
      label: 'Matching',
      value: EPAYMENT_TAB.MATCHING,
      content: <MatchingTab />,
      isHidden: isHidden(EPAYMENT_TAB.MATCHING),
      onClick: () => setActiveTab(EPAYMENT_TAB.MATCHING),
    },
    {
      label: 'Exception',
      value: EPAYMENT_TAB.EXCEPTION,
      content: <ExceptionsTab />,
      isHidden: isHidden(EPAYMENT_TAB.EXCEPTION),
      onClick: () => setActiveTab(EPAYMENT_TAB.EXCEPTION),
    },
  ];

  return <Tabs tabs={tabs} defaultTab={activeTab} />;
};

export default EpaymentTab;
