"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserAddModal = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utils = require("../utils/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var UserAddModal = /*#__PURE__*/function () {
  function UserAddModal() {
    (0, _classCallCheck2["default"])(this, UserAddModal);
    this.create();
    this.candidateInput = null;
    this.adminInput = null;
  }

  (0, _createClass2["default"])(UserAddModal, [{
    key: "getAddUserBtn",
    value: function getAddUserBtn() {
      return this.addUserBtn;
    }
  }, {
    key: "getCancelBtn",
    value: function getCancelBtn() {
      return this.cancelBtn;
    }
  }, {
    key: "getAdminInput",
    value: function getAdminInput() {
      return this.adminInput;
    }
  }, {
    key: "getCandidateInput",
    value: function getCandidateInput() {
      return this.candidateInput;
    }
  }, {
    key: "getDialog",
    value: function getDialog() {
      return this.dialog;
    }
  }, {
    key: "create",
    value: function create() {
      this.createDialog();
      return this.dialog;
    }
  }, {
    key: "resetForm",
    value: function resetForm() {
      this.form.reset();
    }
  }, {
    key: "createDialog",
    value: function createDialog() {
      this.createAdminModalForm();
      this.dialog = (0, _utils.newElement)('div', {
        "class": 'add-user-modal'
      }, [this.form]);
    }
  }, {
    key: "createAdminModalForm",
    value: function createAdminModalForm() {
      this.createFormFieldset();
      this.createFormButtonContainer();
      this.form = (0, _utils.newElement)('form', {
        "class": 'form',
        id: 'add-new-user-form'
      }, [this.fieldsetFormInputs, this.formBtnConainer]);
    }
  }, {
    key: "createFormFieldset",
    value: function createFormFieldset() {
      var firstNameFormFloating = UserAddModal.createFormFloating({
        type: 'text',
        name: 'firstname',
        placeholder: 'First Name',
        id: 'firstname',
        pattern: (0, _utils.getNameRegex)().source,
        required: true
      });
      var lastNameFormFloating = UserAddModal.createFormFloating({
        type: 'text',
        name: 'lastname',
        placeholder: 'Last Name',
        id: 'lastname',
        required: true,
        pattern: (0, _utils.getNameRegex)().source
      });
      var usernameFormFloating = UserAddModal.createFormFloating({
        type: 'text',
        name: 'username',
        placeholder: 'Username',
        id: 'username',
        required: true,
        pattern: (0, _utils.getUsernameRegex)().source,
        className: 'unique'
      });
      var emailFormFloating = UserAddModal.createFormFloating({
        type: 'email',
        name: 'email',
        placeholder: 'Email Address',
        id: 'email',
        required: true,
        className: 'unique',
        pattern: (0, _utils.getEmailRegex)().source
      });
      var inputCheckboxContainer = this.createInputCheckboxContainer();
      this.fieldsetFormInputs = (0, _utils.newElement)('fieldset', {
        "class": 'form-inputs'
      }, [firstNameFormFloating, lastNameFormFloating, usernameFormFloating, emailFormFloating, inputCheckboxContainer]);
    }
  }, {
    key: "createFormButtonContainer",
    value: function createFormButtonContainer() {
      this.addUserBtn = (0, _utils.newElement)('button', {
        "class": 'btn btn-secondary btn--ok',
        type: 'submit',
        id: 'btn-submit'
      }, 'Add user');
      this.cancelBtn = (0, _utils.newElement)('button', {
        "class": 'btn btn--cancel btn-nobg',
        id: 'btn-cancel'
      }, 'Cancel');
      this.formBtnConainer = (0, _utils.newElement)('div', {
        "class": 'form-btn-container'
      }, [this.addUserBtn, this.cancelBtn]);
    }
  }, {
    key: "createInputCheckboxContainer",
    value: function createInputCheckboxContainer() {
      var _UserAddModal$createC = UserAddModal.createCheckboxSwitcher({
        label: 'Admin',
        name: 'role',
        id: 'admin-checkbox'
      }),
          adminCheckboxSwitcher = _UserAddModal$createC.checkSwither,
          adminInput = _UserAddModal$createC.input;

      var _UserAddModal$createC2 = UserAddModal.createCheckboxSwitcher({
        label: 'Candidate',
        name: 'userType',
        id: 'candidate-checkbox'
      }),
          candidateCheckboxSwitcher = _UserAddModal$createC2.checkSwither,
          candidateInput = _UserAddModal$createC2.input;

      this.adminInput = adminInput;
      this.candidateInput = candidateInput;
      return (0, _utils.newElement)('div', {
        "class": 'input-checkbox-container'
      }, [adminCheckboxSwitcher, candidateCheckboxSwitcher]);
    }
  }], [{
    key: "createCheckboxSwitcher",
    value: function createCheckboxSwitcher(_ref) {
      var label = _ref.label,
          name = _ref.name,
          id = _ref.id;

      var _UserAddModal$createS = UserAddModal.createSwitchContainer({
        name: name,
        id: id
      }),
          container = _UserAddModal$createS.container,
          input = _UserAddModal$createS.input;

      var labelTxt = (0, _utils.newElement)('span', {
        "class": 'label-switch--txt'
      }, label);
      var labelSwitch = (0, _utils.newElement)('label', {
        "class": 'label-switch'
      }, [container, labelTxt]);
      var checkSwither = (0, _utils.newElement)('div', {
        "class": 'checkbox-switcher'
      }, [labelSwitch]);
      return {
        checkSwither: checkSwither,
        input: input
      };
    }
  }, {
    key: "createSwitchContainer",
    value: function createSwitchContainer(_ref2) {
      var name = _ref2.name,
          id = _ref2.id;
      var input = UserAddModal.createFormInput({
        type: 'checkbox',
        id: id,
        className: 'hidden checkbox-slider optional',
        name: name
      });
      var slider = (0, _utils.newElement)('span', {
        "class": 'slider'
      });
      var container = (0, _utils.newElement)('div', {
        "class": 'input-container switch'
      }, [input, slider]);
      return {
        container: container,
        input: input
      };
    }
  }, {
    key: "createFormFloating",
    value: function createFormFloating(_ref3) {
      var _ref3$type = _ref3.type,
          type = _ref3$type === void 0 ? 'text' : _ref3$type,
          _ref3$name = _ref3.name,
          name = _ref3$name === void 0 ? '' : _ref3$name,
          _ref3$placeholder = _ref3.placeholder,
          placeholder = _ref3$placeholder === void 0 ? '' : _ref3$placeholder,
          id = _ref3.id,
          _ref3$required = _ref3.required,
          required = _ref3$required === void 0 ? false : _ref3$required,
          _ref3$pattern = _ref3.pattern,
          pattern = _ref3$pattern === void 0 ? null : _ref3$pattern,
          _ref3$className = _ref3.className,
          className = _ref3$className === void 0 ? '' : _ref3$className;
      var input = UserAddModal.createFormInput({
        type: type,
        name: name,
        placeholder: placeholder,
        id: id,
        required: required,
        pattern: pattern,
        className: className
      });
      var label = (0, _utils.newElement)('label', {
        "for": id,
        "class": 'form-floating__label'
      }, [placeholder]);
      var invalidFeedback;
      if (required) invalidFeedback = (0, _utils.newElement)('div', {
        "class": 'invalid-feedback transparent-color'
      }, ["".concat(placeholder, " is required")]);
      return (0, _utils.newElement)('div', {
        "class": 'form-floating'
      }, [input, label, invalidFeedback]);
    }
  }, {
    key: "createFormInput",
    value: function createFormInput(_ref4) {
      var _ref4$type = _ref4.type,
          type = _ref4$type === void 0 ? 'text' : _ref4$type,
          _ref4$name = _ref4.name,
          name = _ref4$name === void 0 ? '' : _ref4$name,
          _ref4$placeholder = _ref4.placeholder,
          placeholder = _ref4$placeholder === void 0 ? '' : _ref4$placeholder,
          id = _ref4.id,
          _ref4$required = _ref4.required,
          required = _ref4$required === void 0 ? false : _ref4$required,
          _ref4$className = _ref4.className,
          className = _ref4$className === void 0 ? 'form-floating__input' : _ref4$className,
          _ref4$pattern = _ref4.pattern,
          pattern = _ref4$pattern === void 0 ? null : _ref4$pattern;
      var classname = "".concat(className, " form-control form-floating__input");
      var opt = {
        type: type,
        name: name,
        placeholder: placeholder,
        id: id,
        required: required,
        "class": classname
      };
      if (pattern) opt.pattern = pattern;
      return (0, _utils.newElement)('input', _objectSpread({}, opt));
    }
  }]);
  return UserAddModal;
}();
/*
<div class="add-user-modal">
  <form class="admin-modal__form" id="add-new-user-form">
    <fieldset class="form-inputs">
      <div class="form-floating">
        <input
          type="text"
          class="form-floating__input"
          id="firstname"
          name="firstname"
          placeholder="Firstname"
          required
        />
        <label for="firstname" class="form-floating__label">
          First Name
        </label>
        <div class="invalid-feedback">Field is required</div>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-floating__input"
          id="lastname"
          placeholder="Last name"
          required
        />
        <label
          for="lastname"
          name="lastname"
          class="form-floating__label"
        >
          Last Name
        </label>
        <div class="invalid-feedback">Field is required</div>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-floating__input"
          id="username"
          name="username"
          placeholder="Username"
          required
        />
        <label for="username" class="form-floating__label">
          Username
        </label>
        <div class="invalid-feedback">Field is required</div>
      </div>
      <div class="form-floating">
        <input
          type="email"
          class="form-floating__input"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <label for="email" class="form-floating__label">
          Email</label
        >
        <div class="invalid-feedback">Field is required</div>
      </div>
      <div class="input-checkbox-container">
        <div class="checkbox-switcher">
          <label class="label-switch">
            <div class="input-container switch">
              <input
                tabindex="0"
                type="checkbox"
                id="check-admin"
                class="hidden checkbox-slider"
              />
              <span class="slider"></span>
            </div>
            <span class="label-switch--txt"> Candidate </span>
          </label>
        </div>
        <div class="checkbox-switcher">
          <label class="label-switch">
            <div class="input-container switch">
              <input
                tabindex="0"
                type="checkbox"
                id="check-candidate"
                class="hidden checkbox-slider"
              />
              <span class="slider"></span>
            </div>
            <span class="label-switch--txt"> Admin </span>
          </label>
        </div>
      </div>
    </fieldset>
    <div class="form-btn-container">
      <button class="btn btn-secondary btn--ok">Add user</button>
      <button class="btn btn--cancel btn-nobg">Cancel</button>
    </div>
  </form>
</div>
 */


exports.UserAddModal = UserAddModal;