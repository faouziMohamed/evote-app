import { Router } from 'express';

import { protectRoute } from '../auth/auth.controllers';
import { getOneUserData, getUserById } from './users.controllers';
import { User as UserModel } from './users.model';

const router = Router();
router.use(protectRoute);
// handle GET && PUT (UPDATE) to /api/u/?id=:id&otherParams=:o
router.route('/').get(getUserById(UserModel));

// handle GET, POST, UPDATE to /api/u/:userName
router.route('/:username').get(getOneUserData(UserModel));

export default router;
