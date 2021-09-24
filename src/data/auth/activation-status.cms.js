import { addScriptTag, getCommonPageData } from '../cms.utils';

export const content = {
  en: { pageTitle: 'Activaion status' },
  fr: { pageTitle: 'Statut d’activation' },
};

const metadata = {
  en: {
    title: 'Activation status',
    description: 'An error occurred while trying to activate your account.',
    keywords: 'activation status, error',
  },
  fr: {
    title: 'Statut d’activation',
    description:
      'Une erreur est survenue lors de l’activation de votre compte.',
    keywords: 'statut d’activation, erreur',
  },
};

export const activationStatusPageData = {
  lang: 'en',
  content,
  metadata,
  slug: ['activation-status'],
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

export function getActivationStatusPageDataPageData(options = {}) {
  return (
    getCommonPageData({ ...activationStatusPageData, ...options }) || {
      ...activationStatusPageData,
      ...options,
    }
  );
}
