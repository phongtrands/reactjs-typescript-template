import { ReactNode, useEffect, useState } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error('ErrorBoundary caught an error:', event.error);
      setHasError(true);
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return <h1>Something went wrong. Please try again later.</h1>;
  }

  return children;
};

export default ErrorBoundary;
