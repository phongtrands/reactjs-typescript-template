import { lazy, Suspense } from 'react';
import './assets/styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ErrorBoundary from '~/components/ErrorBoundary';
import PrivateRoute from '~/components/PrivateRoute';

const LoginPage = lazy(() => import('~/pages/login/LoginPage'));
const HomePage = lazy(() => import('~/pages/home/HomePage'));

function App() {
  return (
    <>
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading....</div>}>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path='/' element={<HomePage />} />
              </Route>
              <Route path='/login' element={<LoginPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
