import { addScriptTag, getCommonPageData, setCurrentPage } from '../cms.utils';

const content = {
  en: {
    pageTitle: 'Vote results',
  },
  fr: {
    pageTitle: 'Résultats de vote',
  },
};

const metadata = {
  en: {
    title: 'Vote results',
    description: 'Results of votes',
    keywords: 'vote, results, vote results',
  },
  fr: {
    title: 'Résultats de vote',
    description: 'Résultats des votes',
    keywords: 'vote, résultats, résultats de vote',
  },
};

export const resultsPageData = {
  lang: 'en',
  content,
  metadata,
  slug: ['results'],
  toggle: { currentPage: 'results', setCurrentPage },
  inject: {
    headerScripts: [
      {
        addScriptTag,
        src: 'https://cdn.jsdelivr.net/npm/apexcharts',
        type: 'text/javascript',
        attributes: ['async', 'defer'],
      },
    ],
    bodyScripts: [
      {
        addScriptTag,
        src: '/js/results_bundle.js',
        type: 'text/javascript',
        attributes: ['async', 'defer'],
      },
    ],
  },
};

export function getResultsPageData(options = {}) {
  return (
    getCommonPageData({ ...resultsPageData, ...options }) || {
      ...resultsPageData,
      ...options,
    }
  );
}
