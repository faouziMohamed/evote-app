import { getAuthErrorMessage } from '../auth/auth.cms';

export const checkAuthentication = (req, res, next) => {
  if (req.url === '/login' || req.url === '/register') {
    if (req.user) {
      return res.redirect('/vote');
    }
  } else if (!req.user) {
    req.flash('error', getAuthErrorMessage('needToLogin'));
    return res.redirect('/login');
  }
  return next();
};
