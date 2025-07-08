import { Box } from '@mui/material';
import { useState } from 'react';

import { Tab } from '~/components';
import ExceptionsTab from '~/components/epayment-tabs/exceptions-tab/ExceptionsTab';
import MatchingTab from '~/components/epayment-tabs/matching-tab/MatchingTab';
import SummaryTab from '~/components/epayment-tabs/summay-tab/SummaryTab';
import { EPAYMENT_TAB } from '~/configs/epayment.config';
import PageContainer from '~/layouts/PageContainer';

const EPaymentPage = () => {
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

const WrappedEPaymentPage = PageContainer(EPaymentPage);
export default WrappedEPaymentPage;
