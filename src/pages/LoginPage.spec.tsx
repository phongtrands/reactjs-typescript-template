import { useMsal } from '@azure/msal-react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LoginPage from '~/pages/LoginPage';
import { login } from '~/redux';
import { useAppSelector } from '~/redux/hook';

const renderComponent = () => render(<LoginPage />);

describe('LoginPage Component', () => {
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Render LoginPage Component', async () => {
    renderComponent();
    const loginBtn = await screen.findByTestId('login-button');
    expect(loginBtn).toBeInTheDocument();
  });

  test('Render LoginPage Component with token', async () => {
    const mockNavigate = jest.fn();
    (useAppSelector as jest.Mock).mockReturnValue('mocked-token');
    (useNavigate as unknown as jest.Mock).mockReturnValue(mockNavigate);
    renderComponent();
    const input = await screen.findByText('ePayment Recon');
    expect(input).toBeInTheDocument();
  });

  test('Handle login button click', async () => {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as unknown as jest.Mock).mockReturnValue(mockNavigate);
    renderComponent();
    const loginBtn = await screen.findByTestId('login-button');
    await fireEvent.click(loginBtn);
    expect(mockDispatch).toHaveBeenCalledWith(login('accessToken'));
  });
});
