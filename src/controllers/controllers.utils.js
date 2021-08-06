import { debug } from '../config/config';
import { getAuthErrorMessage } from '../data/auth.cms';

export const checkAuthentication = (req, res, next) => {
  debug(req.url);
  if (req.url === '/login' || req.url === '/register') {
    if (req.user) {
      return res.status(307).redirect('/vote');
    }
  } else if (!req.user) {
    req.flash('error', getAuthErrorMessage('needToLogin'));
    return res.status(307).redirect('/login');
  }
  return next();
};
