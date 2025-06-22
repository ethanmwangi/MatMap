import { Navigate, useLocation, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }) => {
  const location = useLocation();
  const {state} = useLocation();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location, id: state }} replace />;
};

export default ProtectedRoute