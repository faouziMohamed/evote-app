"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSuccessMessage = exports.getErrorMessage = void 0;
var keysMessageData = {
  en: {
    errors: {
      unexpectedError: 'Unexpected error',
      noBodyPassed: 'Please provide both of them public and private keys and a passphrase. Insteade none was passed',
      noPubkeyPassed: 'Missing Public Key please try again',
      noPrivkeyPassed: 'Missing Private Key please try again',
      noPassphrasePassed: 'Missing Passphrase please try again',
      noEncryptKeyPassed: 'Missing Encrypt Key please try again',
      wrongCredentials: 'Credentials not matching with the server, please contact an administrator for more details',
      reqErrors: 'Request Errors',
      InvalidEntityType: 'Invalid Entity Type'
    },
    success: {
      keysSaved: 'Keys saved successfully',
      success: 'Success'
    }
  },
  fr: {
    errors: {
      unexpectedError: 'Erreur inattendue',
      noBodyPassed: 'Merci de fournir les clés publiques et privées et une phrase de passe. En revanche, aucune clé n’a été fournie',
      noPubkeyPassed: 'Clé publique manquante, merci de réessayer',
      noPrivkeyPassed: 'Clé privée manquante, merci de réessayer',
      noPassphrasePassed: 'Phrase de passe manquante, merci de réessayer',
      noEncryptKeyPassed: 'Clé de chiffrement manquante, merci de réessayer',
      wrongCredentials: 'Les identifiants ne correspondent pas avec le serveur, merci de contacter un administrateur pour plus d’informations',
      reqErrors: 'Erreurs de requête',
      InvalidEntityType: 'Type d’entité non valide'
    },
    success: {
      keysSaved: 'Clés enregistrées avec succès',
      success: 'Succès'
    }
  },
  meta: {
    appName: 'Evote App'
  }
};

var getErrorMessage = function getErrorMessage(errorName) {
  var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  return keysMessageData[lang].errors[errorName] || keysMessageData[lang].errors.unexpectedError;
};

exports.getErrorMessage = getErrorMessage;

var getSuccessMessage = function getSuccessMessage(successName) {
  var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  return keysMessageData[lang].success[successName] || keysMessageData[lang].success.success;
};

exports.getSuccessMessage = getSuccessMessage;