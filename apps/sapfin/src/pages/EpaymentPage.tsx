import { useEffect, useState } from 'react';

// import { useAppSelector } from '@core/services';
import { Box, Icon } from '@mui/material';
import { Tab } from '@core/components';

import PageContainer from '../components/PageContainer';
import { EPAYMENT_TAB, TYPE_FILE } from '../configs/config';
import SummaryTab from '../components/summay-tab/summaryTab';
import MatchingTab from '../components/matching-tab/MatchingTab';
import ExceptionsTab from '../components/exceptions-tab/ExceptionsTab';

const EpaymentPage = () => {
  const [activeTab, setActiveTab] = useState(EPAYMENT_TAB.SUMMARY);
  const [hidden, setHidden] = useState('');
  //   const epayment = useAppSelector((state) => state.epayment);

  //   useEffect(() => {
  //     if (epayment?.typeFile) {
  //       setHidden(epayment?.typeFile === TYPE_FILE.HOST_FILE ? EPAYMENT_TAB.MATCHING : '');
  //     }
  //   }, [epayment]);

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
      icon: 'home',
    },
    {
      label: 'Matching',
      value: EPAYMENT_TAB.MATCHING,
      content: <MatchingTab />,
      isHidden: isHidden(EPAYMENT_TAB.MATCHING),
      onClick: () => setActiveTab(EPAYMENT_TAB.MATCHING),
      icon: 'article',
    },
    {
      label: 'Exception',
      value: EPAYMENT_TAB.EXCEPTION,
      content: <ExceptionsTab />,
      isHidden: isHidden(EPAYMENT_TAB.EXCEPTION),
      onClick: () => setActiveTab(EPAYMENT_TAB.EXCEPTION),
      icon: 'insert',
    },
  ];

  return (
    <Box p={3}>
      <Tab tabs={tabs} defaultTab={activeTab} />
    </Box>
  );
};

export default PageContainer(EpaymentPage);
