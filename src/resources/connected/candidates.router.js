import { getAllCandidates } from '../candidates/candidates.controllers';

export default function addCandidatesRoutes(router) {
  router.route('/candidates').get(getAllCandidates);
}
