import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState, type JSX } from 'react';
import { useAuth } from '../context/authContext';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken ,  } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!accessToken) {
        // Try refreshing access token
        const refreshed = await refreshAccessToken();
        setIsAuth(!!refreshed);
      } else {
        setIsAuth(true);
      }
      setLoading(false);
    };
    checkAuth();
  }, [accessToken, refreshAccessToken]);

  if (loading) return <div>Loading...</div>;
  return isAuth ? children : <Navigate to="/auth" state={{ from: location }} replace />;
};

export default PrivateRoute;
