import { addScriptTag, getCommonPageData } from './cms.utils';

const content = {
  en: {
    pageTile: 'Evote',
    signUpBtn: 'Sign up',
    loginBtn: 'Sign in',
    descr1: 'Easily lead, manage your candidates, voters, and elections.',
    descr2: 'Everything is automated just for you.',
    descr3: 'Online vote,',
    descr4: '["Crypted.", "Secured.", "Simple."]',
    descr5: 'Online vote Have never been easy',
    feature1: '100% Online',
    feature2: 'Secure by default',
    feature3: 'End to end encryption',
    feature4: 'Easy to use',
    feature5: 'Beautiful dashbord for results',
    feature6: 'Easy to integrate in your company',
    builtWithLove: 'Built with love',
    gettingStartedBtn: 'Getting started for free',
  },
  fr: {
    pageTile: 'Evote',
    signUpBtn: "S'inscrire",
    loginBtn: 'Se connecter',
    descr1: 'Gérer facilement vos candidats, votants, élections.',
    descr2: 'Tout est automatisé pour vous.',
    descr3: 'Vote en ligne,',
    descr4: '["Crypté.", "Sécurisé.", "Simple."]',
    descr5: "Les Votes en ligne n'ont jamais été aussi simple",
    feature1: '100% en ligne',
    feature2: 'Sécurisé par défaut',
    feature3: 'Chiffrement Bout-à-bout',
    feature4: 'Facile à utiliser',
    feature5: 'Magnifiques Tableau de bord pour les résultats',
    feature6: 'Facile à intégrer dans votre entreprise',
    builtWithLove: 'Conçu avec amour',
    gettingStartedBtn: 'Commencer à utiliser',
  },
};
const metadata = {
  en: {
    title: 'Home',
    description:
      'Welcome to evote app.Evote is a voting platform for Online vote secured, fast and ready to use for everyone. It is a free service that allows you to vote for the candidates...',
    keywords:
      'evote, online vote, vote, online, secure, fast, ready, use, everyone, openpgp, candidates',
  },
  fr: {
    title: 'Accueil',
    description:
      'Bienvenue sur evote. Evote est une plateforme de vote en ligne sécurisée, rapide et prête à l’emploi pour tout le monde. C’est un service gratuit qui vous permet de voter pour les candidats...',
    keywords:
      'evote, vote en ligne, vote, en ligne, sécurisé, rapide, prêt à l’emploi, utilisation, tout le monde, openpgp, candidats',
  },
};

const data = {
  layout: false,
  lang: 'en',
  slug: ['', 'home', 'index'],
  content,
  metadata,
  inject: {
    bodyScripts: [
      {
        addScriptTag,
        src: '/js/home_bundle.js',
        type: 'text/javascript',
        attributes: ['async', 'defer'],
      },
    ],
  },
};

export function getHomePageData(options = {}) {
  return (
    getCommonPageData({ ...data, ...options }) || {
      ...data,
      ...options,
    }
  );
}
