import cookieParser from 'cookie-parser';
import express from 'express';
import createError from 'http-errors';
// import jwt from 'jsonwebtoken';
import logger from 'morgan';
import path from 'path';

import { protect } from './resources/auth/auth.controllers';
import authRouter from './resources/auth/auth.router';
import voteRouter from './resources/connected/votes.router';
import indexRouter from './resources/index';
// import { User } from './resources/users/users.model';
import usersRouter from './resources/users/users.router';
// import { addRandomUserToDB } from './resources/users/users.utils';

const app = express();

// addRandomUserToDB(100, User).catch(() => {});
// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/vote', voteRouter);
app.use('/api', protect);
app.use(authRouter);
app.use('/api/u', usersRouter);
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
