import { getAllCandidates } from '../../controllers/candidates.controllers';

export default function addCandidatesRoutes(router) {
  router.route('/candidates').get(getAllCandidates);
}
