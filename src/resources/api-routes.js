import authenticationRouter from './auth/auth.router';
import candidateRouterAPI from './candidates/candidates.router';
import connectedRouter from './connected/connected.router';
import { checkAuthentication } from './connected/controllers';
import homeRoute from './index';
import usersRouter from './users/users.router';

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
