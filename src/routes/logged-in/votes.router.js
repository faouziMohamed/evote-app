import { findAllCandidatesMin } from '../../controllers/candidates.controllers';

export default function addVoteRoute(router) {
  router.route('/vote').get(async (req, res) => {
    const candidates = await findAllCandidatesMin();
    res.render('connected/vote', {
      candidates,
      user: req.user,
      metadata: {
        title: 'Vote your favorite candidate',
        description: 'Vote your favorite candidate',
      },
    });
  });
}