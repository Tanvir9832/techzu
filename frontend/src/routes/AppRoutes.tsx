import { Routes, Route } from 'react-router-dom';
import PublicRoute from './public-routes';
import LoginPage from '../components/Login';
import PrivateRoute from './private-routes';
import Profile from '../components/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
