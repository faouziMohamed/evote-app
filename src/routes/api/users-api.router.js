import { Router } from 'express';

import { protectAPIRoute } from '../../controllers/auth.controllers';
import {
  getAllUsers,
  getUserByCIN,
  getUserByID,
  getUserByUsername,
  getUserWithCallback,
  readUserInput,
} from '../../controllers/users.controllers';
import { getAuthErrorMessage } from '../../data/auth/auth-msg.cms';
import { verifyUserExists } from '../../utils/users.utils';

/* PATH: /api/users/ */
const usersAPIRouter = Router();
usersAPIRouter.use(protectAPIRoute);

// PATH: /api/users/all
usersAPIRouter.route('/all').get(async (req, res) => {
  try {
    getAllUsers(req, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/** value was not provided in :
 * /api/users/:cin || /api/users/:id || /api/users/:username ||
 * /api/users/verify/username/ || /api/users/verify/email/ */
usersAPIRouter
  .route(['/cin/', '/id', '/username', '/verify/username/', '/verify/email/'])
  .get((req, res) => {
    res.status(400).json({ error: getAuthErrorMessage('noValuePassed') });
  });

// PATH: /api/users/:cin || /api/users/:id || /api/users/:username
usersAPIRouter
  .route(['/cin/:cin', '/id/:id', '/username/:username'])
  .get(async (req, res) => {
    try {
      const { cin, id } = req.params;
      let callback = getUserByCIN;
      if (!cin) callback = id ? getUserByID : getUserByUsername;
      await getUserWithCallback(callback)(req, res);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// /api/users/verify/username/ || /api/users/verify/email/
usersAPIRouter
  .route(['/verify/username/:username', '/verify/email/:email'])
  .get(async (req, res) => {
    try {
      const { username, email } = readUserInput(req.params);
      const isUserExists = await verifyUserExists(
        { username, email },
        { filter: '_id' },
      );

      return res
        .status(200)
        .json({ data: !!isUserExists }); /* Make sure it is a boolean */
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

export default usersAPIRouter;
