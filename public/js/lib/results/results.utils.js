"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOptions = getOptions;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getOptions() {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread({
    theme: {
      palette: 'palette3'
    },
    chart: {
      width: '100%',
      height: 480,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 900,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 550
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '90%',
        borderRadius: 5,
        dataLabels: {
          position: 'center'
        }
      }
    },
    dataLabels: {
      enabled: true,
      offsetY: 5,
      style: {
        colors: ['#fff'],
        fontSize: '0.7rem'
      }
    },
    stroke: {
      width: 1,
      curve: 'smooth'
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: true
      },
      labels: {
        show: true,
        formatter: function formatter(val) {
          return val;
        }
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: true,
        formatter: function formatter(val) {
          return "".concat(val, "%");
        }
      }
    },
    legend: {
      show: true,
      position: 'right',
      verticalAlign: 'top',
      containerMargin: {
        left: 35,
        right: 60
      }
    },
    grid: {
      row: {
        colors: ['#a5b5e5', 'transparent'],
        opacity: 0.08
      },
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    responsive: [{
      breakpoint: 1000,
      options: {
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        legend: {
          position: 'bottom'
        },
        chart: {
          height: 360
        }
      }
    }]
  }, opt);
}