"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }

function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var AdminActions = /*#__PURE__*/function () {
  function AdminActions() {
    (0, _classCallCheck2["default"])(this, AdminActions);
  }

  (0, _createClass2["default"])(AdminActions, null, [{
    key: "getEditBtn",
    value: function getEditBtn() {
      return _classStaticPrivateFieldSpecGet(AdminActions, AdminActions, _editBtn);
    }
  }, {
    key: "getLockBtn",
    value: function getLockBtn() {
      return _classStaticPrivateFieldSpecGet(AdminActions, AdminActions, _lockBtn);
    }
  }, {
    key: "getDeleteBtn",
    value: function getDeleteBtn() {
      return _classStaticPrivateFieldSpecGet(AdminActions, AdminActions, _deleteBtn);
    }
  }, {
    key: "getSaveBtn",
    value: function getSaveBtn() {
      return _classStaticPrivateFieldSpecGet(AdminActions, AdminActions, _saveBtn);
    }
  }, {
    key: "getBtns",
    value: function getBtns() {
      return {
        edit: _classStaticPrivateFieldSpecGet(AdminActions, AdminActions, _editBtn),
        lock: _classStaticPrivateFieldSpecGet(AdminActions, AdminActions, _lockBtn),
        remove: _classStaticPrivateFieldSpecGet(AdminActions, AdminActions, _deleteBtn),
        save: _classStaticPrivateFieldSpecGet(AdminActions, AdminActions, _saveBtn)
      };
    }
  }, {
    key: "hide",
    value: function hide() {
      _classStaticPrivateFieldSpecGet(AdminActions, AdminActions, _btnsParent).classList.add('hidden');
    }
  }, {
    key: "show",
    value: function show() {
      _classStaticPrivateFieldSpecGet(AdminActions, AdminActions, _btnsParent).classList.remove('hidden');
    }
  }, {
    key: "hideBtn",
    value: function hideBtn(btnName) {
      AdminActions.getBtns()[btnName].classList.add('hidden');
    }
  }, {
    key: "showBtn",
    value: function showBtn(btnName) {
      AdminActions.getBtns()[btnName].classList.remove('hidden');
    }
  }, {
    key: "toggleBtn",
    value: function toggleBtn(btnName) {
      AdminActions.getBtns()[btnName].classList.toggle('hidden');
    }
  }, {
    key: "toggleBtns",
    value: function toggleBtns() {
      Object.keys(AdminActions.getBtns()).forEach(function (btnName) {
        AdminActions.toggleBtn(btnName);
      });
    }
  }, {
    key: "showAllBtns",
    value: function showAllBtns() {
      Object.keys(AdminActions.getBtns()).forEach(function (btnName) {
        AdminActions.showBtn(btnName);
      });
    }
  }, {
    key: "hideAllBtns",
    value: function hideAllBtns() {
      Object.keys(AdminActions.getBtns()).forEach(function (btnName) {
        AdminActions.hideBtn(btnName);
      });
    }
  }]);
  return AdminActions;
}();
/*   
<div class="admin-actions hiddden" id="admin-actions">
  <button class="btn btn-affirmative actions-edit" id="edit-user">
    <i class="fad fa-edit"></i>
    <span class="actions--text"><%= content[lang].editUserBtn %> </span>
  </button>
  <button class="btn btn-warning action-lock" id="lock-user">
    <i class="fad fa-user-lock"></i>
    <span class="actions--text"><%= content[lang].LockAccountBtn %></span>
  </button>
  <button class="btn btn-danger action-delete" id="delete-user">
    <i class="fad fa-trash-alt"></i>
    <span class="actions--text"><%= content[lang].deleteUserBtn %></span>
  </button>

  <button class="btn btn-secondary action-save" id="save-changes">
    <i class="fad fa-trash-alt"></i>
    <span class="actions--text"><%= content[lang].saveActionsBtn %></span>
  </button>
</div> 
*/


exports["default"] = AdminActions;
var _btnsParent = {
  writable: true,
  value: document.querySelector('#admin-actions')
};
var _editBtn = {
  writable: true,
  value: _classStaticPrivateFieldSpecGet(AdminActions, AdminActions, _btnsParent).querySelector('#edit-user')
};
var _lockBtn = {
  writable: true,
  value: _classStaticPrivateFieldSpecGet(AdminActions, AdminActions, _btnsParent).querySelector('#lock-user')
};
var _deleteBtn = {
  writable: true,
  value: _classStaticPrivateFieldSpecGet(AdminActions, AdminActions, _btnsParent).querySelector('#delete-user')
};
var _saveBtn = {
  writable: true,
  value: _classStaticPrivateFieldSpecGet(AdminActions, AdminActions, _btnsParent).querySelector('#save-changes')
};
(0, _defineProperty2["default"])(AdminActions, "selectedRow", []);