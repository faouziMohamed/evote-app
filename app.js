"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _compression = _interopRequireDefault(require("compression"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _expressEjsLayouts = _interopRequireDefault(require("express-ejs-layouts"));

var _expressMinify = _interopRequireDefault(require("express-minify"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

var _passport = _interopRequireDefault(require("passport"));

var _path = _interopRequireDefault(require("path"));

var _config = _interopRequireDefault(require("./config/config"));

var _passport2 = require("./controllers/passport");

var _apiRoutes = require("./routes/api-routes");

// import createError from 'http-errors';
// import { addRandomUserToDB } from './utils/users.utils';
var app = (0, _express["default"])(); // addRandomUserToDB(200).catch(() => {});

if (_config["default"].env === 'production') app.use((0, _helmet["default"])()); // view engine setup

app.set('views', _path["default"].join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.set('layout', 'connected/layout/layout');
app.set('trusty proxy', _config["default"].env === 'production' ? 1 : 0);
app.use(_expressEjsLayouts["default"]);
app.use((0, _morgan["default"])('dev'));
app.use((0, _cors["default"])({
  origin: true,
  credentials: true
}));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use((0, _expressSession["default"])({
  name: 'user-session',
  store: _connectMongo["default"].create({
    mongoUrl: _config["default"].DB_URL,
    ttl: 60 * 60 * 24 * 15
  }),
  secret: _config["default"].session.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: _config["default"].env === 'production',
    httpOnly: _config["default"].env === 'production',
    maxAge: _config["default"].session.maxAge,
    sameSite: true
  }
}));
app.use((0, _connectFlash["default"])());
(0, _passport2.usePassportLocalStrategy)();
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use((0, _compression["default"])()); // Compress all routes

app.use((0, _expressMinify["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));
(0, _apiRoutes.configureRoutes)(app); // catch 404

app.use(function (req, res) {
  // next(createError(404));
  var msg = "\n  <h1>Oups 404!</h1>\n  <p> Sorry can't find that!</p>\n  <p>This mean that the page is not published or you hit a route that does'nt exists</p>\n  <p><strong>Faouzi</strong></p>\n  ";
  res.status(404).send(msg);
}); // error handler

app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
var _default = app;
exports["default"] = _default;