"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFormValidation = useFormValidation;

var _authForm = require("../utils/auth-form.utils");

var _activate = require("./activate");

function useFormValidation() {
  (0, _authForm.useRegisterFormValidation)();
  var _document = document,
      title = _document.title;
  if (!(title !== null && title !== void 0 && title.includes('Registration'))) (0, _activate.useActivationForm)();
}