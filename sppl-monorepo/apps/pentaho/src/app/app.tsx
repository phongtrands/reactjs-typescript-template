// Uncomment this line to use CSS modules
// import styles from './app.module.scss';
import React from 'react';
import NxWelcome from './nx-welcome';
import { Route, Routes } from 'react-router-dom';
import About from './Pages/About';
// import LoginPage from './Pages/LoginPage';

export function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<NxWelcome title='Pentaho' />} />
        {/* <Route path="login" element={<LoginPage />} /> */}
        <Route path="about" element={<About />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
