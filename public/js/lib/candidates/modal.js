"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CandidateModal = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utils = require("../utils/utils");

var CandidateModal = /*#__PURE__*/function () {
  function CandidateModal(candidate) {
    (0, _classCallCheck2["default"])(this, CandidateModal);
    this.candidate = candidate;

    try {
      this.createModal();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Candidate Modal: ', error);
    }
  }

  (0, _createClass2["default"])(CandidateModal, [{
    key: "getModal",
    value: function getModal() {
      if (!this.modal) {
        this.createModal();
      }

      return this.modal;
    }
  }, {
    key: "getCloseButton",
    value: function getCloseButton() {
      return this.closeButton;
    }
  }, {
    key: "createModal",
    value: function createModal() {
      this.createCloseButton();
      this.createCandidateModalProfile();
      this.createFullDetailsBlock();
      this.modal = (0, _utils.newElement)('div', {
        "class": 'candidate-modal',
        role: 'document'
      }, [this.closeButton, this.candidateModalProfile, this.fullDetailsBlock]);
    }
  }, {
    key: "createCloseButton",
    value: function createCloseButton() {
      this.closeButton = (0, _utils.newElement)('button', {
        "class": 'candidate-modal__close-btn',
        tabindex: 0,
        id: 'candidate-modal__close-btn',
        'aria-label': 'Close this dialog window',
        'data-a11y-dialog-hide': ''
      }, [(0, _utils.newElement)('i', {
        "class": 'fas fa-times'
      })]);
    }
  }, {
    key: "createCandidateModalProfile",
    value: function createCandidateModalProfile() {
      this.createCandidateProfilePciture();
      this.candidateModalProfile = (0, _utils.newElement)('div', {
        "class": 'candidate-modal-profile'
      }, [this.profilPicture]);
    }
  }, {
    key: "createCandidateProfilePciture",
    value: function createCandidateProfilePciture() {
      var _this = this;

      this.altPic = "/images/users/user.png";
      this.profilPicture = (0, _utils.newElement)('img', {
        "class": 'candidate-modal-profile__picture',
        src: this.altPic,
        alt: "".concat(this.candidate.getDataName(), "'s profile picture"),
        width: '200',
        tabindex: 0
      });
      fetch("/images/users/".concat(this.candidate.candidateUID)).then( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(res) {
          var buf, urlPicture;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (res.ok) {
                    _context.next = 2;
                    break;
                  }

                  throw new Error('Missing Images');

                case 2:
                  _context.next = 4;
                  return res.arrayBuffer();

                case 4:
                  buf = _context.sent;
                  urlPicture = URL.createObjectURL(new Blob([buf]));
                  _this.picturePath = urlPicture;
                  _this.profilPicture.src = _this.picturePath;
                  return _context.abrupt("return", urlPicture);

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }())["catch"](function () {});
    }
  }, {
    key: "createFullDetailsBlock",
    value: function createFullDetailsBlock() {
      this.createFullDetailsHeadingsBlock();
      this.createBioBlock();
      this.fullDetailsBlock = (0, _utils.newElement)('section', {
        "class": 'candidate-full-details'
      }, [this.fullDetailsHeadingsBlock, this.bioBlock]);
    }
  }, {
    key: "createBioBlock",
    value: function createBioBlock() {
      this.bioBlock = (0, _utils.newElement)('p', {
        "class": 'candidate-full-details__bio',
        id: 'candidate-full-details__bio',
        tabindex: 0
      }, [this.candidate.getDataBio()]);
    }
  }, {
    key: "createFullDetailsHeadingsBlock",
    value: function createFullDetailsHeadingsBlock() {
      this.createNameBlock();
      this.createSkillsBlock();
      this.fullDetailsHeadingsBlock = (0, _utils.newElement)('header', {
        "class": 'candidate-full-details__headings'
      }, [this.nameBlock, this.skillsBlock]);
    }
  }, {
    key: "createNameBlock",
    value: function createNameBlock() {
      this.nameBlock = (0, _utils.newElement)('h2', {
        "class": 'candidate-full-details__name',
        id: 'candidate-full-details__name'
      }, [this.candidate.getDataName()]);
    }
  }, {
    key: "createSkillsBlock",
    value: function createSkillsBlock() {
      var skills = this.candidate.getDataSkills().join(' | ');
      this.skillsBlock = (0, _utils.newElement)('h3', {
        "class": 'candidate-full-details__skills'
      }, [skills]);
    }
  }]);
  return CandidateModal;
}();
/**
<div
  class="candidate-modal-container hidden"
  tabindex="-1"
  aria-labelledby="candidate-full-details__name"
  aria-describedby="candidate-modal-description"
  aria-hidden="true"
  id="candidate-modal-container"
>
  <div class="candidate-modal" role="document">
    <button
      data-a11y-dialog-hide
      class="candidate-modal__close-btn"
      aria-label="Close this dialog window"
      tabindex="0"
      id="candidate-modal__close-btn"
    >
      <i class="fas fa-times"></i>
    </button>
    <div class="candidate-modal-profile">
      <img
        src="/images/users/16145"
        alt="Mohamed Faouzi's Profile picture"
        class="candidate-modal-profile__picture"
        width="200"
        tabindex="0"
      />
    </div>
    <section class="candidate-full-details">
      <header class="candidate-full-details__headings">
        <h2
          class="candidate-full-details__name"
          id="candidate-full-details__name"
        >
          Mohamed Faouzi
        </h2>
        <h3 class="candidate-full-details__skills">
          Web dev | Software engineer | Cloud engineer | Data
          scientist
        </h3>
      </header>
      <p
        class="candidate-full-details__bio"
        tabindex=0"
        id="candidate-full-details__bio"
      >
        BIO.
      </p>
    </section>
  </div>
</div>
*/


exports.CandidateModal = CandidateModal;