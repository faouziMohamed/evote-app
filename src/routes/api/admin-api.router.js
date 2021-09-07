import { Router } from 'express';

// PATH: '/api/admin/'
const adminAPIRouter = new Router();

adminAPIRouter.route('/users/add').post((req, res) => {
  try {
    const { username, email } = req.body;
    console.log(username, email, req.body);
    res.status(200).json({ data: 'User Add' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default adminAPIRouter;
