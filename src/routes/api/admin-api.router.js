import { Router } from 'express';

import { readUserData } from '../../controllers/users.controllers';
import { createUser } from '../../utils/users.utils';

// PATH: '/api/admin/'
const adminAPIRouter = new Router();

adminAPIRouter.route('/users/add').post(async (req, res) => {
  try {
    // DO not trust the client
    const data = await readUserData(req);
    await createUser(data);
    res.status(200).json({ data: 'User Added' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default adminAPIRouter;
