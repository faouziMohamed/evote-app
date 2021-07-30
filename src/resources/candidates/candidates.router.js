import { Router } from 'express';

import { getAllCandidates } from './candidates.controllers';

const router = Router();
const routerAPI = Router();
routerAPI.route('/all').get(getAllCandidates);
router.route('/').get(getAllCandidates);

export { router, routerAPI };
