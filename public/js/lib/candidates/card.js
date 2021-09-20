"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CandidateCard = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utils = require("../utils/utils");

/* eslint-disable no-console */
var defaultArg = {
  cid: -1,
  uid: -1,
  name: '',
  email: '',
  description: {
    en: {
      details: '',
      skills: ['']
    }
  }
};

var CandidateCard = /*#__PURE__*/function () {
  function CandidateCard() {
    var candidateData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultArg;
    var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
    (0, _classCallCheck2["default"])(this, CandidateCard);

    if (JSON.stringify(candidateData) === JSON.stringify(defaultArg)) {
      throw new Error('You need to pass data to the constructor');
    }

    this.candidateUID = candidateData.uid;
    this.candidateCID = candidateData.cid;
    this.data = candidateData;
    this.lang = lang;
    this.candidateCard = null;
    this.skills = '';
    this.picturePath = '';
    this.metadataLabels = {
      en: {
        voteNow: 'Vote now',
        moreDetails: 'More details...',
        seeMoreAbout: 'Click to see more about'
      },
      fr: {
        voteNow: 'Voter maintenant',
        moreDetails: 'Plus de détails...',
        seeMoreAbout: "Cliquez pour voir plus d'informations sur"
      }
    };

    try {
      this.createCandidateCard();
    } catch (error) {
      console.log('In class Error');
      console.error(error);
    }
  }

  (0, _createClass2["default"])(CandidateCard, [{
    key: "getCard",
    value: function getCard() {
      if (!this.candidateCard) {
        this.createCandidateCard();
      }

      return this.candidateCard;
    }
  }, {
    key: "getPicturePath",
    value: function getPicturePath() {
      return this.picturePath;
    }
  }, {
    key: "getDataName",
    value: function getDataName() {
      return this.data.name;
    }
  }, {
    key: "getDataSkills",
    value: function getDataSkills() {
      return this.skills;
    }
  }, {
    key: "getDataCID",
    value: function getDataCID() {
      return this.candidateCID;
    }
  }, {
    key: "getDataUID",
    value: function getDataUID() {
      return this.candidateUID;
    }
  }, {
    key: "getDataBio",
    value: function getDataBio() {
      return this.data.description[this.lang].details;
    }
  }, {
    key: "getDataDepositionDate",
    value: function getDataDepositionDate() {
      return this.data.description.depositionDate;
    }
  }, {
    key: "getDataPosition",
    value: function getDataPosition() {
      return this.data.description.position;
    }
  }, {
    key: "getMoreDetailsButton",
    value: function getMoreDetailsButton() {
      if (!this.moreDetailsButton) {
        this.createCandidateCard();
      }

      return this.moreDetailsButton;
    }
  }, {
    key: "getVoteButton",
    value: function getVoteButton() {
      if (!this.voteButton) {
        this.createCandidateCard();
      }

      return this.voteButton;
    }
  }, {
    key: "createCandidateCard",
    value: function createCandidateCard() {
      this.createCandidateFigure();
      this.createVoteButton();
      this.candidateCard = (0, _utils.newElement)('div', {
        "class": 'candidate-card',
        tabindex: 0
      }, [this.candidateFigure, this.voteButton]);
    }
  }, {
    key: "createCandidateFigure",
    value: function createCandidateFigure() {
      this.createImageWrapper();
      this.createCandidateDescription();
      this.candidateFigure = (0, _utils.newElement)('figure', {
        "class": 'candidate-card__figure'
      }, [this.imageWrapper, this.candidateDescription]);
    }
  }, {
    key: "createVoteButton",
    value: function createVoteButton() {
      var voteText = this.metadataLabels[this.lang].voteNow;
      this.voteButton = (0, _utils.newElement)('button', {
        "class": 'btn vote-btn btn-primary',
        title: 'Click to vote',
        'data-id': this.candidateCID
      }, [voteText]);
    }
  }, {
    key: "createImageWrapper",
    value: function createImageWrapper() {
      this.createProfilPicture();
      this.createMoreDetailsButtonWrapper();
      this.createInfoIndicator();
      this.imageWrapper = (0, _utils.newElement)('div', {
        "class": 'candidate-figure__top-details'
      }, [this.profilPicture, this.moreDetailsWrapper, this.infoIndicatorWrapper]);
    }
  }, {
    key: "createCandidateDescription",
    value: function createCandidateDescription() {
      this.createCandidateName();
      this.createCandidateDetails();
      this.candidateDescription = (0, _utils.newElement)('figcaption', {
        "class": 'candidate-description'
      }, [this.candidateName, this.candidateDetails]);
    }
  }, {
    key: "createCandidateName",
    value: function createCandidateName() {
      this.candidateName = (0, _utils.newElement)('span', {
        "class": 'candidate-description__name',
        id: "name-".concat(this.data.id)
      }, [this.data.name]);
    }
  }, {
    key: "createCandidateDetails",
    value: function createCandidateDetails() {
      this.skills = this.data.description[this.lang].skills;
      var skills = this.skills.join(' | ');
      this.candidateDetails = (0, _utils.newElement)('small', {
        "class": 'candidate-description__skills'
      }, [skills]);
    }
  }, {
    key: "createProfilPicture",
    value: function createProfilPicture() {
      var _this = this;

      this.altPic = "/images/users/user.png";
      this.picturePath = this.altPic;
      this.profilPicture = (0, _utils.newElement)('img', {
        "class": 'candidate-figure__picture',
        src: this.altPic,
        alt: "".concat(this.data.name, " Profile picture")
      });
      fetch("/images/users/".concat(this.candidateUID)).then( /*#__PURE__*/function () {
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
    key: "createMoreDetailsButtonWrapper",
    value: function createMoreDetailsButtonWrapper() {
      this.createMoreDetailsButton();
      this.moreDetailsWrapper = (0, _utils.newElement)('div', {
        "class": 'candidate-card__more-details'
      }, [this.moreDetailsButton]);
    }
  }, {
    key: "createMoreDetailsButton",
    value: function createMoreDetailsButton() {
      var moreDetailsText = this.metadataLabels[this.lang].moreDetails;
      var altText = this.metadataLabels[this.lang].seeMoreAbout;
      this.moreDetailsButton = (0, _utils.newElement)('button', {
        "class": 'btn more-details-btn',
        title: "".concat(altText, " ").concat(this.data.name),
        'data-id': this.candidateCID
      }, [moreDetailsText]);
    }
  }, {
    key: "createInfoIndicator",
    value: function createInfoIndicator() {
      this.infoIndicator = (0, _utils.newElement)('div', {
        "class": 'info-indicator',
        tabindex: -1
      }, [(0, _utils.newElement)('i', {
        "class": 'fas fa-info-circle'
      })]);
      this.infoIndicatorWrapper = (0, _utils.newElement)('div', {
        "class": 'info-indicator-wrapper'
      }, [this.infoIndicator]);
    }
  }]);
  return CandidateCard;
}();
/**
@html code
<div class="candidate-card">
  <figure class="candidate-card__figure candidate-figure">
    <div class="candidate-figure__top-details">
      <img
        src="/images/users/candidate.png"
        alt="Mohamed Faouzi profile"
        class="candidate-figure__picture"
      />
      <div class="candidate-card__more-details">
        <button
          class="btn more-details-btn"
          title="Click to see more details about Mohamed Faouzi"
        >
          More details...
        </button>
      </div>
      <div class="info-indicator-wrapper">
        <button class="info-indicator" tabindex="-1">
          <i class="fas fa-info-circle"></i>
        </button>
      </div>
    </div>
    <figcaption class="candidate-description">
      <span class="candidate-description__name">Mohamed Faouzi</span>
      <small class="candidate-description__skills">
        Web dev | Software engineer
      </small>
    </figcaption>
  </figure>
  <button class="btn vote-btn btn-primary">Vote now</button>
</div>
* */


exports.CandidateCard = CandidateCard;