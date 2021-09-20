"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureRoutes = void 0;

var _auth = require("../controllers/auth.controllers");

var _routes = require("../utils/routes.utils");

var _adminApi = _interopRequireDefault(require("./api/admin-api.router"));

var _candidates = _interopRequireDefault(require("./api/candidates.router"));

var _entities = _interopRequireDefault(require("./api/entities.router"));

var _usersApi = _interopRequireDefault(require("./api/users-api.router"));

var _voteProcess = _interopRequireDefault(require("./api/vote-process.router"));

var _auth2 = _interopRequireDefault(require("./authentication/auth.router"));

var _home = _interopRequireDefault(require("./home.router"));

var _admin = _interopRequireDefault(require("./logged-in/admin.router"));

var _loggedIn = _interopRequireDefault(require("./logged-in/loggedIn.router"));

var APIRoutes = function APIRoutes(app) {
  app.use('/api/users', _usersApi["default"]);
  app.use('/api/candidates', _candidates["default"]);
  app.use('/api/keys', _entities["default"]);
  app.use('/api/vote', _voteProcess["default"]);
  app.use('/api/admin', _adminApi["default"]);
};

var configureRoutes = function configureRoutes(app) {
  /**
   * Since all routes are not yet registered in the app,
   * {@link GETroutes} will be an empty array.
   * It will be populated later using {@link allGetRoutes}
   */
  var GETroutes = [];
  app.use('/', _home["default"]);
  app.use(function (req, res, next) {
    // Handle 404
    if (!GETroutes.includes(req.path)) {
      return next();
    }

    return (0, _auth.routeProtecter)(req, res, next);
  });
  APIRoutes(app);
  app.use(_loggedIn["default"]);
  app.use('/admin', _admin["default"]);
  app.use(_auth2["default"]);
  GETroutes = (0, _routes.allGetRoutes)(app);
};

exports.configureRoutes = configureRoutes;