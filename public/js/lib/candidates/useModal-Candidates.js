"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCandidatesDetailModal = useCandidatesDetailModal;
exports.useCandidatesCardModal = useCandidatesCardModal;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../utils/utils");

var _voteProcess = require("../vote/vote-process");

var _card = require("./card");

var _details = require("./details");

var _index = require("./index");

var _modal = require("./modal");

function useCandidatesDetailModal() {
  return _useCandidatesDetailModal.apply(this, arguments);
}

function _useCandidatesDetailModal() {
  _useCandidatesDetailModal = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _index.useCandidateModal)({
              modalContainerId: 'candidate-modal-container',
              candidateWrapperClass: 'list-candidates',
              candiateModalConstructor: addCandidateAndModal
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _useCandidatesDetailModal.apply(this, arguments);
}

function useCandidatesCardModal() {
  return _useCandidatesCardModal.apply(this, arguments);
}

function _useCandidatesCardModal() {
  _useCandidatesCardModal = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _index.useCandidateModal)({
              modalContainerId: 'candidate-modal-container',
              candidateWrapperClass: 'candidate-cards-wrapper',
              candiateModalConstructor: addCardAndModal
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _useCandidatesCardModal.apply(this, arguments);
}

function addCandidateAndModal(candidate, lang, candidateList) {
  var cDetails = new _details.CandidateDetails(candidate, lang);
  var cModal = new _modal.CandidateModal(cDetails);
  var details = cDetails.getDetails();
  var modal = cModal.getModal();
  var closeModalButton = cModal.getCloseButton();
  var openModalButton = cDetails.getOverlay();
  var li = (0, _utils.newElement)('li', {
    "class": 'candidate-item'
  });
  li.append(details);
  candidateList.append(li);
  return {
    openModalButton: openModalButton,
    closeModalButton: closeModalButton,
    modal: modal
  };
}

function addCardAndModal(candidate, lang, cardsWrapper) {
  var candidateCard = new _card.CandidateCard(candidate, lang);
  var candidateModal = new _modal.CandidateModal(candidateCard);
  var card = candidateCard.getCard();
  var modal = candidateModal.getModal();
  var closeModalButton = candidateModal.getCloseButton();
  var openModalButton = candidateCard.getMoreDetailsButton();
  var voteBtn = candidateCard.getVoteButton();
  hendleVoteProcess(voteBtn);
  cardsWrapper.append(card);
  return {
    openModalButton: openModalButton,
    closeModalButton: closeModalButton,
    modal: modal
  };
}

function hendleVoteProcess(voteBtn) {
  voteBtn.addEventListener('click', initiateVoteProcess);
}

function initiateVoteProcess(_x) {
  return _initiateVoteProcess.apply(this, arguments);
}

function _initiateVoteProcess() {
  _initiateVoteProcess = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(e) {
    var voteBtn, candidateID, _JSON$parse, UID, ballot, vote;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            voteBtn = e.target;
            candidateID = voteBtn.dataset.id;
            _JSON$parse = JSON.parse((0, _utils.decodeCookie)((0, _utils.getDataFromCookie)('ps'))), UID = _JSON$parse.UID;
            ballot = {
              candidateID: candidateID,
              UID: UID
            };
            _context3.next = 7;
            return new _voteProcess.Vote({
              ballot: ballot,
              UID: UID
            }).initialize();

          case 7:
            vote = _context3.sent;
            _context3.next = 10;
            return vote.runVoteProcess();

          case 10:
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);
            // eslint-disable-next-line no-console
            console.log(_context3.t0); // TODO: invalidate session and redirect to login page
            // redirectTo('/login');

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return _initiateVoteProcess.apply(this, arguments);
}