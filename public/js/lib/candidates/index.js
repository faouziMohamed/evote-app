"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCandidateModal = useCandidateModal;
Object.defineProperty(exports, "fetchAllCandidateDetails", {
  enumerable: true,
  get: function get() {
    return _candidates.fetchAllCandidateDetails;
  }
});
Object.defineProperty(exports, "getCandidateData", {
  enumerable: true,
  get: function get() {
    return _candidates.getCandidateData;
  }
});
Object.defineProperty(exports, "CandidateCard", {
  enumerable: true,
  get: function get() {
    return _card.CandidateCard;
  }
});
Object.defineProperty(exports, "CandidateDetails", {
  enumerable: true,
  get: function get() {
    return _details.CandidateDetails;
  }
});
Object.defineProperty(exports, "CandidateModal", {
  enumerable: true,
  get: function get() {
    return _modal.CandidateModal;
  }
});

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _candidates = require("./candidates.utils");

var _card = require("./card");

var _details = require("./details");

var _modal = require("./modal");

var removeLoader = function removeLoader() {
  var hasLoader = document.querySelector('.has-loader');
  hasLoader === null || hasLoader === void 0 ? void 0 : hasLoader.replaceChildren();
  hasLoader === null || hasLoader === void 0 ? void 0 : hasLoader.classList.remove('has-loader');
};

function useCandidateModal(_x) {
  return _useCandidateModal.apply(this, arguments);
}

function _useCandidateModal() {
  _useCandidateModal = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var modalContainerId, candidateWrapperClass, candiateModalConstructor, _yield$fetchAllCandid, data, modalContainer, candidateWrapper, lang;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            modalContainerId = _ref.modalContainerId, candidateWrapperClass = _ref.candidateWrapperClass, candiateModalConstructor = _ref.candiateModalConstructor;
            _context.next = 3;
            return (0, _candidates.fetchAllCandidateDetails)();

          case 3:
            _yield$fetchAllCandid = _context.sent;
            data = _yield$fetchAllCandid.data;
            modalContainer = document.querySelector("#".concat(modalContainerId));
            candidateWrapper = document.querySelector(".".concat(candidateWrapperClass));

            if (!(!modalContainer || !candidateWrapper)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return");

          case 9:
            lang = localStorage.getItem('lang');
            removeLoader();
            data.forEach(function (candidate) {
              var _candiateModalConstru = candiateModalConstructor(candidate, lang, candidateWrapper),
                  openModalButton = _candiateModalConstru.openModalButton,
                  closeModalButton = _candiateModalConstru.closeModalButton,
                  modal = _candiateModalConstru.modal;

              (0, _candidates.useModal)({
                modalContainerElment: modalContainer,
                openButtonElement: openModalButton,
                closeButtonElement: closeModalButton,
                modal: modal
              });
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _useCandidateModal.apply(this, arguments);
}