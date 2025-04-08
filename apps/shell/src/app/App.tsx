import * as React from 'react';

import NxWelcome from './nx-welcome';

import { Link, Route, Routes } from 'react-router-dom';

const Datahub = React.lazy(() => import('datahub/Module'));

const Sapfin = React.lazy(() => import('sapfin/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/datahub">Datahub</Link>
        </li>
        <li>
          <Link to="/sapfin">Sapfin</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="shell" />} />
        <Route path="/datahub" element={<Datahub />} />
        <Route path="/sapfin" element={<Sapfin />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
