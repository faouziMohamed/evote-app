const authPagesData = {
  en: {
    login: {
      title: 'Login Page',
      description: 'Activate vonting account for Employees',
      pageTitle: 'Login to your account',
      usernameLabel: 'Username',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      loggedIn: 'You are already logged in!',
      forgotPassword: 'Forgot password?',
      submitBtn: 'Connect',
      resetBtn: 'Reset',
      meta: {
        path: '/login',
        parentPath: '/',
      },
    },
    register: {
      title: 'Sign up Page',
      description: 'Activate vonting account for Employees',
      pageTitle: 'Activate your account',
      usernameLabel: 'Username',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      birthdateLabel: 'Birthdate',
      cinLabel: 'CIN',
      resetBtn: 'Reset',
      submitBtn: 'Sign up',
      meta: {
        path: '/register',
        parentPath: '/',
      },
    },
    errors: {
      requiredFields: 'Please fill the form, missing credentials',
      password: 'Please fill the form, Password field missing',
      username: 'Please fill the form, Username field is missing',
      email: 'Please fill the form, Email field is missing',
      birthdate: 'Please fill the form, Birthdate field is missing',
      cin: 'Please fill the form, CIN field is missing',
      validation: 'Please try again, you have somme incorrect submissions',
      accountAlreadyActivated: 'The account is already activated',
      usernameUsed: 'The username is already used',
      emailUsed: 'The email is already used',
      emailInvalid: 'The email is invalid',
      passwordInvalid: 'The password is invalid',
      passwordConfirm: 'The password is not confirmed',
      passwordNotMatch: 'The password is not match',
      passwordTooShort: 'The password is too short',
      accountResetError: 'Your password has not been reset',
      needToLogin: 'You need to login to access this page',
    },
    success: {
      accountActivated: 'Your account has been activated',
      passWordReset: 'Your password has been reset',
      activationSuccess:
        'Your account is now activated, you can connect now to your account',
      privateKeyUpdated: 'Your private key has been updated',
      accountUpdated: 'Your account has been updated',
    },
    meta: {
      appName: 'Evote App',
    },
  },
};

export default authPagesData;
export const getPageData = (pageName, lang = 'en') => ({
  layout: 'auth/layout',
  ...authPagesData[lang][pageName],
  ...authPagesData[lang].meta,
  metadata: {
    title: authPagesData[lang][pageName].title,
    description: authPagesData[lang][pageName].description,
  },
});

export const getAuthErrorMessage = (errorName, lang = 'en') =>
  authPagesData[lang].errors[errorName];

export const getAuthSuccessMessage = (successName, lang = 'en') =>
  authPagesData[lang].success[successName];
