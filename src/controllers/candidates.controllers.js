import {
  findAllCandidatesPopulate,
  findCandidateByIdPopulate,
  getCandidatePositionByID,
} from '../utils/candidate.utils';
import { findCandidateByCINPopulate } from '../utils/candidates/candidate-db.utils';

const getDetails = async (candidate) => ({
  uid: candidate.user._id,
  cid: candidate._id,
  name: `${candidate.user.name.first} ${candidate.user.name.last}`,
  email: candidate.user.email,
  lang: candidate.user.lang || 'en',
  voiceCount: candidate.voiceCount,
  description: {
    en: { details: '', skills: [] },
    fr: { details: '', skills: [] },
    depositionDate: candidate.depositionDate,
    position: (await getCandidatePositionByID(candidate._id)) + 1,
    ...candidate.description,
  },
});

export const getCandidateInformationsById = async (id) => {
  const candidate = await findCandidateByIdPopulate(id, 'lang name email');
  if (!candidate) throw new Error('Candidate not found');
  return getDetails(candidate);
};

export const getCandidateInformationsByCIN = async (cin) => {
  const candidate = await findCandidateByCINPopulate(cin, 'lang name email');
  if (!candidate) throw new Error('Candidate not found');
  return getDetails(candidate);
};

export const getCandidateInformations = async ({ cin, id }) =>
  (id && getCandidateInformationsById(id)) ||
  (cin && getCandidateInformationsByCIN(cin)) ||
  null;

export const getAllCandidatesInformations = async () => {
  const candidates = await findAllCandidatesPopulate('lang name email');
  return Promise.all(candidates.map(getDetails));
};
