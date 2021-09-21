"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _utils = require("../utils/utils");

var SearchBar = /*#__PURE__*/function () {
  function SearchBar() {
    (0, _classCallCheck2["default"])(this, SearchBar);
  }

  (0, _createClass2["default"])(SearchBar, null, [{
    key: "hide",
    value: function hide() {
      SearchBar.parent.classList.add('hidden');
    }
  }, {
    key: "show",
    value: function show() {
      SearchBar.parent.classList.remove('hidden');
    }
  }, {
    key: "clear",
    value: function clear() {
      SearchBar.searchBar.value = '';
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return (0, _utils.isEmpty)(SearchBar.searchBar.value);
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      SearchBar.searchBar.value = (0, _utils.removeExtraSpaces)(value);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return (0, _utils.removeExtraSpaces)(SearchBar.searchBar.value);
    }
  }, {
    key: "focus",
    value: function focus() {
      SearchBar.searchBar.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      SearchBar.searchBar.blur();
    }
  }, {
    key: "getInput",
    value: function getInput() {
      return SearchBar.searchBar;
    }
  }, {
    key: "getSearchBtn",
    value: function getSearchBtn() {
      return SearchBar.searchBtn;
    }
  }]);
  return SearchBar;
}();

exports["default"] = SearchBar;
(0, _defineProperty2["default"])(SearchBar, "parent", document.querySelector('#user-research'));
(0, _defineProperty2["default"])(SearchBar, "searchBar", SearchBar.parent.querySelector('#search-input'));
(0, _defineProperty2["default"])(SearchBar, "searchBtn", SearchBar.parent.querySelector('#search-btn'));