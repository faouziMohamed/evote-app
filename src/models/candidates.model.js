import mongoose from 'mongoose';

const candidatSchema = mongoose.Schema(
  {
    cin: {
      type: Number,
      required: true,
      unique: true,
    },
    voiceCount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    isWinner: {
      type: Boolean,
      required: true,
      default: false,
    },
    depositionOrder: {
      type: Number,
      min: 0,
      default: 0,
    },
    depositionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timeStamp: true,
  },
);

candidatSchema.virtual('details', {
  ref: 'User',
  foreignField: 'cin',
  localField: 'cin',
  justOne: true,
  match: { isCandidate: true },
});

export default mongoose.model('Candidates', candidatSchema);
