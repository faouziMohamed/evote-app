"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = addResultsRoutes;

var _results = require("../../data/logged-in/results.cms");

function addResultsRoutes(router) {
  router.route('/results').get(function (req, res) {
    var pageData = (0, _results.getResultsPageData)({
      user: req.user
    });
    res.render('connected/results', pageData);
  });
}