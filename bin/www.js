#!/usr/bin/env node

/* eslint-disable no-console */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("core-js/stable");

require("regenerator-runtime/runtime");

var _address = _interopRequireDefault(require("address"));

var _chalk = _interopRequireDefault(require("chalk"));

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("../app"));

var _config = _interopRequireWildcard(require("../config/config"));

var _db = require("../config/db");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Module dependencies.
 */

/**
 * Normalize a port into a number, string, or false.
 */
var normalizePort = function normalizePort(val) {
  var port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};
/**
 * Get port from environment and store in Express.
 */


var port = normalizePort(_config["default"].PORT || '5000');

_app["default"].set('port', port);
/**
 * Event listener for HTTP server "error" event.
 */


var onError = function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? "Pipe ".concat(port) : "Port ".concat(port); // handle specific listen errors with friendly messages

  switch (error.code) {
    case 'EACCES':
      (0, _config.debug)("".concat(bind, " requires elevated privileges"));
      process.exit(1);
      break;

    case 'EADDRINUSE':
      (0, _config.debug)("".concat(bind, " is already in use"));
      process.exit(1);
      break;

    default:
      throw error;
  }
};
/**
 * Create HTTP server.
 */


var server = _http["default"].createServer(_app["default"]);
/**
 * Event listener for HTTP server "listening" event.
 */


var onListening = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var addr, localUrl, ipv4Url, msg;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _db.connectDB)();

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            (0, _config.debug)(_context.t0);

          case 8:
            addr = server.address(); // const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

            localUrl = "http://localhost:".concat(_chalk["default"].bold(addr.port));
            ipv4Url = "http://".concat(_address["default"].ip(), ":").concat(_chalk["default"].bold(addr.port));
            msg = "You can now view ".concat(_chalk["default"].bold(_config["default"].APP_NAME), " in the browser.");
            console.log('>', msg);
            console.log();
            console.log("    ".concat(_chalk["default"].bold('Local:'), "           ").concat(localUrl));
            console.log("    ".concat(_chalk["default"].bold('On Your network:'), " ").concat(ipv4Url));
            console.log();

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 5]]);
  }));

  return function onListening() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Listen on provided port, on all network interfaces.
 */


server.listen(port).on('error', onError).on('listening', onListening);