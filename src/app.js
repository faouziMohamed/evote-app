// import { addRandomUserToDB } from './resources/users/users.utils';

import compression from 'compression';
import flash from 'connect-flash';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import express from 'express';
import expressLayout from 'express-ejs-layouts';
import minify from 'express-minify';
import session from 'express-session';
// import helmet from 'helmet';
import createError from 'http-errors';
import logger from 'morgan';
import passport from 'passport';
import path from 'path';

import Config from './config/config';
import { usePassportLocalStrategy } from './controllers/passport';
import { configureRoutes } from './routes/api-routes';
// import { addRandomUserToDB } from './utils/users.utils';

const app = express();
// addRandomUserToDB(200).catch(() => {});
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
    name: 'user-session',
    store: MongoStore.create({
      mongoUrl: Config.DB_URL,
      ttl: 60 * 60 * 24 * 15,
    }),
    secret: Config.session.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: Config.env === 'production',
      httpOnly: Config.env === 'production',
      maxAge: Config.session.maxAge,
      sameSite: true,
    },
  }),
);

app.use(flash());
usePassportLocalStrategy();
app.use(passport.initialize());
app.use(passport.session());
app.use(compression()); // Compress all routes
app.use(minify());
app.use(express.static(path.join(__dirname, 'public')));
configureRoutes(app);

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
