import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '@libs/auth';
import { PrivateRoute } from '@core/components';

import HomePage from '../pages/HomePage';

export function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/login' element={<LoginPage appId='sapfin' />}></Route>
        <Route path='*' element={<LoginPage appId='sapfin' />}></Route>
        <Route element={<PrivateRoute appId='sapfin' />}>
          <Route path='/sapfin' element={<HomePage></HomePage>}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
