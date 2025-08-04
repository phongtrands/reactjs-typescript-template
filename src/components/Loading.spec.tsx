import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { usePromiseTracker } from 'react-promise-tracker';

import Loading from './Loading';

jest.mock('react-promise-tracker', () => ({
  usePromiseTracker: jest.fn(),
}));

const renderComponent = () => render(<Loading />);

describe('Loading Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('show Backdrop when promiseInProgress is true', async () => {
    (usePromiseTracker as unknown as jest.Mock).mockReturnValue({ promiseInProgress: true });
    renderComponent();
    const backdrop = await screen.getByRole('progressbar', { hidden: true });
    expect(backdrop).toBeInTheDocument();
  });
});
