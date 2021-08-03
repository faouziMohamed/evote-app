// import { addRandomUserToDB } from './resources/users/users.utils';

import './utils/passport';

import compression from 'compression';
import flash from 'connect-flash';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import express from 'express';
import expressLayout from 'express-ejs-layouts';
import session from 'express-session';
// import helmet from 'helmet';
import createError from 'http-errors';
import logger from 'morgan';
import passport from 'passport';
import path from 'path';

import Config from './config/config';
import { protect } from './resources/auth/auth.controllers';
import authenticationRouter from './resources/auth/auth.router';
import {
  router as candidateRouter,
  routerAPI as candidateRouterAPI,
} from './resources/candidates/candidates.router';
import connectedUserRouter from './resources/connected/connected.router';
import voteRouter from './resources/connected/votes.router';
import indexRouter from './resources/index';
// import { User } from './resources/users/users.model';
import usersRouter from './resources/users/users.router';

const app = express();
// addRandomUserToDB(200, User).catch(() => {});
// app.use(helmet());
// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.set('layout', 'connected/layout/layout');
app.set('trusty proxy', Config.env === 'production' ? 1 : 0);

app.use(expressLayout);
app.use(logger('dev'));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(
  session({
    name: 'evoteSID',
    store: MongoStore.create({ mongoUrl: Config.DB_URL }),
    secret: Config.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: Config.env === 'production',
      httpOnly: true,
      maxAge: Config.session.maxAge,
      sameSite: 'strict',
    },
  }),
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// debug(passport.authenticate);
app.use(compression()); //   Compress all routes
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/vote', voteRouter);
app.use('/api', protect);
app.use('/api/u', usersRouter);
app.use('/api/candidates', candidateRouterAPI);
app.use('/candidates', candidateRouter);
app.use(authenticationRouter);
app.use(connectedUserRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
export default app;
