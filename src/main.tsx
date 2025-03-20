import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ErrorBoundary from '~/components/ErrorBoundary';
import PrivateRoute from '~/components/PrivateRoute';

const LoginPage = lazy(() => import('~/pages/LoginPage'));
const HomePage = lazy(() => import('~/pages/HomePage'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading....</div>}>
          <Routes>
            <Route element={<PrivateRoute allowedRoles={['admin']} />}>
              <Route path='/login' element={<LoginPage />} />
            </Route>
            <Route path='/home' element={<HomePage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
    <App />
  </StrictMode>,
);
