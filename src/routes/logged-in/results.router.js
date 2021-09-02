import { getResultsPageData } from '../../data/logged-in/results.cms';

export default function addResultsRoutes(router) {
  router.route('/results').get((req, res) => {
    const pageData = getResultsPageData({ user: req.user });
    res.render('connected/results', pageData);
  });
}
