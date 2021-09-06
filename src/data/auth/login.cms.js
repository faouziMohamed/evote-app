import { getCommonPageData } from '../cms.utils';

export const content = {
  en: {
    pageTitle: 'Login to your account',
    usernameLabel: 'Username',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    loggedIn: 'You are already logged in!',
    forgotPassword: 'Forgot password?',
    submitBtn: 'Connect',
    resetBtn: 'Reset',
  },
  fr: {
    pageTitle: 'Connectez-vous à votre compte',
    usernameLabel: "Nom d'utilisateur",
    emailLabel: 'Email',
    passwordLabel: 'Mot de passe',
    loggedIn: 'Vous êtes déjà connecté!',
    forgotPassword: 'Mot de passe oublié?',
    submitBtn: 'Connecter',
    resetBtn: 'Réinitialiser',
  },
};

const metadata = {
  en: {
    title: 'Login Page',
    description: 'Activate vonting account',
    keywords: 'Login, login page',
  },
  fr: {
    title: 'Page de connexion',
    description: 'Activer votre compte',
    keywords: 'Connexion, page de connexion',
  },
};

export const loginPageData = {
  lang: 'en',
  content,
  metadata,
  slug: ['login'],
};

export function getLoginPageData(options = {}) {
  return (
    getCommonPageData({ ...loginPageData, ...options }) || {
      ...loginPageData,
      ...options,
    }
  );
}
