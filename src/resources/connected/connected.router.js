import { Router } from 'express';

const router = new Router();

router.route('/dashboard').get((req, res) => {
  res.render('connected/dashboard', {
    title: 'Dashboard',
    metadata: {
      title: 'Dashboard',
      description: 'Dashboard',
    },
  });
});

export default router;
