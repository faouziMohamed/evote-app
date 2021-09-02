import CandidatesModel from '../models/candidates.model';

export const findCandidateById = async (id, filter = '') =>
  CandidatesModel.findById(id, filter).select('-__v').lean().exec();

export const findCandidateByIdPopulate = async (id, populateFilter = '') =>
  CandidatesModel.findById(id)
    .populate({ path: 'details', select: populateFilter })
    .select('-__v')
    .lean()
    .exec();

export const findCandidateByCIN = async (cin, filter = '') =>
  CandidatesModel.findOne({ cin }, filter).select('-__v').lean().exec();

export const findCandidateByCINPopulate = async (cin, populateFilter = '') =>
  CandidatesModel.findOne({ cin })
    .populate({ path: 'details', select: populateFilter })
    .select('-__v')
    .lean()
    .exec();

export const findAllCandidates = async () =>
  CandidatesModel.find().select('-__v').lean().exec();

export const findAllCandidatesPopulate = async (populateFilter = '') =>
  CandidatesModel.find({})
    .populate({ path: 'details', select: populateFilter })
    .select('-__v')
    .lean()
    .exec();

export const incrementVoiceCount = async (cin) =>
  CandidatesModel.findOneAndUpdate(
    { cin },
    { $inc: { voiceCount: 1 } },
    { new: true },
  )
    .lean()
    .exec();

export const getCandidatePositionByID = async (id) => {
  const candidates = await CandidatesModel.find()
    .populate({ path: 'details' })
    .sort({ voiceCount: -1 })
    .exec();
  return candidates.findIndex((c) => String(c._id) === String(id));
};

const getDetails = async (candidate) => ({
  uid: candidate.details._id,
  cid: candidate._id,
  name: `${candidate.details.name.first} ${candidate.details.name.last}`,
  email: candidate.details.email,
  lang: candidate.details.lang || 'en',
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
