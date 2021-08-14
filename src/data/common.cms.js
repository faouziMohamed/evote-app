const keysMessageData = {
  en: {
    errors: {
      noBodyPassed:
        'Please provide both of them public and private keys and a passphrase. Insteade none was passed',
      noPubkeyPassed: 'Missing Public Key please try again',
      noPrivkeyPassed: 'Missing Private Key please try again',
      noPassphrasePassed: 'Missing Passphrase please try again',
      noEncryptKeyPassed: 'Missing Encrypt Key please try again',
      wrongCredentials:
        'Credentials not matching with the server, please contact an administrator for more details',
      reqErrors: 'Request Errors',
      InvalidEntityType: 'Invalid Entity Type',
    },
    success: {
      keysSaved: 'Keys saved successfully',
    },
    meta: {
      appName: 'Evote App',
    },
  },
};

export const getErrorMessage = (errorName, lang = 'en') =>
  keysMessageData[lang].errors[errorName] || 'Unexpected error';

export const getSuccessMessage = (successName, lang = 'en') =>
  keysMessageData[lang].success[successName] || 'Success';
