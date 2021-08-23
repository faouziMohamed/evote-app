import { Router } from 'express';

import { getAllCandidates } from '../../controllers/candidates.controllers';
/* Router with root /api/candidates/ */

const routerAPI = Router();
routerAPI.route('/all').get(getAllCandidates);
export default routerAPI;
