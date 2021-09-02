import { getCommonPageData } from '../cms.utils';

export const content = {
  en: {
    pageTitle: 'Activate your account',
    usernameLabel: 'Username',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    birthdateLabel: 'Birthdate',
    cinLabel: 'CIN',
    resetBtn: 'Reset',
    submitBtn: 'Sign up',
  },
  fr: {
    pageTitle: 'Activer votre compte',
    usernameLabel: "Nom d'utilisateur",
    emailLabel: 'Email',
    passwordLabel: 'Mot de passe',
    birthdateLabel: 'Date de naissance',
    cinLabel: 'CIN',
    resetBtn: 'Réinitialiser',
    submitBtn: "S'inscrire",
  },
};

const metadata = {
  en: {
    title: 'Sign up Page',
    description: 'Activate vonting account',
    keywords: 'activate,account, register page',
  },
  fr: {
    title: "Page d'inscription",
    description: 'Activate vonting account',
    keywords: 'inscription,inscrire,inscrire page',
  },
};

export const registerPageData = {
  lang: 'en',
  content,
  metadata,
  slug: 'register',
};

export function getRegisterPageData(options = {}) {
  return (
    getCommonPageData({ ...registerPageData, ...options }) || {
      ...registerPageData,
      ...options,
    }
  );
}
