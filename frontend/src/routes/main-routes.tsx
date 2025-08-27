import { createBrowserRouter } from 'react-router-dom';
import PublicRoute from './public-routes';
import LoginPage from '../components/Login';
import PrivateRoute from './private-routes';
import Profile from '../components/Profile';

export const MainRoutes = createBrowserRouter([
  {
    path: '/auth',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/external-users',
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
]);
