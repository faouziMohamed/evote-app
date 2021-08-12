import { Router } from 'express';

import keysModel from '../../models/keys.model';

const router = new Router();
const protectRoute = (req, res, next) => {
  const hasPersmision = req.isServer || (req.user && req.user.isAdmin());
  if (hasPersmision) {
    res.status(403).send('Forbidden');
    return;
  }
  next();
};
router.route('/api/server/pubKey').get(protectRoute, (req, res) => {
  const serverKey = keysModel.getServerPubKey();
  res.status(200).json({ data: serverKey });
});
