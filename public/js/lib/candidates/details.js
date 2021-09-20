"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CandidateDetails = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utils = require("../utils/utils");

var defaultArg = {
  uid: -1,
  cid: -1,
  name: '',
  email: '',
  description: {
    en: {
      details: '',
      skills: ['']
    },
    position: 'n/a',
    depositionDate: ''
  }
};

var CandidateDetails = /*#__PURE__*/function () {
  function CandidateDetails() {
    var candidateData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultArg;
    var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
    (0, _classCallCheck2["default"])(this, CandidateDetails);
    this.data = candidateData;
    this.candidateCID = candidateData.cid;
    this.candidateUID = candidateData.uid;
    this.lang = lang;
    this.metadataLabels = {
      en: {
        name: 'Name',
        position: 'Position',
        depositionDate: 'Deposition Date',
        skills: 'Skills',
        noSkills: 'None',
        noDeposition: 'No deposition date',
        noPosition: 'N/A'
      },
      fr: {
        name: 'Nom',
        position: 'Position',
        depositionDate: 'Date de dépôt',
        skills: 'Compétences',
        noSkills: 'Aucune',
        noDeposition: 'Pas de date de dépôt',
        noPosition: 'N/A'
      }
    };
    this.create();
  }

  (0, _createClass2["default"])(CandidateDetails, [{
    key: "create",
    value: function create() {
      this.createCandidateRow();
    }
  }, {
    key: "getDataCID",
    value: function getDataCID() {
      return this.data.cid;
    }
  }, {
    key: "getDataUID",
    value: function getDataUID() {
      return this.data.uid;
    }
  }, {
    key: "getDataName",
    value: function getDataName() {
      return this.data.name;
    }
  }, {
    key: "getDataSkills",
    value: function getDataSkills() {
      return this.data.description[this.lang].skills;
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
    key: "getPicturePath",
    value: function getPicturePath() {
      return this.picturePath;
    }
  }, {
    key: "getDataBio",
    value: function getDataBio() {
      return this.data.description[this.lang].details;
    }
  }, {
    key: "getDetails",
    value: function getDetails() {
      return this.candidateRow;
    }
  }, {
    key: "getOverlay",
    value: function getOverlay() {
      return this.detailsOverlay;
    }
  }, {
    key: "createCandidateRow",
    value: function createCandidateRow() {
      this.createDetailsOverlay();
      this.createCandidatePicture();
      this.createCandidateDetails();
      this.candidateRow = (0, _utils.newElement)('div', {
        "class": 'candidate-row'
      }, [this.detailsOverlay, this.profilPicContainer, this.candidateDetails]);
    }
  }, {
    key: "createDetailsOverlay",
    value: function createDetailsOverlay() {
      this.createInfoIndicator();
      this.detailsOverlay = (0, _utils.newElement)('div', {
        "class": 'candidate-row__overlay',
        'data-id': this.data.id,
        tabindex: 0
      }, [this.infoIndicatorWrapper]);
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
  }, {
    key: "createCandidatePicture",
    value: function createCandidatePicture() {
      this.createProfilPicture();
      this.profilPicContainer = (0, _utils.newElement)('div', {
        "class": 'candidate-picture'
      }, [this.profilPicture]);
    }
  }, {
    key: "createProfilPicture",
    value: function createProfilPicture() {
      var _this = this;

      this.altPic = "/images/users/user.png";
      this.picturePath = this.altPic;
      this.profilPicture = (0, _utils.newElement)('img', {
        "class": 'candidate-picture__img',
        src: this.altPic,
        alt: "".concat(this.data.name, "'s picture"),
        width: '100'
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
    key: "createCandidateDetails",
    value: function createCandidateDetails() {
      this.createName();
      this.createPositionStatus();
      this.createDeposition();
      this.createkills();
      this.candidateDetails = (0, _utils.newElement)('div', {
        "class": 'candidate-details'
      }, [this.candidateName, this.candidatePosition, this.candidateDeposition, this.candidateSkills]);
    }
  }, {
    key: "createName",
    value: function createName() {
      this.candidateName = (0, _utils.newElement)('h3', {
        "class": 'candidate-name'
      }, [this.data.name]);
    }
  }, {
    key: "createPositionStatus",
    value: function createPositionStatus() {
      var position = this.metadataLabels[this.lang].position;
      var candidatePosition = this.data.description.position || this.metadataLabels[this.lang].noPosition;
      this.candidatePosition = (0, _utils.newElement)('p', {
        "class": 'candidate-position'
      }, ["".concat(position, ": "), candidatePosition]);
    }
  }, {
    key: "createDeposition",
    value: function createDeposition() {
      var deposition = this.metadataLabels[this.lang].depositionDate;
      this.createDepositionDate();
      this.candidateDeposition = (0, _utils.newElement)('p', {
        "class": 'candidate-deposition'
      }, ["".concat(deposition, ": "), this.candidateDepositionDate]);
    }
  }, {
    key: "createDepositionDate",
    value: function createDepositionDate() {
      var date = this.data.description.depositionDate || this.metadataLabels[this.lang].noDeposition;
      var options = {
        dateStyle: 'full'
      };
      date = new Intl.DateTimeFormat(this.lang, options).format(new Date(date));
      date = (0, _utils.capitalizeAll)(date);
      this.candidateDepositionDate = (0, _utils.newElement)('time', {
        "class": 'candidate-deposition--date'
      }, [(0, _utils.newElement)('span', {}, [date])]);
    }
  }, {
    key: "createkills",
    value: function createkills() {
      var skillsLabel = this.metadataLabels[this.lang].skills;
      this.createSkillsData();
      this.candidateSkills = (0, _utils.newElement)('p', {
        "class": 'candidate-skills'
      }, ["".concat(skillsLabel, ": "), this.candidateSkillsData]);
    }
  }, {
    key: "createSkillsData",
    value: function createSkillsData() {
      this.skills = this.data.description[this.lang].skills;
      var skills = this.skills.join(', ');
      this.candidateSkillsData = (0, _utils.newElement)('span', {
        "class": 'candidate-skills--data'
      }, [skills]);
    }
  }]);
  return CandidateDetails;
}(); // <div class='candidate-row'>
//   <div class='candidate-row__overlay' tabindex='0' data-id='10190'>
//     <div class='info-indicator-wrapper'>
//       <div class='info-indicator' tabindex='-1'>
//         <i class='fas fa-info-circle'></i>
//       </div>
//     </div>
//   </div>
//   <div class='candidate-picture'>
//     <img
//       src='/images/users/10190'
//       alt="Faouzi Mohamed's picture"
//       width='100'
//       class='candidate-picture__img'
//     />
//   </div>
//   <div class='candidate-details'>
//     <h3 class='candidate-name'>Faouzi Mohamed</h3>
//     <p class='candidate-position'>Position: N/A</p>
//     <p class='candidate-deposition'>
//       Deposition Date:
//       <time class='candidate-deposition--date'>
//         <span>17/05/2021</span>
//       </time>
//     </p>
//     <p class='candidate-skills'>
//       Skills:
//       <span class='candidate-deposition--date'>
//         Data science, Software engineer, Big data, Cloud computing
//       </span>
//     </p>
//   </div>
// </div>


exports.CandidateDetails = CandidateDetails;