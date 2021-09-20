"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAutoTypingTexts = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utils = require("../utils/utils");

var TxtRotate = /*#__PURE__*/function () {
  function TxtRotate(el, toRotate, period) {
    (0, _classCallCheck2["default"])(this, TxtRotate);
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = Number(period) || 2000;
    this.txt = '';
  }

  (0, _createClass2["default"])(TxtRotate, [{
    key: "run",
    value: function run() {
      this.tick();
      this.isDeleting = false;
    }
  }, {
    key: "tick",
    value: function tick() {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      var span = (0, _utils.newElement)('span', {
        "class": 'text-cusor-dynamic'
      }, this.txt);
      this.el.replaceChildren(span);
      var that = this;
      var delta = 300 - Math.random() * 100;

      if (this.isDeleting) {
        delta /= 2;
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum += 1;
        delta = 500;
      }

      setTimeout(function () {
        that.tick();
      }, delta);
    }
  }]);
  return TxtRotate;
}();

var useAutoTypingTexts = function useAutoTypingTexts() {
  var elements = document.querySelectorAll('.txt-rotate');
  if (!elements.length) return;
  window.addEventListener('load', function () {
    elements.forEach(function (el) {
      var toRotate = el.dataset.rotate;
      var period = el.dataset.period;

      if (toRotate) {
        var txtRotate = new TxtRotate(el, JSON.parse(toRotate), period);
        txtRotate.run();
      }
    });
  });
};

exports.useAutoTypingTexts = useAutoTypingTexts;
useAutoTypingTexts();