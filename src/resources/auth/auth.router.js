import { Router } from 'express';
import { body } from 'express-validator';
import passport from 'passport';

import {
  loginGET,
  // loginPOST,
  registerGET,
  registerPOST,
  verifyPostingDataMiddleWare,
} from './auth.controllers';

const router = Router();

router
  .route('/login')
  .get(loginGET)
  .post((req, res, next) => {
    const callBack = verifyPostingDataMiddleWare(req, res, next);
    passport.authenticate('login', callBack)(req, res, next);
  });

router
  .route('/register')
  .get(registerGET)
  .post(body('email').isEmail(), body('cin').not().isEmpty(), registerPOST);
export default router;
