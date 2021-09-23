"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function getHeaderTemplate(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === void 0 ? {
    btnLink: '',
    btnContent: ''
  } : _ref$data;
  var headerContent = "\n<header class=\"email-header\">\n  <div class=\"header_item\">\n    <a\n      href=\"".concat(process.env.BASE_URL, "\"\n      class=\"header__logo header__link\"    >\n      <img\n        src=\"").concat(process.env.BASE_URL, "/images/e-vote-ws.svg\"\n        alt=\"Evote App Logo\"\n        class=\"header__img\"\n      />\n    </a>\n  </div>\n\n  <div class=\"header_item\">\n    <a href=\"").concat(data.btnLink, "\" class=\"header__link btn btn-secondary\">\n      <i class=\"fas fa-user-check\"></i>\n      <span class=\"header-text\">").concat(data.btnContent, "</span>\n    </a>\n  </div>\n</header>\n");
  return headerContent;
}

var _default = getHeaderTemplate;
exports["default"] = _default;