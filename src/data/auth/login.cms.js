import { getCommonPageData } from '../cms.utils';

export const content = {
  en: {
    pageTitle: 'Login to your account',
    accountNotActivated: 'Account is not activated yet?',
    activateAccount: 'Activate your account',
    newToUs: 'New to Evote App?',
    signUp: 'Sign up',
    usernameLabel: 'Username',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    loggedIn: 'You are already logged in!',
    forgotPassword: 'Forgot password?',
    submitBtn: 'Connect',
  },
  fr: {
    pageTitle: 'Connectez-vous à votre compte',
    accountNotActivated: 'Votre compte n’est pas encore activé?',
    activateAccount: 'Activez votre compte',
    newToUs: 'Nouveau sur Evote App?',
    signUp: 'S’inscrire',
    usernameLabel: 'Nom d’utilisateur',
    emailLabel: 'Email',
    passwordLabel: 'Mot de passe',
    loggedIn: 'Vous êtes déjà connecté!',
    forgotPassword: 'Mot de passe oublié?',
    submitBtn: 'Connecter',
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
