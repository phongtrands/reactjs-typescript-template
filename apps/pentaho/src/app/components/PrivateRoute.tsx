import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuth = false;
  if (isAuth) {
    return <Navigate to='/pentaho/login' replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;