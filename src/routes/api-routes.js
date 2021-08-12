/* eslint-disable import/named */
import { checkAuthentication } from '../controllers/auth.controllers';
import candidateRouterAPI from './api/candidates.router';
import entitiesRouter from './api/entities.router';
import usersRouter from './api/users.router';
import authenticationRouter from './auth.router';
import connectedRouter from './connected.router';
import homeRoute from './home.router';

const APIRoutes = (app) => {
  app.use('/api/users', usersRouter);
  app.use('/api/candidates', candidateRouterAPI);
  app.use('/api/keys', entitiesRouter);
};

export const configureRoutes = (app) => {
  app.use('/', homeRoute);
  app.use(checkAuthentication);
  APIRoutes(app);
  app.use(connectedRouter);
  app.use(authenticationRouter);
};
