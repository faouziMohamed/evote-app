import { checkAuthentication } from '../controllers/auth.controllers';
import candidateRouterAPI from './api/candidates.router';
import entitiesRouter from './api/entities.router';
import usersRouter from './api/users.router';
import votesRouter from './api/vote-process.router';
import authenticationRouter from './authentication/auth.router';
import homeRoute from './home.router';
import connectedRouter from './logged-in/loggedIn.router';

const APIRoutes = (app) => {
  app.use('/api/users', usersRouter);
  app.use('/api/candidates', candidateRouterAPI);
  app.use('/api/keys', entitiesRouter);
  app.use('/api/vote', votesRouter);
};

export const configureRoutes = (app) => {
  app.use('/', homeRoute);
  app.use(checkAuthentication);
  APIRoutes(app);
  app.use(connectedRouter);
  app.use(authenticationRouter);
};
