import { Router } from 'express';
import passport from 'passport';

import {
  checkBeforeLogin,
  loginGET,
  registerGET,
  registerPOST,
} from '../../controllers/auth.controllers';
import { getNewPairPageData } from '../../data/auth/newPaire.cms';

const router = Router();

router
  .route('/login')
  .get(loginGET)
  .post((req, res, next) => {
    const callBack = checkBeforeLogin(req, res, next);
    passport.authenticate('login', callBack)(req, res, next);
  });

router.route('/new-pair').get((req, res) => {
  const pageData = getNewPairPageData({
    user: req.user,
    isNewPaire_page: true,
    layout: 'auth/layout',
  });

  [pageData.error] = req.flash('error');
  [pageData.success] = req.flash('success');
  pageData.user = req.user;
  res.render('auth/new-pair', pageData);
});

router.route('/register').get(registerGET).post(registerPOST);
export default router;
