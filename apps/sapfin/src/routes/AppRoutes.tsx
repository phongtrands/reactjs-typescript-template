import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from '../pages/HomePage';

export function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/sapfin' element={<HomePage></HomePage>}></Route>
        <Route path='/' element={<HomePage></HomePage>}></Route>
      </Routes>
    </Suspense>
  );
}
