import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../assets/styles/style.scss';
import HomePage from './pages/HomePage';

const Pentaho = React.lazy(() => import('pentaho/Module'));

export function App() {
  return (
    <React.Suspense fallback={<div>Loading....</div>}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/pentaho' element={<Pentaho />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
