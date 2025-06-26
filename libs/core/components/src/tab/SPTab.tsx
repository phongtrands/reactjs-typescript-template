import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import type { TabsProps } from '@core/types';

const SPTab: React.FC<TabsProps> = ({ tabs, defaultTab, onTabChange, isNavigation = false, ...tabsProps }) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0].value);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    if (onTabChange) {
      onTabChange(event, newValue);
    }
  };

  return (
    <Box>
      {isNavigation && (
        <Tabs className='sp-tabs' value={activeTab} onChange={handleChange} {...tabsProps}>
          {tabs.map(
            (tab) =>
              !tab.isHidden && (
                <Tab key={tab.value} label={tab.label} value={tab.value} onClick={(e) => tab.onClick?.(e)} />
              ),
          )}
        </Tabs>
      )}
      <Box mt={2}>{tabs.map((tab) => (tab.value === activeTab ? <Box key={tab.value}>{tab.content}</Box> : null))}</Box>
    </Box>
  );
};

export default SPTab;
