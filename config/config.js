"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.debug = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _nanoid = require("nanoid");

require('dotenv').config();

var debug = (0, _debug["default"])('evote-app: ');
exports.debug = debug;
var env = process.env.NODE_ENV || 'production';
var APP_NAME = process.env.APP_NAME || 'E-Vote';
var PORT = Number(process.env.PORT) || 5000;
var BASE_URL = env === 'production' ? process.env.BASE_URL : "http://localhost:".concat(PORT);
var Config = {
  env: env,
  session: {
    secret: process.env.SESSION_SECRET || (0, _nanoid.nanoid)(1000),
    expiry: Number(process.env.SESSION_EXPIRY) || 15 * 24 * 60 * 60 * 1000,
    // 15 days
    maxAge: Number(process.env.SESSION_MAXAGE) || 15 * 24 * 60 * 60 * 1000 // 15 days

  },
  DEFAULT_CIN: Number(process.env.DEFAULT_CIN) || 10000,
  PORT: PORT,
  BASE_URL: BASE_URL,
  APP_NAME: APP_NAME,
  SERVER_NAME: process.env.SERVER_NAME || "".concat(APP_NAME, " - Server"),
  SERVER_EMAIL: process.env.SERVER_EMAIL || 'server@pipita.anonaddy.me',
  SERVER_PASSHPRASE: process.env.SERVER_PASSHPRASE || (0, _nanoid.nanoid)(100),
  PASSPHRASE_KEY: process.env.PASSPHRASE_KEY || (0, _nanoid.nanoid)(100),
  COCENTER_NAME: process.env.COCENTER_NAME || 'Count Center',
  COCENTER_EMAIL: process.env.COCENTER_EMAIL || 'count.server@server.ma',
  COCENTER_PASSHPRASE: process.env.COCENTER_PASSHPRASE || (0, _nanoid.nanoid)(100),
  VALCENTER_NAME: process.env.VALIDATION_CENTER_NAME || 'vc Center',
  VALCENTER_EMAIL: process.env.VALIDATION_CENTER_EMAIL || 'vc.server@server.ma',
  VALCENTER_PASSHPRASE: process.env.VALIDATION_CENTER_PASSHPRASE || (0, _nanoid.nanoid)(100),
  DB_URL: env === 'production' ? process.env.DB_URL_PROD : process.env.DB_URL_DEV,
  THEME_COLOR: '#0026a5',
  IMG_DIR_URL: '/images/users',
  USER_IMG_URL: '/images/users/user.png',
  USER_IMG: 'src/public/images/users/user.png',
  IMG_DIR_PATH: 'src/public/images/users'
};
var _default = Config;
exports["default"] = _default;