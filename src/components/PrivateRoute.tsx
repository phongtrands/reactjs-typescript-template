import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '~/redux/hook';

const PrivateRoute: React.FC = () => {
  const token = useAppSelector((state) => state.sapfin.token);
  if (!token) {
    return <Navigate to={'/login'} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
