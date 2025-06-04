import React from 'react';

import Search from './search/search';
import FileTab from './file-tab/fileTab';

const SummaryTab: React.FC = () => {
  return (
    <>
      <Search />
      <FileTab />
    </>
  );
};

export default SummaryTab;
