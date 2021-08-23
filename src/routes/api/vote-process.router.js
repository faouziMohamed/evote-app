import { Router } from 'express';
import { isEqual } from 'lodash';

import { incrementVoiceCount } from '../../controllers/candidates.controllers';
import { getVoteCenterEntities } from '../../controllers/entities/index.entities';
import {
  generateAndSaveVoteID,
  getEncryptedBodyMessage,
  getEncryptor,
  handleCoUserVerification,
  msgDecryptor,
  voteProcessEvent,
} from '../../controllers/vote-process.controllers';

/* Base route /api/vote/ */
const votesRouter = Router();
votesRouter.route('/voteid').post(async (req, res) => {
  try {
    const voteIdEncrypted = await generateAndSaveVoteID(req);
    res.status(200).json({ data: voteIdEncrypted });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

/**
 * Submitted request is double encryptd:
 * 1. The request body is sent in the name "vote".
 *    - It is encrypted with the public key of the server.
 *    - It's decrypted content is encrypted with the entity (count center or
 *      validation center) public key.
 *
 * 2. When server content is decrypted, The result is another gpg encrypted message.
 *    - The message encrypted contain an object containing
 *      { voteID, encrypptedBallot }
 *    - voteID is the vote id of the vote associated with the user who voted
 *    - encryptedBallot is the actual encrypted ballot encrypted with the
 *      valcenter public key
 */

votesRouter.route('/submit/:entity').post(async (req, res) => {
  try {
    const { entity } = req.params;
    const expectedEntities = getVoteCenterEntities();
    if (entity && !expectedEntities.includes(entity.toLowerCase()))
      throw new Error(
        `Invalid entity, accepted entities are: ${expectedEntities.join(', ')}`,
      );

    const bodyMessage = await getEncryptedBodyMessage(req);
    let responseMessage;
    const { entityGPGEncryptor: gpgEncryptor } = await getEncryptor(entity);
    const userVote = await msgDecryptor(gpgEncryptor, bodyMessage);
    if (['countcenter', 'co'].includes(entity.toLowerCase())) {
      await handleCoUserVerification(userVote, req);
      responseMessage = 'Vote in progress, user verified';
    } else if (['validationcenter', 'vc'].includes(entity.toLowerCase())) {
      if (!isEqual(userVote, req.session.userVote)) {
        throw new Error('Invalid vote');
      }
      const ballot = await msgDecryptor(gpgEncryptor, userVote.encryptedBallot);
      const { candidateID } = ballot;
      const candidate = await incrementVoiceCount(candidateID);
      if (!candidate) throw new Error('Invalid candidate');

      voteProcessEvent.emit(`vote-finished-${req.user.username}`, req);
      responseMessage = 'Vote submitted successfully';
    }

    res.status(201).json({ data: responseMessage });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

export default votesRouter;
