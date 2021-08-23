import { Router } from 'express';

import { protectAPIRoute } from '../../controllers/auth.controllers';
import {
  getUserByCIN,
  getUserByID,
  getUserByUsername,
  getUserWithCallback,
} from '../../controllers/users.controllers';
import { getAuthErrorMessage } from '../../data/auth.cms';

/* Router with root /api/users/ */
const router = Router();
router.use(protectAPIRoute);

// handle the case that no value was provided
router.route(['/cin/', '/id', '/username']).get((req, res) => {
  res.status(400).json({ error: getAuthErrorMessage('noValuePassed') });
});

// handle GET, POST, UPDATE to /api/users/:id
router.route('/id/:id').get(getUserWithCallback(getUserByID));

// handle GET, POST, UPDATE to /api/users/:cin
router.route('/cin/:cin').get(getUserWithCallback(getUserByCIN));

// handle GET, POST, UPDATE to /api/users/:username
router.route('/name/:username').get(getUserWithCallback(getUserByUsername));

export default router;
