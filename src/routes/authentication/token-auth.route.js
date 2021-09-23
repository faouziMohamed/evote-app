import { Router } from 'express';

import { newPairGET } from '../../controllers/auth.controllers';
import sendMessage from '../../utils/emails/index.email';
import { verifyToken } from '../../utils/lib/jwt.utils';
import { getUserIdFromToken } from '../../utils/token.utils';
import {
  existsUserById,
  findUserByEmail,
  updateUserById,
} from '../../utils/users.utils';

const tokenRouter = Router();

tokenRouter.get('/', async (req, res) => {
  try {
    if (req.user) {
      return res.redirect('/vote');
    }

    if (!req.query.token) throw new Error('No token provided');
    const { token: rToken } = req.query;
    const type = 'activation';
    await verifyToken(rToken);
    const uid = await getUserIdFromToken({ token: rToken, type });

    if (!uid) throw new Error('Token not found, Retry the activation process');
    const existsUser = await existsUserById(uid);
    if (!existsUser)
      throw new Error('User not found, Retry the activation process');

    const user = updateUserById(uid, { isActivated: true });
    req.user = user;

    return newPairGET(req, res);
    // TODO create page for success activation
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({
        error: error.message,
        errorName: error.name,
        msg: 'Token expired, you need to restart the activation process',
      });
    }
    return res
      .status(401)
      .send({ error: error.message, errorName: error.name });
  }
});

tokenRouter.post('/request', async (req, res) => {
  try {
    if (req.user) return res.redirect('/vote');

    const { email, cin } = req.body;
    if (!email)
      throw new Error('Attending to send an email, but no email was provided');
    if (!cin) throw new Error('A CIN is expected but nothing was provided');

    const user = await findUserByEmail(email);
    if (!user) throw new Error('User not found');

    if (Number(user?.cin) !== Number(cin))
      throw new Error(
        'The combination of Email and CIN not found, ' +
          'please make you sure you provided the right one',
      );

    await sendMessage({ user, msgType: 'activation' });
    return res.status(200).send({
      data:
        'A message with the activation link has been sent to your email,' +
        ' please check it in your inbox',
    });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

export default tokenRouter;
