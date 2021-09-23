"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createToken", {
  enumerable: true,
  get: function get() {
    return _tokenDb.createToken;
  }
});
Object.defineProperty(exports, "existsToken", {
  enumerable: true,
  get: function get() {
    return _tokenDb.existsToken;
  }
});
Object.defineProperty(exports, "getUserIdFromToken", {
  enumerable: true,
  get: function get() {
    return _tokenDb.getUserIdFromToken;
  }
});
Object.defineProperty(exports, "getUserTokens", {
  enumerable: true,
  get: function get() {
    return _tokenDb.getUserTokens;
  }
});
Object.defineProperty(exports, "removeAllTokens", {
  enumerable: true,
  get: function get() {
    return _tokenDb.removeAllTokens;
  }
});

var _tokenDb = require("./db/token-db.utils");