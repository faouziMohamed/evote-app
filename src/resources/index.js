import { Router } from 'express';

import { debug } from '../config/config';

// eslint-disable-next-line import/no-cycle

const router = Router();

/* GET home page. */
router.get('/', (req, res) => {
  // if (!req.session.viewCount) {
  //   req.session.viewCount = 0;
  // }
  // req.session.viewCount += 1;
  debug(req.session);
  res.render('index', { layout: false });
});

export default router;
