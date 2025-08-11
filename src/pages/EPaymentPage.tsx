import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import { Tab } from '~/components';
import ExceptionsTab from '~/components/epayment-tabs/exceptions-tab/ExceptionsTab';
import MatchingTab from '~/components/epayment-tabs/matching-tab/MatchingTab';
import SummaryTab from '~/components/epayment-tabs/summary-tab/SummaryTab';
import { EPAYMENT_TAB, TYPE_FILE } from '~/configs/epayment.config';
import PageContainer from '~/layouts/PageContainer';
import { changeTab, updateSummary } from '~/redux';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { getSummaryData } from '~/services';

const EPaymentPage = () => {
  const dispatch = useAppDispatch();
  const [hidden, setHidden] = useState('');
  const typeFile: string = useAppSelector((state) => state.epayment.typeFile);
  const tab: string = useAppSelector((state) => state.epayment.tab);
  const matchingFileName: string = useAppSelector((state) => state.epayment.matching.file);
  const exceptionFileName: string = useAppSelector((state) => state.epayment.exceptions.file);

  useEffect(() => {
    const fetchData = async () => {
      const summaryData = await getSummaryData();
      dispatch(updateSummary(summaryData));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (typeFile) {
      setHidden(typeFile === TYPE_FILE.HOST_FILE ? EPAYMENT_TAB.MATCHING : '');
    }
  }, [typeFile]);

  const onChange = (value: string) => {
    if (['matching', 'exception'].includes(value)) {
      if (!matchingFileName && !exceptionFileName) {
        return;
      }
    }
    dispatch(changeTab(value));
  };

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
      icon: 'home',
    },
    {
      label: 'Matching',
      value: EPAYMENT_TAB.MATCHING,
      content: <MatchingTab />,
      isHidden: isHidden(EPAYMENT_TAB.MATCHING),
      icon: 'article',
    },
    {
      label: 'Exceptions',
      value: EPAYMENT_TAB.EXCEPTION,
      content: <ExceptionsTab />,
      isHidden: isHidden(EPAYMENT_TAB.EXCEPTION),
      icon: 'insert',
    },
  ];

  return (
    <Box p={3}>
      <Tab tabs={tabs} activeTab={tab} onTabChange={onChange} />
    </Box>
  );
};

const WrappedEPaymentPage = PageContainer(EPaymentPage);
export default WrappedEPaymentPage;
