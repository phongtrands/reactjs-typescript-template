// Uncomment this line to use CSS modules
// import styles from './app.module.scss';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';

export function App() {
  return (
    <React.Suspense fallback={<div>Loading....</div>}>
      <Routes>
      <Route path='/pentaho/login' element={<LoginPage />} />
      <Route  element={<PrivateRoute />}>
        <Route index element={<HomePage />} />
        <Route path='/pentaho/product' element={<div>Product</div>} />
      </Route>
      </Routes>
    </React.Suspense>
  );
}

export default App;
