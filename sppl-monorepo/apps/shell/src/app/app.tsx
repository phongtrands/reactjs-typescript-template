import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

const Pentaho = React.lazy(() => import('pentaho/Module'));

export function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/pentaho" />} />
        <Route path="/pentaho/*" element={<Pentaho />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
