import { Router } from 'express';

import {
  activateGET,
  loginGET,
  loginPOST,
  newPairGET,
  registerGET,
  registerPOST,
  updateInfoGET,
  updateInfoPOST,
} from '../../controllers/auth.controllers';

const router = Router();

router.route('/logout').get((req, res) => {
  req.session.cookie.expires = new Date(Date.now() - 1);
  res.cookie('ps', {}, { expires: new Date(Date.now() - 1) });
  res.redirect('/');
});
router.route('/register').get(registerGET).post(registerPOST);
router.route('/login').get(loginGET).post(loginPOST);
router.route('/activate').get(activateGET);
router.route('/update-info').get(updateInfoGET).post(updateInfoPOST);
router.route('/new-pair').get(newPairGET);

export default router;
