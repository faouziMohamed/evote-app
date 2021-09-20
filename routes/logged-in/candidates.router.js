"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = addCandidatesRoutes;

var _candidates = require("../../data/logged-in/candidates.cms");

function addCandidatesRoutes(router) {
  router.route('/candidates').get(function (req, res) {
    var pageData = (0, _candidates.getCandidatesPageData)({
      user: req.user
    });
    res.render('connected/candidates', pageData);
  });
}