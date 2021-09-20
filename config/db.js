"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDB = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _chalk = _interopRequireDefault(require("chalk"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var connectDB = function connectDB() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config["default"].DB_URL;
  return _mongoose["default"].connect(url, _objectSpread(_objectSpread({}, options), {}, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })).then(function (conn) {
    var connected = _chalk["default"].yellowBright('MongoDB Connection established');

    var _conn$connections$ = conn.connections[0],
        host = _conn$connections$.host,
        port = _conn$connections$.port,
        name = _conn$connections$.name;

    var conString = _chalk["default"].bold("".concat(name, "@").concat(host, ":").concat(port));

    console.log();
    console.log('>', "".concat(connected, " on ").concat(conString));
    console.log();
    return conn;
  })["catch"](function (e) {
    return console.log('>', _chalk["default"].red("MongoDB Connection error ", e));
  });
};

exports.connectDB = connectDB;