import { Router } from 'express';

import addCandidatesRoutes from './connected/candidates.router';
import addDashboardRoute from './connected/dashboard.router';
import addVoteRoute from './connected/votes.router';

const connectedRouter = new Router();
addDashboardRoute(connectedRouter);
addCandidatesRoutes(connectedRouter);
addVoteRoute(connectedRouter);
export default connectedRouter;
