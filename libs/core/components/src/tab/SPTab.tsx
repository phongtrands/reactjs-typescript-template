import React from 'react';
import './sp-tabs.scss';
import { Tabs, Tab, Box } from '@mui/material';
import type { TabsProps } from '@core/types';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

const SPTabs: React.FC<TabsProps> = ({ tabs, defaultTab, tabType, onTabChange, ...tabsProps }) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0].value);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    if (onTabChange) {
      onTabChange(event, newValue);
    }
  };

  const renderIcon = (icon: string) => {
    if (icon === 'home') {
      return <HomeOutlinedIcon />;
    }
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
  let selectedStyle = {};
  if (tabType === 'contained') {
    selectedStyle = {
      backgroundColor: '#055f8e',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
    };
  }

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
          borderBottom: tabType === 'contained' ? '' : '1px solid #bdbdbd',
          '.Mui-selected': selectedStyle,
          '.MuiButtonBase-root': {
            textTransform: 'none',
            fontSize: 'large',
          },
          '& .MuiTabs-indicator': {
            display: tabType === 'contained' ? 'none' : '',
          },
        }}
      >
        {tabs.map(
          (tab) =>
            !tab.isHidden && (
              <Tab
                sx={{ width: 150 }}
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
