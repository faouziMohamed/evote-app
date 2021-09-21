import { Router } from 'express';

import {
  getAllCandidatesInformations,
  getCandidateInformations,
} from '../../controllers/candidates.controllers';
/* Router in the path:  /api/candidates/ */

const routerAPI = Router();
routerAPI.route(['/info/id/:id', '/info/cin/:cin']).get(async (req, res) => {
  try {
    const { id, cin } = req.params;
    res.status(200).json({
      data: await getCandidateInformations({ id, cin }),
    });
  } catch (error) {
    res.status(400).json({
      error: `Error getting candidate informations : ==> ${error}`,
    });
  }
});

routerAPI.route('/info/').get(async (req, res) => {
  try {
    res.status(200).json({
      data: await getAllCandidatesInformations(),
    });
  } catch (error) {
    res.status(500).json({
      error: `Error getting All candidate informations : ==> ${error}`,
    });
  }
});

export default routerAPI;
