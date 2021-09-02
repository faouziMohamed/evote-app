import { addScriptTag, getCommonPageData, setCurrentPage } from '../cms.utils';

const content = {
  en: {
    pageTitle: 'See candidates details',
  },
  fr: {
    pageTitle: 'Voir les détails des candidats',
  },
};

const metadata = {
  en: {
    title: 'Candiates details',
    description: 'Candiates details',
    keywords: 'candidates, details, descriptions',
  },
  fr: {
    title: 'Détails des candidats',
    description: 'Détails des candidats',
    keywords: 'candidats, détails, descriptions',
  },
};

export const candiatesPageData = {
  lang: 'en',
  content,
  metadata,
  slug: 'candidates',
  toggle: { currentPage: 'candidates', setCurrentPage },
  inject: {
    bodyScripts: [
      {
        addScriptTag,
        src: '/js/candidates_bundle.js',
        type: 'text/javascript',
        attributes: ['async', 'defer'],
      },
    ],
  },
};

export function getCandidatesPageData(options = {}) {
  return (
    getCommonPageData({ ...candiatesPageData, ...options }) || {
      ...candiatesPageData,
      ...options,
    }
  );
}
