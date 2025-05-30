import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LoadingFallback from './loadingFallback';
import { LoginPage } from '@libs/auth';
import { PrivateRoute } from '@core/components';

const HomePage = lazy(() => import('../pages/home-page'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path='/epayment/login' element={<LoginPage appId='epayment' />} />
        <Route path='*' element={<LoginPage appId='epayment' />} />
        <Route path='/epayment' element={<PrivateRoute appId='epayment' />}>
          <Route path='/epayment' element={<HomePage></HomePage>} />
        </Route>
      </Routes>
    </Suspense>
  );
}
