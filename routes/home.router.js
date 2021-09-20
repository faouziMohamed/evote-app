"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _home = require("../data/home.cms");

var router = (0, _express.Router)();
/* GET home page. */

router.get('/', function (req, res) {
  var pageData = (0, _home.getHomePageData)({});
  res.render('index', pageData);
});
var _default = router;
exports["default"] = _default;