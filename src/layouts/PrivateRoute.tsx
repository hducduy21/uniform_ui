import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PrivateRoute = () => {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    return <div className='flex items-center justify-center h-screen'>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to='/login' state={{from: location.pathname }} replace />;
};

export default PrivateRoute;
