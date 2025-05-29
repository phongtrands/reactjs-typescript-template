import React from 'react';
import './sp-tabs.scss';
import { Tabs, Tab, Box, TabsProps, TabProps } from '@mui/material';

interface ITabItem extends Omit<TabProps, 'label' | 'value' | 'content'> {
  label: string;
  value: string;
  content: React.ReactNode;
  isHidden?: boolean;
}

interface SPTabsProps extends Omit<TabsProps, 'value' | 'onChange'> {
  tabs: ITabItem[];
  defaultTab?: string;
  onTabChange?: (event: React.SyntheticEvent, value: string) => void;
}

const SPTabs: React.FC<SPTabsProps> = ({ tabs, defaultTab, onTabChange, ...tabsProps }) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0].value);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    if (onTabChange) {
      onTabChange(event, newValue);
    }
  };

  return (
    <Box>
      <Tabs className='sp-tabs' value={activeTab} onChange={handleChange} {...tabsProps}>
        {tabs.map(
          (tab) =>
            !tab.isHidden && (
              <Tab key={tab.value} label={tab.label} value={tab.value} onClick={(e) => tab.onClick?.(e)} />
            ),
        )}
      </Tabs>
      <Box mt={2}>{tabs.map((tab) => (tab.value === activeTab ? <Box key={tab.value}>{tab.content}</Box> : null))}</Box>
    </Box>
  );
};

export default SPTabs;
