"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = require("../../controllers/auth.controllers");

var router = (0, _express.Router)();
router.route('/logout').get(function (req, res) {
  req.session.cookie.expires = new Date(Date.now() - 1);
  res.cookie('ps', {}, {
    expires: new Date(Date.now() - 1)
  });
  res.redirect('/');
});
router.route('/activate').get(_auth.activateGET);
router.route('/login').get(_auth.loginGET).post(_auth.loginPOST);
router.route('/register').get(_auth.registerGET).post(_auth.registerPOST);
router.route('/new-pair').get(_auth.newPairGET);
var _default = router;
exports["default"] = _default;