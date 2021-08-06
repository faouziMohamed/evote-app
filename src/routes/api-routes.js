import { checkAuthentication } from '../controllers/controllers.utils';
import candidateRouterAPI from './api/candidates.router';
import usersRouter from './api/users.router';
import authenticationRouter from './auth.router';
import connectedRouter from './connected.router';
import homeRoute from './home.router';

const APIRoutes = (app) => {
  app.use('/api/u', usersRouter);
  app.use('/api/candidates', candidateRouterAPI);
};

export const configureRoutes = (app) => {
  app.use('/', homeRoute);
  app.use(checkAuthentication);
  APIRoutes(app);
  app.use(connectedRouter);
  app.use(authenticationRouter);
};
