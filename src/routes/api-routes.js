import { checkAuthentication } from '../controllers/auth.controllers';
import adminAPIRouter from './api/admin-api.router';
import candidateRouterAPI from './api/candidates.router';
import entitiesRouter from './api/entities.router';
import usersAPIRouter from './api/users-api.router';
import votesRouter from './api/vote-process.router';
import authenticationRouter from './authentication/auth.router';
import homeRoute from './home.router';
import adminRouter from './logged-in/admin.router';
import connectedRouter from './logged-in/loggedIn.router';

const APIRoutes = (app) => {
  app.use('/api/users', usersAPIRouter);
  app.use('/api/candidates', candidateRouterAPI);
  app.use('/api/keys', entitiesRouter);
  app.use('/api/vote', votesRouter);
  app.use('/api/admin', adminAPIRouter);
};

export const configureRoutes = (app) => {
  app.use('/', homeRoute);
  app.use(checkAuthentication);
  APIRoutes(app);
  app.use(connectedRouter);
  app.use('/admin', adminRouter);
  app.use(authenticationRouter);
};
