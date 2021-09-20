"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addRandomUserToDB = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _uniqueNamesGenerator = require("unique-names-generator");

var _candidates = _interopRequireDefault(require("../../models/candidates.model"));

var _users = _interopRequireDefault(require("../../models/users.model"));

var _usersDb = require("./users-db.utils");

function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }

function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var StaticData = /*#__PURE__*/function () {
  function StaticData() {
    (0, _classCallCheck2["default"])(this, StaticData);
  }

  (0, _createClass2["default"])(StaticData, null, [{
    key: "candidateCount",
    get: function get() {
      return _classStaticPrivateFieldSpecGet(this, StaticData, _candidateNumber);
    }
  }, {
    key: "incNumberCandidateAdded",
    value: function incNumberCandidateAdded() {
      _classStaticPrivateFieldSpecSet(this, StaticData, _candidateNumber, _classStaticPrivateFieldSpecGet(this, StaticData, _candidateNumber) + 1);

      return _classStaticPrivateFieldSpecGet(this, StaticData, _candidateNumber);
    }
  }, {
    key: "getNewCin",
    value: function getNewCin() {
      // eslint-disable-next-line no-plusplus
      return this.cin++;
    }
  }, {
    key: "setCin",
    value: function setCin(cin) {
      this.cin = cin;
      this.setNumberUserAdded(cin);
    }
  }, {
    key: "setNumberCandidateAdded",
    value: function setNumberCandidateAdded(count) {
      _classStaticPrivateFieldSpecSet(this, StaticData, _candidateNumber, count);
    }
  }, {
    key: "setNumberUserAdded",
    value: function setNumberUserAdded(numberUserAdded) {
      this.numberUserAdded = numberUserAdded;
    }
  }, {
    key: "incrementNumberAdded",
    value: function incrementNumberAdded() {
      // eslint-disable-next-line no-plusplus
      this.numberUserAdded++;
    }
  }, {
    key: "getNumberUserAdded",
    value: function getNumberUserAdded() {
      return this.numberUserAdded;
    }
  }]);
  return StaticData;
}();

(0, _defineProperty2["default"])(StaticData, "cin", Number(9999));
(0, _defineProperty2["default"])(StaticData, "numberUserAdded", Number(0));
var _candidateNumber = {
  writable: true,
  value: Number(0)
};

var generateName = function generateName() {
  return (0, _uniqueNamesGenerator.uniqueNamesGenerator)({
    dictionaries: [_uniqueNamesGenerator.names],
    length: 1,
    style: 'lowerCase'
  });
};

var grabData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(cb) {
    var dummy;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dummy = null;

          case 1:
            dummy = null;
            _context.next = 4;
            return cb();

          case 4:
            dummy = _context.sent;

          case 5:
            if (dummy !== null) {
              _context.next = 1;
              break;
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function grabData(_x) {
    return _ref.apply(this, arguments);
  };
}();

function grabUsernameEmail() {
  return _grabUsernameEmail.apply(this, arguments);
}

function _grabUsernameEmail() {
  _grabUsernameEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var username, email;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return grabData( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
              return _regenerator["default"].wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      username = generateName();
                      return _context4.abrupt("return", _users["default"].findOne({
                        username: username
                      }).exec());

                    case 2:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4);
            })));

          case 2:
            _context6.next = 4;
            return grabData( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
              return _regenerator["default"].wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      email = "".concat(generateName(), "@").concat(generateName(), "-glpc.ma");
                      return _context5.abrupt("return", _users["default"].findOne({
                        email: email
                      }).exec());

                    case 2:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            })));

          case 4:
            return _context6.abrupt("return", {
              username: username,
              email: email
            });

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _grabUsernameEmail.apply(this, arguments);
}

var newUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(UserModel, password) {
    var numberCandidate, isTrue, addACandidate, _yield$grabUsernameEm, username, email, user;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            numberCandidate = StaticData.candidateCount;
            isTrue = Math.round(Math.random() * 10.6) % 2 === 0;
            addACandidate = numberCandidate < 5 && isTrue;
            if (addACandidate) StaticData.incNumberCandidateAdded();
            _context2.next = 6;
            return grabUsernameEmail();

          case 6:
            _yield$grabUsernameEm = _context2.sent;
            username = _yield$grabUsernameEm.username;
            email = _yield$grabUsernameEm.email;
            user = new UserModel({
              username: username,
              email: email,
              password: password,
              name: {
                first: generateName(),
                last: generateName()
              },
              cin: StaticData.getNewCin(),
              birthDate: new Date(),
              isCandidate: addACandidate
            });
            _context2.next = 12;
            return UserModel.create(user);

          case 12:
            if (!addACandidate) {
              _context2.next = 15;
              break;
            }

            _context2.next = 15;
            return _candidates["default"].create({
              cin: user.cin
            });

          case 15:
            StaticData.incrementNumberAdded();
            return _context2.abrupt("return", user);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function newUser(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

function getCandidateCount() {
  return _getCandidateCount.apply(this, arguments);
}

function _getCandidateCount() {
  _getCandidateCount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", _candidates["default"].countDocuments().exec() || 0);

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _getCandidateCount.apply(this, arguments);
}

var addRandomUserToDB = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var howMany,
        password,
        model,
        cin,
        i,
        _args3 = arguments;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            howMany = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : 5;
            password = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : '123456789';
            model = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : _users["default"];
            _context3.next = 5;
            return (0, _usersDb.getNewCin)(model);

          case 5:
            cin = _context3.sent;
            _context3.t0 = StaticData;
            _context3.next = 9;
            return getCandidateCount();

          case 9:
            _context3.t1 = _context3.sent;

            _context3.t0.setNumberCandidateAdded.call(_context3.t0, _context3.t1);

            StaticData.setCin(cin);
            i = 1;

          case 13:
            if (!(i <= howMany)) {
              _context3.next = 20;
              break;
            }

            _context3.next = 16;
            return newUser(model, password);

          case 16:
            // eslint-disable-next-line no-console
            console.log("".concat(i, " - User ").concat(StaticData.getNumberUserAdded(), "  added!"));

          case 17:
            i++;
            _context3.next = 13;
            break;

          case 20:
            // eslint-disable-next-line no-console
            console.log("All ".concat(howMany, " users are added using the '").concat(password, "' password!")); // eslint-disable-next-line no-console

            console.log('\tNumber of candidate added: ', StaticData.candidateCount); // eslint-disable-next-line no-console

            console.log('Done!!!');
            return _context3.abrupt("return", !1);

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function addRandomUserToDB() {
    return _ref3.apply(this, arguments);
  };
}();

exports.addRandomUserToDB = addRandomUserToDB;