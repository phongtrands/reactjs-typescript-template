import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import PrivateRoute from './PrivateRoute';

import { useAppSelector } from '~/redux/hook';

jest.mock('~/redux/hook', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: jest.fn(() => <div data-testid='navigate-mock'>Redirected to login</div>),
  Outlet: jest.fn(() => <div data-testid='outlet-mock'>Outlet Content</div>),
}));

const renderComponent = () => render(<PrivateRoute />);

describe('PrivateRoute Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Render with token null redirect to login', () => {
    (useAppSelector as jest.Mock).mockImplementation((selectorFn: any) => selectorFn({ auth: { token: null } }));
    renderComponent();
    expect(screen.getByTestId('navigate-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('outlet-mock')).not.toBeInTheDocument();
  });

  test('Render with token', () => {
    (useAppSelector as jest.Mock).mockImplementation((selectorFn: any) => selectorFn({ auth: { token: 'token' } }));
    renderComponent();
    expect(screen.getByTestId('outlet-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('navigate-mock')).not.toBeInTheDocument();
  });
});
