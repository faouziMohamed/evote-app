import { Router } from 'express';

import { getIndexAdminPageData } from '../../data/logged-in/index-admin.cms';

// ALl routes for admins users except
// Route: /admin
const adminRouter = new Router();

adminRouter.route('/').get((req, res) => {
  const pageData = getIndexAdminPageData({ user: req.user });
  res.render('connected/admin/index', pageData);
});

export default adminRouter;
