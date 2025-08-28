import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import type { JSX } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!accessToken) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If authenticated, show the protected content
  return children;
};

export default PrivateRoute;
