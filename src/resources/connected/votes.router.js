import { Router } from 'express';

import { findAllCandidatesMin } from '../candidates/candidates.controllers';

const router = new Router();

router.route('/').get(async (req, res) => {
  const candidates = await findAllCandidatesMin();
  res.render('connected/vote', {
    candidates,
    metadata: {
      title: 'Vote your favorite candidate',
      description: 'Vote your favorite candidate',
    },
  });
});

export default router;
