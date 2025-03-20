import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  allowedRoles: string[];
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const userRole: string | null = localStorage.getItem('userRole');
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to='/unauthorized' replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
