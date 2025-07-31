import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import * as reactRouterDom from 'react-router-dom';
import { mocked } from 'jest-mock';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

import Header from '~/layouts/header/Header';

const renderComponent = () => render(<Header />);

describe('Header Component', () => {
  beforeEach(() => {
    const mockInstance = {
      loginPopup: jest.fn().mockResolvedValue({
        accessToken: 'mock-access-token',
        account: { username: 'testuser' },
      }),
    };
    (useMsal as jest.Mock).mockReturnValue({
      instance: mockInstance,
    });
    cleanup();
  });
  test('Render Epayment Header', async () => {
    renderComponent();
    const input = await screen.findByText('ePayment Recon');
    expect(input).toBeInTheDocument();
  });

  test('Render SAPFIN Header', async () => {
    const mockedUseLocation = mocked(reactRouterDom.useLocation);
    mockedUseLocation.mockReturnValue({ pathname: '/sapfin' } as any);
    renderComponent();
    const input = await screen.findByText('SAPFIN');
    expect(input).toBeInTheDocument();
  });

  test('Render Login Header', async () => {
    const mockedUseLocation = mocked(reactRouterDom.useLocation);
    mockedUseLocation.mockReturnValue({ pathname: '/login' } as any);
    renderComponent();
    const input = await screen.findByText('Login');
    expect(input).toBeInTheDocument();
  });

  test('opens menu on hover and clicks logout', async () => {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as unknown as jest.Mock).mockReturnValue(mockNavigate);
    render(<Header />);
    const menuToggleButton = screen.getByTestId('menu-toggle-button');
    fireEvent.click(menuToggleButton);
    const logoutButton = screen.getByTestId('logout-button');
    fireEvent.click(logoutButton);
    expect(mockNavigate.mock.calls[0][0]).toBe('/login');
  });

  test('Navigate sapfin Page', async () => {
    const mockedUseLocation = mocked(reactRouterDom.useLocation);
    mockedUseLocation.mockReturnValue({ pathname: '/epayment' } as any);
    const mockOpen = jest.fn();
    Object.defineProperty(window, 'open', {
      writable: true,
      value: mockOpen,
    });
    render(<Header />);
    const navigateButton = screen.getByTestId('navigate-button');
    fireEvent.click(navigateButton);
    expect(mockOpen).toHaveBeenCalledWith('https://mock-api.example.com/sapfin', '_blank');
  });
});
