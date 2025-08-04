import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import SPTabs from './SPTab';

describe('SPTabs Component', () => {
  const tabsMock = [
    {
      label: 'Home',
      value: 'home',
      icon: 'home',
      content: <div data-testid='home-content'>Home Content</div>,
    },
    {
      label: 'Article',
      value: 'article',
      icon: 'article',
      content: <div data-testid='article-content'>Article Content</div>,
    },
    {
      label: 'Hidden',
      value: 'hidden',
      isHidden: true,
      content: <div>Hidden Content</div>,
    },
  ];

  it('renders visible tabs', () => {
    render(<SPTabs tabs={tabsMock} activeTab='home' onTabChange={jest.fn()} />);

    expect(screen.getByTestId('tab-home')).toBeInTheDocument();
    expect(screen.getByTestId('tab-article')).toBeInTheDocument();
    expect(screen.queryByTestId('tab-hidden')).not.toBeInTheDocument();
  });

  it('calls onTabChange when clicking another tab', () => {
    const onTabChangeMock = jest.fn();
    render(<SPTabs tabs={tabsMock} activeTab='home' onTabChange={onTabChangeMock} />);

    const articleTab = screen.getByTestId('tab-article');
    fireEvent.click(articleTab);

    expect(onTabChangeMock).toHaveBeenCalledWith('article', expect.any(Object));
  });

  it('calls tab onClick if provided', () => {
    const tabClickMock = jest.fn();
    const customTabs = [
      {
        ...tabsMock[0],
        onClick: tabClickMock,
      },
      ...tabsMock.slice(1),
    ];

    render(<SPTabs tabs={customTabs} activeTab='home' onTabChange={jest.fn()} />);
    const homeTab = screen.getByTestId('tab-home');

    fireEvent.click(homeTab);
    expect(tabClickMock).toHaveBeenCalled();
  });

  it('shows content for the active tab', () => {
    render(<SPTabs tabs={tabsMock} activeTab='article' onTabChange={jest.fn()} />);

    expect(screen.getByTestId('article-content')).toBeInTheDocument();
    expect(screen.queryByTestId('home-content')).not.toBeInTheDocument();
  });
});
