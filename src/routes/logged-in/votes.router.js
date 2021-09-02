import { getVotePageData } from '../../data/logged-in/vote.cms';

export default function addVoteRoute(router) {
  router.route('/vote').get(async (req, res) => {
    const pageData = getVotePageData({ user: req.user });
    res.render('connected/vote', pageData);
  });
}
