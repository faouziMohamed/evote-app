import CandidatesModel from '../models/candidates.model';

export const findAllCandidates = async () =>
  CandidatesModel.find({}, '-_id')
    .populate({ path: 'details', select: 'cin name -_id' })
    .select('-__v')
    .lean()
    .exec();

export const findCandidateByCIN = async (cin) =>
  CandidatesModel.findOne({ cin }, '-_id').lean().exec();

export const incrementVoiceCount = async (cin) =>
  CandidatesModel.findOneAndUpdate(
    { cin },
    { $inc: { voiceCount: 1 } },
    { new: true },
  )
    .lean()
    .exec();

export const findAllCandidatesMin = async () => {
  const candidates = await findAllCandidates();
  return candidates.map((candidate) => ({
    ...candidate.details.name,
    cin: candidate.cin,
  }));
};

export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await findAllCandidates();
    res.status(200).json({ data: candidates });
  } catch (err) {
    res.status(500).json({
      message: 'Error getting candidates',
    });
  }
};
