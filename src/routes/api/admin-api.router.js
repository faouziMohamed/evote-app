import { Router } from 'express';

import {
  createDisplayableData,
  readUserData,
} from '../../controllers/users.controllers';
import { createUser } from '../../utils/users.utils';

// PATH: '/api/admin/'
const adminAPIRouter = new Router();

adminAPIRouter.route('/users/add').post(async (req, res) => {
  try {
    // DO not trust the client
    const data = await readUserData(req);
    const userCreated = await createUser(data);
    const user = createDisplayableData(userCreated);
    res.status(200).json({ data: 'User Added', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default adminAPIRouter;
