
import { Router } from 'express';
import userRoute from './user.route';
import commentRouter from './comment.route';

const routes: Record<string, Router> = {
  '/auth': userRoute,
  '/comments': commentRouter,
};

export default routes;
