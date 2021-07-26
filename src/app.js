import cookieParser from 'cookie-parser';
import express from 'express';
import createError from 'http-errors';
// import jwt from 'jsonwebtoken';
import logger from 'morgan';
import path from 'path';

import indexRouter from './resources/index';
// import { User } from './resources/users/users.model';
import usersRouter from './resources/users/users.router';
// import { addRandomUserToDB } from './resources/users/users.utils';

const app = express();

// addRandomUserToDB(59, User);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/u', usersRouter);

// app.post('/api/Login', (req, res) => {
//   // Mock user
//   const user = {
//     id: 1,
//     username: 'test',
//     password: 'test',
//   };
//   jwt.sign(
//     { user },
//     'secretkey',
//     { expiresIn: '30s', algorithm: 'HS256' },
//     (err, token) => {
//       res.status(200).json({ token });
//     },
//   );
// });

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(403).json({ message: 'Unauthorized' });
//   }
//   const bearer = token.split(' ');
//   const bearerToken = bearer[1];
//   req.token = bearerToken;
//   return next();
// };

// app.post('/api/validate', verifyToken, (req, res) => {
//   const { token } = req;
//   jwt.verify(token, 'secretkey', (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: 'Unauthorized BAD NEWS' });
//     }
//     return res.status(200).json({ message: 'Validated', decoded });
//   });
// });

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
