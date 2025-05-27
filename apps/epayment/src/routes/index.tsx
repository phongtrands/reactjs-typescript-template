import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LoadingFallback from './loadingFallback';
import { LoginPage } from '@shared/ui-components';
import { PrivateRoute } from '@shared/components';

const HomePage = lazy(() => import('../pages/home-page'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path='/epayment/login' element={<LoginPage />} />

        <Route path='/epayment' element={<PrivateRoute storageKey='epayment' loginUrl='/epayment/login' />}>
          <Route path='/epayment' element={<HomePage></HomePage>} />
        </Route>

        <Route path='*' element={<LoginPage />} />
      </Routes>
    </Suspense>
  );
}
