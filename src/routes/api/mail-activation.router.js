import { Router } from 'express';

import Config from '../../config/config';
import { updateInfoGET } from '../../controllers/auth.controllers';
import { getActivationStatusPageDataPageData } from '../../data/auth/activation-status.cms';
import sendMessage from '../../utils/emails/index.email';
import { verifyToken } from '../../utils/lib/jwt.utils';
import { findTokenByID, removeAllTokens } from '../../utils/token.utils';
import { findUserByEmail, findUserById } from '../../utils/users.utils';

const tokenRouter = Router();

tokenRouter.get('/', async (req, res) => {
  try {
    if (req.user) return res.redirect('/vote');

    if (!req.query.token) throw new Error('No token provided');
    const { token: rToken } = req.query;
    // rtoken format : token[tokenid] ↓ extract token and it ID
    const [token, rtid] = String(rToken).split('[');
    const tid = rtid?.replace(']', '');

    await verifyToken(token);
    const tokenDoc = await findTokenByID(tid);
    if (!tokenDoc?.userId)
      throw new Error('Token not found, Retry the activation process');
    const user = await findUserById(tokenDoc?.userId);
    if (!user) throw new Error('User not found, Retry the activation process');

    req.user = user;
    const options = {
      maxAge: Config.session.expiry,
      httpOnly: true,
      secure: Config.env === 'production',
    };

    const data = JSON.stringify({
      UID: user._id,
      email: user.email,
      tid,
    });
    res.cookie('uif', data, options); // user information cookie
    return updateInfoGET(req, res);
  } catch (error) {
    return handleActivationErrors(error, req, res);
  }
});

tokenRouter.post('/request', async (req, res) => {
  try {
    if (req.user) {
      return res.status(200).json({
        error: 'You are already logged in',
        redirectTo: '/vote',
      });
    }

    const { email, cin } = req.body;
    if (!email)
      throw new Error('Attending to send an email, but no email was provided');
    if (!cin) throw new Error('A CIN is expected but nothing was provided');

    const user = await findUserByEmail(email);
    if (!user) throw new Error('User not found');

    if (user?.isActivated)
      throw new Error(
        'User already activated, please contact an admin for more support',
      );

    if (Number(user?.cin) !== Number(cin))
      throw new Error(
        'The combination of Email and CIN not found, ' +
          'please make you sure you provided the right one',
      );

    await removeAllTokens({ userId: user._id });

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

function handleActivationErrors(error, req, res) {
  let errorTitle;
  let errorMessage;
  if (error.name === 'TokenExpiredError') {
    errorTitle = 'Token expired';
    errorMessage = 'Token expired, you need to restart the activation process';
  } else if (error.name === 'JsonWebTokenError') {
    errorTitle = 'Invalid token';
    errorMessage = 'You need to provide a valid token';
  } else {
    errorTitle = 'Error';
    errorMessage = error.message;
  }
  const pageData = getActivationStatusPageDataPageData({
    pageTitle: errorTitle,
    errorMessage,
    layout: 'auth/layout',
  });

  [pageData.error] = req.flash('error');
  [pageData.success] = req.flash('success');
  return res.render('auth/activation-status', pageData);
}

export default tokenRouter;
