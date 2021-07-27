import { Router } from 'express';

import CMSAuth from './auth.cms';
import { signin, signup } from './auth.controllers';

const router = Router();

router
  .route('/login')
  .get((req, res) => {
    const lang = 'en';
    res.render('auth/login.ejs', {
      ...CMSAuth[lang].login,
      ...CMSAuth[lang].appName,
    });
  })
  .post(signin);
router
  .route('/signup')
  .get((req, res) => {
    const lang = 'en';
    res.render('auth/signup.ejs', {
      ...CMSAuth[lang].signup,
      ...CMSAuth[lang].meta,
    });
  })
  .post(signup);
export default router;
