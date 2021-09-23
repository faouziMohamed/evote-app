"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = require("nodemailer");

var transporter = (0, _nodemailer.createTransport)({
  service: process.env.MAIL_SERVICE,
  auth: {
    type: process.env.OAUTH_TYPE,
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});
var _default = transporter;
exports["default"] = _default;