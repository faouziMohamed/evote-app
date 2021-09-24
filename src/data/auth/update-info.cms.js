import { addScriptTag, getCommonPageData } from '../cms.utils';

export const content = {
  en: {
    pageTitle: 'Update your Informations',
    updateMsg:
      'Now you can update your informations before finalizing your activation.',
    firstNameLabel: 'First name',
    lastNameLabel: 'Last name',
    passwordLabel: 'Password',
    usernameLabel: 'Username',
    submitBtn: 'Finalize Activation',
  },
  fr: {
    pageTitle: 'Mettre à jour vos informations',
    updateMsg:
      'Maintenant vous pouvez mettre à jour vos informations avant de finaliser votre activation.',
    firstNameLabel: 'Prénom',
    lastNameLabel: 'Nom',
    passwordLabel: 'Mot de passe',
    usernameLabel: 'Nom d’utilisateur',
    submitBtn: 'Finaliser l’activation',
  },
};

const metadata = {
  en: {
    title: 'Update information',
    description: 'Update your informations before finalizing your activation.',
    keywords: 'update, informations, activation',
  },
  fr: {
    title: 'Mettre à jour les informations',
    description:
      'Mettre à jour vos informations avant de finaliser votre activation.',
    keywords: 'mettre à jour, informations, activation',
  },
};

export const updateInfoPageData = {
  lang: 'en',
  content,
  metadata,
  slug: ['update-info'],
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

export function getUpdateInfoPageData(options = {}) {
  return (
    getCommonPageData({ ...updateInfoPageData, ...options }) || {
      ...updateInfoPageData,
      ...options,
    }
  );
}
