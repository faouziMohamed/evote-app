import { Router } from 'express';

import { protectRoute } from '../../controllers/auth.controllers';
import {
  getOneUserData,
  getUserById,
} from '../../controllers/users.controllers';

const router = Router();
router.use(protectRoute);
// handle GET && PUT (UPDATE) to /api/u/?id=:id&otherParams=:o
router.route('/').get(getUserById);

// handle GET, POST, UPDATE to /api/u/:userName
router.route('/:username').get(getOneUserData);

export default router;
