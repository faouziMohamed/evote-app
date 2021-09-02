import { getCandidatesPageData } from '../../data/logged-in/candidates.cms';

export default function addCandidatesRoutes(router) {
  router.route('/candidates').get((req, res) => {
    const pageData = getCandidatesPageData({ user: req.user });
    res.render('connected/candidates', pageData);
  });
}
