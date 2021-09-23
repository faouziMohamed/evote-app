import { addScriptTag, getCommonPageData } from '../cms.utils';

export const content = {
  en: {
    pageTitle: 'Activate your account',
    newToUs: 'New to Evote App?',
    signUp: 'Sign up',
    emailLabel: 'Email',
    cinLabel: 'CIN',
    submitBtn: 'Sign up',
  },
  fr: {
    pageTitle: 'Activer votre compte',
    newToUs: 'Nouveau chez Evote App?',
    signUp: "S'inscrire",
    emailLabel: 'Email',
    cinLabel: 'CIN',
    submitBtn: "S'inscrire",
  },
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
