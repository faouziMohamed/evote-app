import { addScriptTag, getCommonPageData, setCurrentPage } from '../cms.utils';

const content = {
  en: {
    pageTitle: 'Time to make a choice',
  },
  fr: {
    pageTitle: 'Temps à choisir',
  },
};

const metadata = {
  en: {
    title: 'Vote your favorite candidate',
    description: 'Vote your favorite candidate',
    keywords: 'vote, choose, make choice',
  },
  fr: {
    title: 'Votez pour votre candidat préféré',
    description: 'Votez pour votre candidat préféré',
    keywords: 'vote, choisir, choisir votre candidat',
  },
};

export const votePageData = {
  lang: 'en',
  content,
  metadata,
  slug: ['vote'],
  toggle: { currentPage: 'vote', setCurrentPage },
  inject: {
    bodyScripts: [
      {
        addScriptTag,
        src: '/js/votes_bundle.js',
        type: 'text/javascript',
        attributes: ['async', 'defer'],
      },
    ],
  },
};

export function getVotePageData(options = {}) {
  return (
    getCommonPageData({ ...votePageData, ...options }) || {
      ...votePageData,
      ...options,
    }
  );
}
