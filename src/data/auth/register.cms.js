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
    title: 'Registration Page',
    description: 'Create and admin page to be abble to create election',
    keywords: 'register,account, register page',
  },
  fr: {
    title: "Page d'inscription",
    description: 'Créer et administrer la page pour créer des élections',
    keywords: "inscription, compte, page d'inscription",
  },
};

export const registerPageData = {
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

export function getRegisterPageData(options = {}) {
  return (
    getCommonPageData({ ...registerPageData, ...options }) || {
      ...registerPageData,
      ...options,
    }
  );
}
