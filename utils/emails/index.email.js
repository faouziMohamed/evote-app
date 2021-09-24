"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sendMessage;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mailer = _interopRequireDefault(require("../../config/mailer"));

var _token = _interopRequireDefault(require("../../models/token.model"));

var _jwt = require("../lib/jwt.utils");

var _activation = _interopRequireDefault(require("./activation.email"));

function sendMessage(_x) {
  return _sendMessage.apply(this, arguments);
}

function _sendMessage() {
  _sendMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var user, _ref$msgType, msgType, token, doc, mailOptions;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = _ref.user, _ref$msgType = _ref.msgType, msgType = _ref$msgType === void 0 ? 'activation' : _ref$msgType;
            token = (0, _jwt.newToken)(user);
            _context.next = 4;
            return _token["default"].create({
              token: token,
              userId: user._id,
              type: msgType
            });

          case 4:
            doc = _context.sent;
            mailOptions = getActivationMailOptions(user, "".concat(token, "[").concat(doc._id, "]"));
            return _context.abrupt("return", sendMsg(mailOptions));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sendMessage.apply(this, arguments);
}

function getActivationMailOptions(user, token) {
  var name = process.env.MAIL_DISPLAYED_NAME;
  var email = process.env.MAIL_USERNAME;
  return {
    from: "".concat(name, " <").concat(email, ">"),
    to: user.email,
    subject: 'Activate your account',
    html: (0, _activation["default"])({
      data: {
        token: token
      },
      user: user
    })
  };
}

function sendMsg(mailOptions) {
  return new Promise(function (resolve, reject) {
    _mailer["default"].sendMail(mailOptions, function (error, info) {
      if (error) {
        var err = new Error("Message Sending Error : ".concat(error.message));
        reject(err);
      } else resolve(info);
    });
  });
}