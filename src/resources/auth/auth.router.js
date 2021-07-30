import { Router } from 'express';
import { body } from 'express-validator';

import { loginGET, loginPOST, signupGET, signupPOST } from './auth.controllers';

const router = Router();

router.route('/login').get(loginGET).post(loginPOST);
router
  .route('/signup')
  .get(signupGET)
  .post(body('email').isEmail(), body('cin').not().isEmpty(), signupPOST);
export default router;
