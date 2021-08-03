import { Router } from 'express';

import addCandidatesRoutes from './candidates.router';
import addDashboardRoute from './dashboard.router';
import addVoteRoute from './votes.router';

const connectedRouter = new Router();
addDashboardRoute(connectedRouter);
addCandidatesRoutes(connectedRouter);
addVoteRoute(connectedRouter);
export default connectedRouter;
