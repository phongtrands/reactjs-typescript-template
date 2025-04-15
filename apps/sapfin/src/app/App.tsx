import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { publicPaths, privatePaths} from '@sapfin/feature'
import  { PrivateRoute } from '@shared/components'

export function App() {
  return (
    <div className="sapfin-app">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {publicPaths?.map((i) => (
          <Route path={i.path} element={<i.component />} />
          ))}
          <Route element={<PrivateRoute key='sapfin' loginUrl='/sapfin/login' />}>
            {privatePaths?.map((i) => (
              <Route path={i.path} element={<i.component />} />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
