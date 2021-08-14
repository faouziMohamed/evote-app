import { Router } from 'express';

import {
  constructEntity,
  getEntityArmoredPublicKey,
} from '../../controllers/entities/index.entities';
import {
  getKeys,
  saveUserKeys,
} from '../../controllers/entities/users.entities';
import { getAuthErrorMessage } from '../../data/auth.cms';
import { getErrorMessage } from '../../data/common.cms';

// Handle routes from '/api/keys/{server,countcenter|co, valcenter|vc}
const router = new Router();
async function getEntityPublicKey(req, res) {
  try {
    const { entityName } = req.params;
    const serverData = constructEntity(entityName.toLowerCase());
    const publicKey = await getEntityArmoredPublicKey(serverData);
    res.status(200).json({ data: publicKey });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

router
  .route('/public/:entityName')
  .get(getEntityPublicKey)
  .post(getEntityPublicKey);

// handle the case that no value was provided
router.route(['/user/id/', '/user/cin/', '/user/name/']).post((req, res) => {
  res.status(400).json({ error: getAuthErrorMessage('noValuePassed') });
});

// Handle routes from '/api/keys/user/{id/:id, name/:name, cin/:cin}'
/**
 * Save user GPG keys to the database, require passed data to be encrypted
 * with the server gpg public key
 */
router
  .route(['/user/id/:id', '/user/cin/:cin', '/user/name/:username'])
  .post(async (req, res) => {
    try {
      saveUserKeys(req, res);
    } catch (err) {
      res.status(400).json({ error: getErrorMessage('reqErrors') });
    }
  });

/**
 * When user ask to the server to give him back it public and private key and
 * the passphrase, the user must be authenticated and send with the request a
 * AES key to encrypt data the response
 */
router
  .route(['/all/user/id/:id', '/all/user/name/:name', '/all/user/cin/:cin'])
  .post(async (req, res) => {
    try {
      await getKeys(req, res);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
router.route('/');
export default router;
