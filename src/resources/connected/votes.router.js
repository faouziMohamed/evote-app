import { Router } from 'express';

const router = new Router();

router.route('/').get((req, res) => {
  res.render('vote');
});

export default router;
