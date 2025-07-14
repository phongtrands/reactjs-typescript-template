import type { TabProps as MuiTabProps, TabsProps as MuiTabsProps } from '@mui/material';

export interface TabItem extends Omit<MuiTabProps, 'label' | 'value' | 'content'> {
  label: string;
  value: string;
  content: React.ReactNode;
  isHidden?: boolean;
}

export interface TabsProps extends Omit<MuiTabsProps, 'value' | 'onChange'> {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (value: string, event: React.SyntheticEvent) => void;
}
