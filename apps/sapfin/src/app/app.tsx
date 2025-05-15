import { PrivateRoute } from '@shared/components';
import { LoginPage, HomePage } from '@shared/ui-components';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

export function App() {
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

export default App;
