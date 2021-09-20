"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawChart = drawChart;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apexcharts = _interopRequireDefault(require("apexcharts"));

var _utils = require("../utils/utils");

var _results = require("./results");

var _results2 = require("./results.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function drawChart() {
  return _drawChart.apply(this, arguments);
}

function _drawChart() {
  _drawChart = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var resultsData, options;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _results.readResultsData)();

          case 2:
            resultsData = _context2.sent;
            options = {
              bar: {
                xaxis: {
                  categories: resultsData.names
                },
                chart: {
                  type: 'bar'
                },
                series: resultsData.votes,
                theme: {
                  palette: 'palette7'
                }
              },
              donut: {
                series: resultsData.votes[0].data,
                chartOptions: {
                  labels: resultsData.names
                },
                chart: {
                  type: 'donut'
                },
                theme: {
                  palette: 'palette7'
                }
              }
            };
            handleBtnTabClick(options);
            _context2.next = 7;
            return draw({
              opt: options.donut,
              chartContainer: document.querySelector('#chart')
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _drawChart.apply(this, arguments);
}

function draw(_x) {
  return _draw.apply(this, arguments);
}

function _draw() {
  _draw = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref) {
    var opt, chartContainer, options, chart;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            opt = _ref.opt, chartContainer = _ref.chartContainer;
            options = (0, _results2.getOptions)(_objectSpread({
              theme: {
                palette: 'palette7'
              },
              title: {
                text: 'Vote results',
                floating: false,
                offsetY: 20,
                align: 'center',
                style: {
                  color: '#444',
                  fontSize: '1rem'
                }
              }
            }, opt));
            chart = new _apexcharts["default"](chartContainer, options);
            chart.render();

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _draw.apply(this, arguments);
}

function handleBtnTabClick(options) {
  var btnsTabs = document.querySelectorAll('.btn-tab');
  var chartContainerParent = document.querySelector('.chart-tab-container');
  if (!btnsTabs || !chartContainerParent) return;

  var getActiveTab = function getActiveTab() {
    return document.querySelector('.active-tab');
  };

  var createNewChartContainer = function createNewChartContainer() {
    return (0, _utils.newElement)('div', {
      id: 'chart'
    });
  };

  var removeOldChartContainer = function removeOldChartContainer() {
    return chartContainerParent === null || chartContainerParent === void 0 ? void 0 : chartContainerParent.replaceChildren();
  };

  var getChartTypeFrom = function getChartTypeFrom(el) {
    return el.dataset.chart || 'bar';
  };

  var setActiveTabTo = function setActiveTabTo(el) {
    return el.classList.add('active-tab');
  };

  var unsetActiveTabTo = function unsetActiveTabTo(el) {
    return el.classList.remove('active-tab');
  };

  var changeActiveTab = function changeActiveTab(oldTab, newTab) {
    unsetActiveTabTo(oldTab);
    setActiveTabTo(newTab);
  };

  btnsTabs.forEach(function (btn) {
    btn.addEventListener('click', /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(e) {
        var activeTab, div, chartType;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                activeTab = getActiveTab();
                changeActiveTab(activeTab, e.target);
                removeOldChartContainer();
                div = createNewChartContainer();
                chartContainerParent === null || chartContainerParent === void 0 ? void 0 : chartContainerParent.append(div);
                chartType = getChartTypeFrom(e.target);
                _context.next = 8;
                return draw({
                  opt: options[chartType],
                  chartContainer: div
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  });
}