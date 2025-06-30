import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '@libs/auth';
import { PrivateRoute } from '@core/components';

import SapfinPage from '../pages/SapfinPage';
import EpaymentPage from '../pages/EpaymentPage';

export function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/login' element={<LoginPage appId='sapfin' />}></Route>
        <Route path='*' element={<LoginPage appId='sapfin' />}></Route>
        <Route element={<PrivateRoute appId='sapfin' />}>
          <Route path='/sapfin' element={<SapfinPage></SapfinPage>}></Route>
          <Route path='/epayment' element={<EpaymentPage></EpaymentPage>}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
