import { useMsal } from '@azure/msal-react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import * as reactRouterDom from 'react-router-dom';

import PageContainer from '~/layouts/PageContainer';

const DummyComponent = () => <div data-testid='page-container-id'>ePayment Recon</div>;

const WrappedComponent = PageContainer(DummyComponent);

const renderComponent = () => render(<WrappedComponent />);

describe('PageContainer Component', () => {
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

  test('Render PageContainer Component', async () => {
    renderComponent();
    const input = await screen.findByTestId('page-container-id');
    expect(input).toBeInTheDocument();
  });
});
