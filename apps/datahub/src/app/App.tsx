import { Route, Routes } from "react-router-dom";
import { publicPaths, privatePaths} from '@datahub/feature'
import  { PrivateRoute } from '@shared/components'
import { Suspense } from "react";

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {publicPaths?.map((i) => (
          <Route path={i.path} element={<i.component />} />
        ))}
        <Route element={<PrivateRoute key='datahub' loginUrl='/datahub/login' />}>
          {privatePaths?.map((i) => (
            <Route path={i.path} element={<i.component />} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
