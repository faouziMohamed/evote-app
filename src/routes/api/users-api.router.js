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
const unCompletePath = [
  '/cin/',
  '/id',
  '/username',
  '/verify/username/',
  '/verify/email/',
  '/verify/cin/',
];
usersAPIRouter.route(unCompletePath).get((req, res) => {
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

// /api/users/verify/username/ || /api/users/verify/email/ || /api/users/verify/cin/
const verifyPaths = [
  '/verify/username/:username',
  '/verify/email/:email',
  '/verify/cin/:cin',
];

usersAPIRouter.route(verifyPaths).get(async (req, res) => {
  try {
    const { username, email, cin } = readAndVerifyUserInput(req.params);
    const isUserExists = await verifyUserExists({ username, email, cin });
    return res.status(200).json({ data: isUserExists });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default usersAPIRouter;
