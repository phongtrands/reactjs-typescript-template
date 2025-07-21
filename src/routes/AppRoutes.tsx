import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ErrorBoundary from '~/components/ErrorBoundary';
import PrivateRoute from '~/components/PrivateRoute';

const SapfinPage = lazy(() => import('~/pages/SapfinPage'));
const EPaymentPage = lazy(() => import('~/pages/EPaymentPage'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading....</div>}>
          <Routes>
            <Route element={<PrivateRoute />}>
              {/* <Route path='/sapfin' element={<SapfinPage />} />
              <Route path='/epayment' element={<EPaymentPage />} /> */}
            </Route>
            <Route path='/sapfin' element={<SapfinPage />} />
            <Route path='/epayment' element={<EPaymentPage />} />
            <Route path='/' element={<div>Loading....</div>} />
            <Route path='/login' element={<div>Loading....</div>} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default AppRoutes;
