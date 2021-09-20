"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserTableRow = exports.dataMap = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utils = require("../utils/utils");

var dataFormat = {
  id: -1,
  cin: -1,
  username: '',
  name: '',
  email: '',
  role: '',
  userType: '',
  hasVoted: true,
  isActivated: true
};
var dataMap = {
  en: {
    id: 'ID',
    cin: 'CIN',
    username: 'Username',
    name: 'Name',
    email: 'Email',
    role: {
      admin: 'Admin',
      user: 'User'
    },
    userType: {
      candidate: 'Candidate',
      voter: 'Voter'
    },
    hasVoted: {
      "true": 'Has Voted',
      "false": 'Has Not Voted yet'
    },
    isActivated: {
      "true": 'Account Activated',
      "false": 'Account Not Activated'
    }
  },
  fr: {
    id: 'ID',
    cin: 'CIN',
    username: "Nom d'utilisateur",
    name: 'Nom',
    email: 'Email',
    role: {
      admin: 'Administrateur',
      user: 'Utilisateur'
    },
    userType: {
      candidate: 'Candidat',
      voter: 'Votant'
    },
    hasVoted: {
      "true": 'A voté',
      "false": "N'a pas voté"
    },
    isActivated: {
      "true": 'Compte activé',
      "false": 'Compte non activé'
    }
  }
};
exports.dataMap = dataMap;

var UserTableRow = /*#__PURE__*/function () {
  function UserTableRow() {
    var userData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : dataFormat;
    (0, _classCallCheck2["default"])(this, UserTableRow);
    this.userData = userData;
    this.lang = localStorage.getItem('lang') || 'en';
    this.checkbox = null;
    this.nameColumn = null;
    this.create();
  }

  (0, _createClass2["default"])(UserTableRow, [{
    key: "create",
    value: function create() {
      this.createRow();
      return this.row;
    }
  }, {
    key: "getRow",
    value: function getRow() {
      return this.row;
    }
  }, {
    key: "getDataId",
    value: function getDataId() {
      return this.userData.id;
    }
  }, {
    key: "getDataCin",
    value: function getDataCin() {
      return this.userData.cin;
    }
  }, {
    key: "getDataUsername",
    value: function getDataUsername() {
      return this.userData.username;
    }
  }, {
    key: "getDataEmail",
    value: function getDataEmail() {
      return this.userData.email;
    }
  }, {
    key: "getDataRole",
    value: function getDataRole() {
      return this.userData.role;
    }
  }, {
    key: "getInputCheckBox",
    value: function getInputCheckBox() {
      return this.checkbox;
    }
  }, {
    key: "attachEventTo",
    value: function attachEventTo() {
      var elementName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
      if (!elementName) throw new Error('No element name provided!');
      this[elementName].addEventListener(event, callback);
    }
  }, {
    key: "createRow",
    value: function createRow() {
      this.checkboxCol = this.createCheckboxCol();
      this.usernameCol = UserTableRow.createColumn((0, _utils.newElement)('p', {
        "class": 'result__username'
      }, [this.userData.username]));
      this.nameCol = this.createNameCol();
      this.emailCol = UserTableRow.createColumn((0, _utils.newElement)('p', {
        "class": 'result__email'
      }, [this.userData.email]));
      this.roleCol = UserTableRow.createColumn((0, _utils.newElement)('p', {
        "class": 'result__role'
      }, [(0, _utils.capitalizeAll)(this.userData.role)]));
      this.activationCol = UserTableRow.createColumn((0, _utils.newElement)('p', {
        "class": 'result__activation'
      }, [dataMap[this.lang].isActivated[this.userData.isActivated]]));
      this.accountTypeCol = UserTableRow.createColumn((0, _utils.newElement)('p', {
        "class": 'result__account-type'
      }, [dataMap[this.lang].userType[this.userData.userType]]));
      this.voteStatusCol = UserTableRow.createColumn((0, _utils.newElement)('p', {
        "class": 'result__vote-status'
      }, [dataMap[this.lang].hasVoted[this.userData.hasVoted]]));
      this.cinCol = UserTableRow.createColumn((0, _utils.newElement)('p', {
        "class": 'result__cin'
      }, [this.userData.cin]));
      this.row = (0, _utils.newElement)('tr', {
        "class": 'users-table__row result__row'
      }, [this.checkboxCol, this.usernameCol, this.nameCol, this.emailCol, this.roleCol, this.activationCol, this.accountTypeCol, this.voteStatusCol, this.cinCol]);
    }
  }, {
    key: "createCheckboxCol",
    value: function createCheckboxCol() {
      this.checkbox = (0, _utils.newElement)('input', {
        type: 'checkbox',
        "class": 'hidden checkbox__input user-row-checkbox',
        'data-id': this.userData.id,
        'data-cin': this.userData.cin
      });
      var checker = (0, _utils.newElement)('span', {
        "class": 'checkbox__checker',
        tabindex: '0'
      });
      var container = (0, _utils.newElement)('div', {
        "class": 'checkbox__input-container'
      }, [this.checkbox, checker]);
      var label = (0, _utils.newElement)('label', {
        "class": 'checkbox__label'
      }, [container]);
      var checkboxWrapper = (0, _utils.newElement)('div', {
        "class": 'checkbox'
      }, [label]);
      var div = (0, _utils.newElement)('div', {
        "class": 'user-input'
      }, [checkboxWrapper]);
      return UserTableRow.createColumn(div);
    }
  }, {
    key: "createNameCol",
    value: function createNameCol() {
      var ROOT = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var fullname = (0, _utils.newElement)('p', {
        "class": 'user-fullname',
        'data-id': this.userData.id
      }, [this.userData.name]);
      var img = (0, _utils.newElement)('img', {
        src: "".concat(ROOT, "/images/users/user.svg"),
        alt: "".concat(this.userData.name, "'s profile"),
        'data-id': this.userData.id,
        width: '50',
        "class": 'result__name__img'
      });
      var profile = (0, _utils.newElement)('div', {
        "class": 'result__name__profile',
        'data-id': this.userData.id
      }, [img]);
      this.nameColumn = (0, _utils.newElement)('div', {
        "class": 'result__name',
        'data-id': this.userData.id
      }, [profile, fullname]);
      return UserTableRow.createColumn(this.nameColumn);
    }
  }], [{
    key: "createColumn",
    value: function createColumn() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return (0, _utils.newElement)('td', {
        "class": 'users-table__col result__col'
      }, [data]);
    }
  }]);
  return UserTableRow;
}();
/*

<tr class='users-table__row search-results result'>
    <td class='users-table__col result__col'>
      <div class='user-input'>
        <div class="checkbox">
          <label class="checkbox__label">
            <div class="checkbox__input-container">
              <input
                tabindex="0"
                type="checkbox"
                class="hidden checkbox__input"
              />
              <span tabindex="0" class="checkbox__checker"></span>
            </div>
          </label>
        </div>      
      </div>
    </td>
    <td class='users-table__col result__col'>
      <p class='username'>faouzi</p>
    </td>
    <td class='users-table__col result__col'>
      <div class='result__name'>
        <div class='result__name__profile'>
          <img
            class='result__name__img'
            src='/images/users/user.svg'
            alt="Faouzi Mohamed's profile"
            width='50'
          />
        </div>
        <p class='user-fullname'>Faouzi Mohamed</p>
      </div>
    </td>
    <td class='users-table__col result__col'>
      <p class='result__email'>faouzimohamed@email.me</p>
    </td>
    <td class='users-table__col result__col'>
      <p class='result__role'>admin</p>
    </td>
    <td class='users-table__col result__col'>
      <p class='result__activation'>Activate</p>
    </td>
    <td class='users-table__col result__col'>
      <p class='result__accountType'>Candidate</p>
    </td>
    <td class='users-table__col result__col'>
      <p class='result__status'>Has vote</p>
    </td>

    <td class='users-table__col result__col'>
      <p class='result__cin'>15660</p>
    </td>
  </tr>
 */


exports.UserTableRow = UserTableRow;