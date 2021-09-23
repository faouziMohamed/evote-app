import { routeProtecter } from '../controllers/auth.controllers';
import { allGetRoutes } from '../utils/routes.utils';
import adminAPIRouter from './api/admin-api.router';
import candidateRouterAPI from './api/candidates.router';
import entitiesRouter from './api/entities.router';
import tokenRouter from './api/mail-activation.router';
import usersAPIRouter from './api/users-api.router';
import votesRouter from './api/vote-process.router';
import authenticationRouter from './authentication/auth.router';
import homeRoute from './home.router';
import adminRouter from './logged-in/admin.router';
import connectedRouter from './logged-in/loggedIn.router';

const APIRoutes = (app) => {
  app.use('/api/activate', tokenRouter);
  app.use('/api/users', usersAPIRouter);
  app.use('/api/candidates', candidateRouterAPI);
  app.use('/api/keys', entitiesRouter);
  app.use('/api/vote', votesRouter);
  app.use('/api/admin', adminAPIRouter);
};

export const configureRoutes = (app) => {
  /**
   * Since all routes are not yet registered in the app,
   * {@link GETroutes} will be an empty array.
   * It will be populated later using {@link allGetRoutes}
   */

  let GETroutes = [];
  app.use('/', homeRoute);
  app.use((req, res, next) => {
    // Handle 404
    if (!GETroutes.includes(req.path)) return next();
    return routeProtecter(req, res, next);
  });
  APIRoutes(app);
  app.use(authenticationRouter);
  app.use(connectedRouter);
  app.use('/admin', adminRouter);
  GETroutes = allGetRoutes(app);
};
