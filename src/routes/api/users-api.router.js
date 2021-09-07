import { Router } from 'express';

import { protectAPIRoute } from '../../controllers/auth.controllers';
import {
  getUserByCIN,
  getUserByID,
  getUserByUsername,
  getUserWithCallback,
  verifyUserExists,
} from '../../controllers/users.controllers';
import { getAuthErrorMessage } from '../../data/auth/auth-msg.cms';

/* PATH: /api/users/ */
const usersAPIRouter = Router();
usersAPIRouter.use(protectAPIRoute);

// handle the case that no value was provided
usersAPIRouter
  .route(['/cin/', '/id', '/username', '/verify/username/', '/verify/email/'])
  .get((req, res) => {
    res.status(400).json({ error: getAuthErrorMessage('noValuePassed') });
  });

// handle GET, POST, UPDATE to /api/users/:id
usersAPIRouter.route('/id/:id').get(getUserWithCallback(getUserByID));

// handle GET, POST, UPDATE to /api/users/:cin
usersAPIRouter.route('/cin/:cin').get(getUserWithCallback(getUserByCIN));

// handle GET, POST, UPDATE to /api/users/:username
usersAPIRouter
  .route('/name/:username')
  .get(getUserWithCallback(getUserByUsername));

usersAPIRouter
  .route(['/verify/username/:username', '/verify/email/:email'])
  .get(async (req, res) => {
    try {
      const { username, email } = req.params;

      const user = await verifyUserExists(
        { username, email },
        { filter: '_id' },
      );

      return res.status(200).json({ data: !!user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

export default usersAPIRouter;
