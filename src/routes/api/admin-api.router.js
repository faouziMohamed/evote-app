import { Router } from 'express';

import { readUserData } from '../../controllers/admin.controllers';
import User from '../../models/users.model';

// PATH: '/api/admin/'
const adminAPIRouter = new Router();

adminAPIRouter.route('/users/add').post(async (req, res) => {
  try {
    // DO not trust the client
    const data = await readUserData(req);
    const user = new User(data);
    await user.save();
    res.status(200).json({ data: 'User Added' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default adminAPIRouter;
