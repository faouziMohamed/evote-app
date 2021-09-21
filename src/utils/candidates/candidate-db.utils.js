import Candidate from '../../models/candidates.model';

export const createCandidate = async (user) =>
  Candidate.create({ user: user._id, cin: user.cin });

export const deleteCandidate = async (candidateID) =>
  Candidate.findOneAndRemove({ _id: candidateID }).exec();

export const deleteCandidateByUserId = async (userID) =>
  Candidate.findOneAndRemove({ user: userID }).exec();

export const deleteCandidateByCin = async (cin) =>
  Candidate.findOneAndRemove({ cin }).exec();

export const findCandidateById = async (id, filter = '') =>
  Candidate.findById(id, filter).select('-__v').lean().exec();

export const findCandidateByIdPopulate = async (id, populateFilter = '') =>
  Candidate.findById(id)
    .populate({ path: 'user', select: populateFilter })
    .select('-__v')
    .lean()
    .exec();

export const findCandidateByCIN = async (cin, filter = '') =>
  Candidate.findOne({ cin }, filter).select('-__v').lean().exec();

export const findCandidateByCINPopulate = async (cin, populateFilter = '') =>
  Candidate.findOne({ cin })
    .populate({ path: 'user', select: populateFilter })
    .select('-__v')
    .lean()
    .exec();

export const findAllCandidates = async () =>
  Candidate.find().select('-__v').lean().exec();

export const findAllCandidatesPopulate = async (populateFilter = '') =>
  Candidate.find({})
    .populate({ path: 'user', select: populateFilter })
    .select('-__v')
    .lean()
    .exec();

export const incrementVoiceCount = async (id) =>
  Candidate.findByIdAndDelete(id, { $inc: { voiceCount: 1 } }, { new: true })
    .lean()
    .exec();

export const getCandidatePositionByID = async (id) => {
  const candidates = await Candidate.find()
    .populate({ path: 'user' })
    .sort({ voiceCount: -1 })
    .exec();
  return candidates.findIndex((c) => String(c._id) === String(id));
};
