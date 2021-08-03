import passport from 'passport';
import { Strategy } from 'passport-local';

import { User } from '../resources/users/users.model';

const loginVerification = (req, username, password, done) => {
  User.findOne({ username }, '+password', async (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user)
      return done(null, false, req.flash('error', 'Incorrect username.'));
    if (!(await user.comparePassword(password))) {
      return done(null, false, req.flash('error', 'Incorrect passord.'));
    }
    return done(null, user);
  });
};

export const registerVerification = (req, cin, username, done) => {
  User.findOne({ username }, async (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(
        null,
        false,
        req.flash('error', 'Username is already taken.'),
      );
    }
    return done(null, true);
  });
};

passport.use(
  'login',
  new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    loginVerification,
  ),
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId, (err, user) => {
    done(err, user);
  });
});
