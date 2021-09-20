import { addScriptTag, getCommonPageData } from '../cms.utils';

export const content = {
  en: {
    pageTitle: 'Activate your account',
    haveAnAccount: 'Already have an account?',
    signIn: 'Sign in',
    firstNameLabel: 'First name',
    lastNameLabel: 'Last name',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    usernameLabel: 'Username',
    birthdateLabel: 'Birthdate',
    cinLabel: 'CIN',
    submitBtn: 'Sign up',
  },
  fr: {},
};

const metadata = {
  en: {
    title: 'Activation Page',
    description: 'Activate vonting account',
    keywords: 'activate,account, register page',
  },
  fr: {
    title: 'Activation Page',
    description: 'Activate vonting account',
    keywords: 'inscription,inscrire,inscrire page',
  },
};

export const activatePageData = {
  lang: 'en',
  content,
  metadata,
  slug: ['register'],
  inject: {
    bodyScripts: [
      {
        addScriptTag,
        src: '/js/auth_bundle.js',
        type: 'text/javascript',
        attributes: ['async', 'defer'],
      },
    ],
  },
};

export function getActivatePageData(options = {}) {
  return (
    getCommonPageData({ ...activatePageData, ...options }) || {
      ...activatePageData,
      ...options,
    }
  );
}
