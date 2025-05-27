import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  storageKey: string;
  loginUrl: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ storageKey, loginUrl }) => {
  const token = localStorage.getItem(storageKey);
  if (token) {
    return <Navigate to={loginUrl} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
