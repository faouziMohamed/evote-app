import { Router } from 'express';

import { getHomePageData } from '../data/home.cms';

const router = Router();

/* GET home page. */
router.get('/', (req, res) => {
  const pageData = getHomePageData({});
  res.render('index', pageData);
});

export default router;
