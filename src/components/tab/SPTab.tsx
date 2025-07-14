import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

import type { TabsProps } from '~/types';

const SPTabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange, ...tabsProps }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onTabChange(newValue, event);
  };

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'article':
        return <ArticleOutlinedIcon />;
      case 'home':
        return <HomeOutlinedIcon />;
      case 'insert':
        return <InsertChartOutlinedIcon />;
      default:
        return;
    }
  };

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        {...tabsProps}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          borderBottom: '1px solid #bdbdbd',
        }}
      >
        {tabs.map(
          (tab) =>
            !tab.isHidden && (
              <Tab
                sx={{
                  width: 150,
                  textTransform: 'none',
                  fontSize: 'large',
                }}
                key={tab.value}
                label={tab.label}
                value={tab.value}
                onClick={(e) => tab.onClick?.(e)}
                icon={renderIcon(String(tab.icon))}
                iconPosition='start'
              />
            ),
        )}
      </Tabs>
      <Box sx={{ backgroundColor: 'transparent' }} mt={2}>
        {tabs.map((tab) => (tab.value === activeTab ? <Box key={tab.value}>{tab.content}</Box> : null))}
      </Box>
    </Box>
  );
};

export default SPTabs;
