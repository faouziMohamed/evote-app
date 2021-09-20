"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEncryptionKeys = getEncryptionKeys;
exports.getEntityArmoredPublicKey = exports.getVoteCenterEntities = exports.constructEntity = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _entities = require("../../config/entities.config");

var _common = require("../../data/common.cms");

var _keys = _interopRequireWildcard(require("../../models/keys.model"));

var _gpgEncryptor = _interopRequireDefault(require("../../utils/lib/gpgEncryptor"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var constructEntity = function constructEntity() {
  var entityType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'server';
  var entity = {};

  switch (entityType) {
    case 'svr':
    case 'server':
      {
        entity = (0, _entities.getEntity)('server');
        break;
      }

    case 'co':
    case 'countcenter':
      {
        entity = (0, _entities.getEntity)('countCenter');
        break;
      }

    case 'vc':
    case 'valcenter':
      {
        entity = (0, _entities.getEntity)('validationCenter');
        break;
      }

    default:
      throw new Error((0, _common.getErrorMessage)('InvalidEntityType'));
  }

  return entity;
};

exports.constructEntity = constructEntity;

var getVoteCenterEntities = function getVoteCenterEntities() {
  return ['co', 'countcenter', 'vc', 'valcenter'];
};

exports.getVoteCenterEntities = getVoteCenterEntities;

var getKeysFromDB = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(entityData) {
    var filter,
        key,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            filter = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            _context.next = 3;
            return _keys["default"].findOne({
              name: entityData.name,
              email: entityData.email
            }, filter).lean().exec();

          case 3:
            key = _context.sent;
            if (key) key.passphrase = (0, _keys.decryptPassphrase)(key.passphrase);
            return _context.abrupt("return", key);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getKeysFromDB(_x) {
    return _ref.apply(this, arguments);
  };
}();

var createNewKeys = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(entityData) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new _gpgEncryptor["default"]({
              userIDs: entityData.userID(),
              passphrase: entityData.passphrase
            }).init());

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createNewKeys(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

function getEncryptionKeys(_x3) {
  return _getEncryptionKeys.apply(this, arguments);
}

function _getEncryptionKeys() {
  _getEncryptionKeys = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(entityName) {
    var filter, entityData, entityKeys, entityGPGEncryptor, options;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            filter = {
              _id: 0,
              publicArmoredKey: 1,
              privateArmoredKey: 1,
              passphrase: 1
            };
            entityData = constructEntity(entityName.toLowerCase());
            _context4.next = 4;
            return getKeysFromDB(entityData, filter);

          case 4:
            entityKeys = _context4.sent;
            entityGPGEncryptor = null;

            if (!entityKeys) {
              _context4.next = 12;
              break;
            }

            _context4.next = 9;
            return _gpgEncryptor["default"].fromArmoredKeys(_objectSpread({}, entityKeys));

          case 9:
            entityGPGEncryptor = _context4.sent;
            _context4.next = 20;
            break;

          case 12:
            _context4.next = 14;
            return createNewKeys(entityData);

          case 14:
            entityGPGEncryptor = _context4.sent;
            entityKeys = entityGPGEncryptor.getArmoredKeys();
            options = _objectSpread(_objectSpread(_objectSpread({}, entityKeys), entityGPGEncryptor.userID), {}, {
              foreignPubKeys: entityGPGEncryptor.foreignPubKeys
            });
            _context4.next = 19;
            return _keys["default"].create(options);

          case 19:
            // eslint-disable-next-line no-console
            console.log("".concat(entityData.name, " keys created!"));

          case 20:
            return _context4.abrupt("return", {
              entityKeys: entityKeys,
              entityGPGEncryptor: entityGPGEncryptor
            });

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getEncryptionKeys.apply(this, arguments);
}

var getEntityArmoredPublicKey = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(entityName) {
    var _yield$getEncryptionK, _yield$getEncryptionK2, entityKeys;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getEncryptionKeys(entityName);

          case 2:
            _yield$getEncryptionK = _context3.sent;
            _yield$getEncryptionK2 = _yield$getEncryptionK.entityKeys;
            entityKeys = _yield$getEncryptionK2 === void 0 ? '' : _yield$getEncryptionK2;
            return _context3.abrupt("return", entityKeys.publicArmoredKey);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getEntityArmoredPublicKey(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getEntityArmoredPublicKey = getEntityArmoredPublicKey;