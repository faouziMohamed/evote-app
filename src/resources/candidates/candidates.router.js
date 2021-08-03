import { Router } from 'express';

import { getAllCandidates } from './candidates.controllers';

const routerAPI = Router();
routerAPI.route('/all').get(getAllCandidates);
export default routerAPI;
