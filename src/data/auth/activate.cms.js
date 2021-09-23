import { addScriptTag, getCommonPageData } from '../cms.utils';

export const content = {
  en: {
    pageTitle: 'Activate your account',
    newToUs: 'New to Evote App?',
    signUp: 'Sign up',
    emailLabel: 'Email',
    cinLabel: 'CIN',
    submitBtn: 'Request Activation Link',
  },
  fr: {
    pageTitle: 'Activer votre compte',
    newToUs: 'Nouveau chez Evote App?',
    signUp: "S'inscrire",
    emailLabel: 'Email',
    cinLabel: 'CIN',
    submitBtn: "Demander un lien d'activation",
  },
};

const metadata = {
  en: {
    title: 'Activation Page',
    description: 'Activate vonting account',
    keywords: 'activate, account, register page',
  },
  fr: {
    title: 'Activation Page',
    description: 'Activate vonting account',
    keywords: 'inscription, inscrire, inscrire page',
  },
};

export const activatePageData = {
  lang: 'en',
  content,
  metadata,
  slug: ['activate'],
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
