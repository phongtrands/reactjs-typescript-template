import type { ComponentType } from 'react';

import Header from './header/Header';

const PageContainer = <P extends object>(ChildComponent: ComponentType<P>) => {
  const renderComponent: React.FC<P> = (props) => {
    return (
      <div>
        <Header />
        <ChildComponent {...props} />
      </div>
    );
  };
  return renderComponent;
};

export default PageContainer;
