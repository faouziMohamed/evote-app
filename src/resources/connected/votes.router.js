import { findAllCandidatesMin } from '../candidates/candidates.controllers';

export default function addVoteRoute(router) {
  router.route('/vote').get(async (req, res) => {
    const candidates = await findAllCandidatesMin();
    res.render('connected/vote', {
      candidates,
      metadata: {
        title: 'Vote your favorite candidate',
        description: 'Vote your favorite candidate',
      },
    });
  });
}
