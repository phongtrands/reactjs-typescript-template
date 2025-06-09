import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@core/helper';

interface PrivateRouteProps {
  appId?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ appId = '' }) => {
  const token = useAppSelector((state) => state.auth.token);
  if (!token) {
    return <Navigate to={`/${appId}/login`} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;