
import { Router } from 'express';
import userRoute from './user.route';

const routes: Record<string, Router> = {
  '/auth': userRoute,
};

export default routes;
