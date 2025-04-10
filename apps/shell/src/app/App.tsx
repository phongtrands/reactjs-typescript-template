import * as React from 'react';


import { Navigate, Route, Routes } from 'react-router-dom';

const Datahub = React.lazy(() => import('datahub/Module'));

const Sapfin = React.lazy(() => import('sapfin/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Navigate to="/datahub" replace />} />
        <Route path="/datahub/*" element={<Datahub />} />
        <Route path="/sapfin" element={<Sapfin />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
