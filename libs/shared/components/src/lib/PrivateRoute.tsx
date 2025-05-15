import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  key: string;
  loginUrl: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ key, loginUrl }) => {
  const token = localStorage.getItem(key);
  if (token) {
    return <Navigate to={loginUrl} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
