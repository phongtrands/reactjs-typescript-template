import { Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // const userRole: string | null = localStorage.getItem('userRole');
  // if (!userRole || !allowedRoles.includes(userRole)) {
  //   return <Navigate to='/login' replace />;
  // }
  return <Outlet />;
};

export default PrivateRoute;
