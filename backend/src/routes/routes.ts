
import { Router } from 'express';
import userRoute from './user.route';
import commentRouter from './comment.route';
import reactionRoutes from './reaction.route';

const routes: Record<string, Router> = {
  '/auth': userRoute,
  '/comments': commentRouter,
  '/reactions': reactionRoutes
};

export default routes;
