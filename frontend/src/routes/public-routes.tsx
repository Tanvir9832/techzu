import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import type { JSX } from 'react';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken } = useAuth();
  return accessToken ? <Navigate to="/external-users" replace /> : children;
};

export default PublicRoute;
