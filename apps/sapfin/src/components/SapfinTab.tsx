import { Tab } from '@core/components';

import Main from './Main';

const SapfinTab = () => {
  const tabs = [
    {
      label: 'Sapfin',
      value: 'sapfin',
      content: <Main />,
      isHidden: false,
      onClick: () => '',
    },
  ];

  return <Tab tabs={tabs} defaultTab={'sapfin'} />;
};

export default SapfinTab;
