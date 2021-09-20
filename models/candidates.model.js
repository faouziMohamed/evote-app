"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var candidatSchema = (0, _mongoose.Schema)({
  cin: {
    type: Number,
    required: true,
    unique: true
  },
  voiceCount: {
    type: Number,
    required: true,
    min: 0,
    "default": 0
  },
  isWinner: {
    type: Boolean,
    required: true,
    "default": false
  },
  depositionOrder: {
    type: Number,
    min: 0,
    "default": 0
  },
  depositionDate: {
    type: Date,
    "default": Date.now
  },
  description: {
    en: {
      details: {
        type: String,
        "default": ''
      },
      skills: [String]
    },
    fr: {
      details: {
        type: String,
        "default": ''
      },
      skills: [String]
    }
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
  timeStamp: true
});
candidatSchema.virtual('details', {
  ref: 'User',
  foreignField: 'cin',
  localField: 'cin',
  justOne: true,
  match: {
    isCandidate: true
  }
});
var Candidates = (0, _mongoose.model)('Candidates', candidatSchema);
var _default = Candidates;
exports["default"] = _default;