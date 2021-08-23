import { model, Schema } from 'mongoose';

import { debug } from '../config/config';

const voteIDschema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timeStamp: true },
);

voteIDschema.index({ _id: 1, userID: 1 }, { unique: true });

const VoteIDs = model('VoteIDs', voteIDschema);
const addNewVoteID = async (userID) => {
  const voteID = new VoteIDs({ userID });
  await voteID.save();
  debug('New vote Id added', voteID._id);
  return voteID._id;
};

const insertOneOrThrowError = async (userID) => {
  const voteID = await VoteIDs.findOne({ userID })
    .populate('userID', {
      hasVoted: 1,
    })
    .lean()
    .exec();

  if (!voteID) return addNewVoteID(userID);
  if (!voteID.userID.hasVoted) return voteID._id;
  throw new Error(
    'You cannot vote a second time! If you retry again you will be banned',
  );
};

/**
 * @async
 * Generate and return a vote ID for the user ID passed in the parameter.
 * - if no voteID is associated with the user:
 *   - generate a new voteID and return it
 * - if a voteID is already associated with the user:
 *   - return that id if user has not yet voted
 *   - Throw an error if user has already voted
 * @param {string} userID
 * @returns {string} voteID
 * @throws {Error}
 */
export const getNewVoteID = async (userID) => insertOneOrThrowError(userID);
export const findVoteIDById = async (id) => VoteIDs.findById(id).lean().exec();
export default VoteIDs;
