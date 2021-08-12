import { Router } from 'express';

import { getServerArmoredPublicKey } from '../../models/entities/server';

// Handle routes from '/api/keys/
const router = new Router();
router.route('/public/server').get(async (req, res) => {
  try {
    const publicKey = await getServerArmoredPublicKey();
    res.status(200).json({ data: publicKey });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router
  .route(['/user/id/:id/', '/user/cin/:cin', '/user/name/:username'])
  .post(async (req, res) => {
    try {
      console.log(req.params);
      const publicKey = await getServerArmoredPublicKey();
      res.status(200).json({ data: publicKey });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
export default router;
