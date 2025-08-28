import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import type { JSX } from 'react';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  // If authenticated, redirect to home
  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, show the public content
  return children;
};

export default PublicRoute;
