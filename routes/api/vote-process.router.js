"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _lodash = require("lodash");

var _candidates = require("../../controllers/candidates.controllers");

var _index = require("../../controllers/entities/index.entities");

var _voteProcess = require("../../controllers/vote-process.controllers");

/* Base route /api/vote/ */
var votesRouter = (0, _express.Router)();
votesRouter.route('/voteid').post( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var voteIdEncrypted;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _voteProcess.generateAndSaveVoteID)(req);

          case 3:
            voteIdEncrypted = _context.sent;
            res.status(200).json({
              data: voteIdEncrypted
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(401).json({
              error: _context.t0.message
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
/**
 * Submitted request is double encryptd:
 * 1. The request body is sent in the name "vote".
 *    - It is encrypted with the public key of the server.
 *    - It's decrypted content is encrypted with the entity (count center or
 *      validation center) public key.
 *
 * 2. When server content is decrypted, The result is another gpg encrypted message.
 *    - The message encrypted contain an object containing
 *      { voteID, encrypptedBallot }
 *    - voteID is the vote id of the vote associated with the user who voted
 *    - encryptedBallot is the actual encrypted ballot encrypted with the
 *      valcenter public key
 */

votesRouter.route('/submit/:entity').post( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var entity, expectedEntities, bodyMessage, responseMessage, _yield$getEncryptor, gpgEncryptor, userVote, ballot, candidateID, candidate;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            entity = req.params.entity;
            expectedEntities = (0, _index.getVoteCenterEntities)();

            if (!(entity && !expectedEntities.includes(entity.toLowerCase()))) {
              _context2.next = 5;
              break;
            }

            throw new Error("Invalid entity, accepted entities are: ".concat(expectedEntities.join(', ')));

          case 5:
            _context2.next = 7;
            return (0, _voteProcess.getEncryptedBodyMessage)(req);

          case 7:
            bodyMessage = _context2.sent;
            _context2.next = 10;
            return (0, _voteProcess.getEncryptor)(entity);

          case 10:
            _yield$getEncryptor = _context2.sent;
            gpgEncryptor = _yield$getEncryptor.entityGPGEncryptor;
            _context2.next = 14;
            return (0, _voteProcess.msgDecryptor)(gpgEncryptor, bodyMessage);

          case 14:
            userVote = _context2.sent;

            if (!['countcenter', 'co'].includes(entity.toLowerCase())) {
              _context2.next = 21;
              break;
            }

            _context2.next = 18;
            return (0, _voteProcess.handleCoUserVerification)(userVote, req);

          case 18:
            responseMessage = 'Vote in progress, user verified';
            _context2.next = 35;
            break;

          case 21:
            if (!['validationcenter', 'vc'].includes(entity.toLowerCase())) {
              _context2.next = 35;
              break;
            }

            if ((0, _lodash.isEqual)(userVote, req.session.userVote)) {
              _context2.next = 24;
              break;
            }

            throw new Error('Invalid vote');

          case 24:
            _context2.next = 26;
            return (0, _voteProcess.msgDecryptor)(gpgEncryptor, userVote.encryptedBallot);

          case 26:
            ballot = _context2.sent;
            candidateID = ballot.candidateID;
            _context2.next = 30;
            return (0, _candidates.incrementVoiceCount)(candidateID);

          case 30:
            candidate = _context2.sent;

            if (candidate) {
              _context2.next = 33;
              break;
            }

            throw new Error('Invalid candidate');

          case 33:
            _voteProcess.voteProcessEvent.emit("vote-finished-".concat(req.user.username), req);

            responseMessage = 'Vote submitted successfully';

          case 35:
            res.status(201).json({
              data: responseMessage
            });
            _context2.next = 41;
            break;

          case 38:
            _context2.prev = 38;
            _context2.t0 = _context2["catch"](0);
            res.status(401).json({
              error: _context2.t0.message
            });

          case 41:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 38]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = votesRouter;
exports["default"] = _default;