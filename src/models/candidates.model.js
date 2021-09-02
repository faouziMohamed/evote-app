import { model, Schema } from 'mongoose';

const candidatSchema = Schema(
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
    description: {
      en: {
        details: {
          type: String,
          default: '',
        },
        skills: [String],
      },
      fr: {
        details: {
          type: String,
          default: '',
        },
        skills: [String],
      },
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

const Candidates = model('Candidates', candidatSchema);
export default Candidates;
