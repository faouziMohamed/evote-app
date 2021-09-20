"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModal = useModal;
exports.getCandidateData = exports.fetchAllCandidateDetails = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var fetchAllCandidateDetails = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var response, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch("/api/candidates/info/");

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json();

          case 5:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchAllCandidateDetails() {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchAllCandidateDetails = fetchAllCandidateDetails;

var getCandidateData = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(candidateID) {
    var _yield$fetchAllCandid, data;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetchAllCandidateDetails();

          case 2:
            _yield$fetchAllCandid = _context2.sent;
            data = _yield$fetchAllCandid.data;
            return _context2.abrupt("return", data[candidateID]);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getCandidateData(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getCandidateData = getCandidateData;

function useModal(_ref3) {
  var modalContainerElment = _ref3.modalContainerElment,
      openButtonElement = _ref3.openButtonElement,
      closeButtonElement = _ref3.closeButtonElement,
      modal = _ref3.modal;
  handleCloseModal(modalContainerElment, closeButtonElement);
  handleOpenModal(modalContainerElment, openButtonElement, modal);
}

function handleOpenModal(modalContainerElment, openButtonElement, modal) {
  var contentRoot = document.querySelector('.main-content-root');
  openButtonElement.addEventListener('click', function () {
    contentRoot.classList.add(['prevent-scroll'], ['blur']);
    modalContainerElment.replaceChildren(modal);
    modalContainerElment.classList.remove('hidden');
  });
}

function handleCloseModal(modalContainerElment, closeButton) {
  var contentRoot = document.querySelector('.main-content-root');
  closeButton.addEventListener('click', function () {
    contentRoot.classList.remove(['prevent-scroll'], ['blur']);
    modalContainerElment.classList.add('hidden');
    modalContainerElment.replaceChildren();
  });
}