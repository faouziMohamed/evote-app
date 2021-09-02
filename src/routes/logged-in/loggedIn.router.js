import { Router } from 'express';

import addCandidatesRoutes from './candidates.router';
import addResultsRoutes from './results.router';
import addVoteRoute from './votes.router';

// ALl routes for connected users except the home page
const connectedRouter = new Router();
addResultsRoutes(connectedRouter);
addCandidatesRoutes(connectedRouter);
addVoteRoute(connectedRouter);
export default connectedRouter;
