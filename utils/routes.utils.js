"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getRoutes;
exports.allGetRoutes = allGetRoutes;

function getRoutesOfLayer(bpath, layer) {
  var _layer$handle;

  if (layer !== null && layer !== void 0 && layer.method) {
    return ["".concat(layer.method.toUpperCase(), " ").concat(bpath)];
  }

  if (layer !== null && layer !== void 0 && layer.route) {
    return getRoutesOfLayer(bpath + split(layer.route.path), layer.route.stack[0]);
  }

  if ((layer === null || layer === void 0 ? void 0 : layer.name) === 'router' && layer !== null && layer !== void 0 && (_layer$handle = layer.handle) !== null && _layer$handle !== void 0 && _layer$handle.stack) {
    var routes = [];
    layer.handle.stack.forEach(function (stackItem) {
      routes = routes.concat(getRoutesOfLayer(bpath + split(layer.regexp), stackItem));
    });
    return routes;
  }

  return [];
}

function split(thing) {
  if (typeof thing === 'string') {
    return thing;
  }

  if (thing.fast_slash) {
    return '';
  }

  var match = thing.toString().replace('\\/?', '').replace('(?=\\/|$)', '$').match(/^\/\^((?:\\[.*+?^${}()|[\]\\/]|[^.*+?^${}()|[\]\\/])*)\$\//);
  return match ? match[1].replace(/\\(.)/g, '$1') : "<complex:".concat(thing.toString(), ">");
}

function getRoutes(app) {
  var routes = [];

  app._router.stack.forEach(function (layer) {
    routes = routes.concat(getRoutesOfLayer('', layer));
  });

  return routes;
}

function allGetRoutes(app) {
  var _getRoutes;

  var isGetRoute = function isGetRoute(path) {
    return path.startsWith('GET ');
  };

  var isNotRootPath = function isNotRootPath(path) {
    return !path.endsWith('/');
  };

  var isNotApiRoute = function isNotApiRoute(path) {
    return !path.includes('/api/');
  };

  return (_getRoutes = getRoutes(app)) === null || _getRoutes === void 0 ? void 0 : _getRoutes.filter(isNotRootPath).filter(function (path) {
    return isGetRoute(path) && isNotApiRoute(path);
  }).map(function (str) {
    return str.replace('GET ', '');
  });
}