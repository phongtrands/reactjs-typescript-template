import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary Component', () => {
  test('render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid='child'>Child content</div>
      </ErrorBoundary>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.queryByText(/Something went wrong/i)).not.toBeInTheDocument();
  });

  test('display message when error event occurs', async () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>,
    );
    const errorEvent = new ErrorEvent('error', {
      error: new Error('Test error'),
    });
    window.dispatchEvent(errorEvent);
    await waitFor(() => {
      expect(screen.getByText(/Something went wrong\. Please try again later\./i)).toBeInTheDocument();
    });
  });
});
