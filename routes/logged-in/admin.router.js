"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _indexAdmin = require("../../data/logged-in/index-admin.cms");

// ALl routes for admins users except
// Route: /admin
var adminRouter = new _express.Router();
adminRouter.route('/').get(function (req, res) {
  var pageData = (0, _indexAdmin.getIndexAdminPageData)({
    user: req.user
  });
  res.render('connected/admin/index', pageData);
});
var _default = adminRouter;
exports["default"] = _default;