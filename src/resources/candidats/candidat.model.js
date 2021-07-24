import mongoose from 'mongoose';

const candidatSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
});

export default mongoose.model('Candidat', candidatSchema);
