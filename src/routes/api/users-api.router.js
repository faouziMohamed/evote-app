import { Router } from 'express';

import {
  getAllUsers,
  getUserByCIN,
  getUserByID,
  getUserByUsername,
  getUserWithCallback,
  readAndVerifyUserInput,
} from '../../controllers/users.controllers';
import { getAuthErrorMessage } from '../../data/auth/auth-msg.cms';
import { verifyUserExists } from '../../utils/users.utils';

/* PATH: /api/users/ */
const usersAPIRouter = Router();

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

// PATH: /api/users/cin/:cin || /api/users/id/:id || /api/users/username/:username
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
      const { username, email } = readAndVerifyUserInput(req.params);
      const isUserExists = await verifyUserExists({ username, email });
      return res.status(200).json({ data: isUserExists });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

export default usersAPIRouter;
