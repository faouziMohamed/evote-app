import { addScriptTag, getCommonPageData } from '../cms.utils';

export const content = {
  en: {
    pageTitle: "Making sure you're secure",
    loadingMessage: 'Generating keys...',
    greeting: 'Hello',
    continue: 'Continue',
  },
  fr: {
    pageTitle: "Assurez-vous d'être sécurisé",
    loadingMessage: 'Génération des clés...',
    greeting: 'Bonjour',
    continue: 'Continuer',
  },
};

const metadata = {
  en: {
    title: 'Security upgrading',
    description: 'Activate vonting account',
    keywords: 'key generating, gpg, aes, rsa, asymetric, key',
  },
  fr: {
    title: 'Activer votre compte',
    description: 'Activer votre compte',
    keywords: 'activer, compte, gpg, aes, rsa, asymetric, key',
  },
};

export const newPairPageData = {
  lang: 'en',
  content,
  metadata,
  slug: ['new-pair'],
  inject: {
    bodyScripts: [
      {
        addScriptTag,
        src: '/js/newPair_bundle.js',
        type: 'text/javascript',
        attributes: ['async', 'defer'],
      },
    ],
  },
};

export function getNewPairPageData(options = {}) {
  return (
    getCommonPageData({ ...newPairPageData, ...options }) || {
      ...newPairPageData,
      ...options,
    }
  );
}
