import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { PrivateRoute } from '@shared/components';
import HomePage from '../pages/HomePage';

export function RouteApp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route element={<PrivateRoute key='datahub' loginUrl='/login' />}>
          <Route path='/' element={<HomePage></HomePage>}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}