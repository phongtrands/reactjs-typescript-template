import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LoadingFallback from './loadingFallback';

const HomePage = lazy(() => import('../pages/home-page'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path='/epayment' element={<HomePage></HomePage>} />
        <Route path='/' element={<HomePage></HomePage>} />
      </Routes>
    </Suspense>
  );
}
