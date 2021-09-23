"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createCandidate", {
  enumerable: true,
  get: function get() {
    return _candidateDb.createCandidate;
  }
});
Object.defineProperty(exports, "deleteCandidate", {
  enumerable: true,
  get: function get() {
    return _candidateDb.deleteCandidate;
  }
});
Object.defineProperty(exports, "deleteCandidateByCin", {
  enumerable: true,
  get: function get() {
    return _candidateDb.deleteCandidateByCin;
  }
});
Object.defineProperty(exports, "deleteCandidateByUserId", {
  enumerable: true,
  get: function get() {
    return _candidateDb.deleteCandidateByUserId;
  }
});
Object.defineProperty(exports, "findAllCandidates", {
  enumerable: true,
  get: function get() {
    return _candidateDb.findAllCandidates;
  }
});
Object.defineProperty(exports, "findAllCandidatesPopulate", {
  enumerable: true,
  get: function get() {
    return _candidateDb.findAllCandidatesPopulate;
  }
});
Object.defineProperty(exports, "findCandidateByCIN", {
  enumerable: true,
  get: function get() {
    return _candidateDb.findCandidateByCIN;
  }
});
Object.defineProperty(exports, "findCandidateByCINPopulate", {
  enumerable: true,
  get: function get() {
    return _candidateDb.findCandidateByCINPopulate;
  }
});
Object.defineProperty(exports, "findCandidateById", {
  enumerable: true,
  get: function get() {
    return _candidateDb.findCandidateById;
  }
});
Object.defineProperty(exports, "findCandidateByIdPopulate", {
  enumerable: true,
  get: function get() {
    return _candidateDb.findCandidateByIdPopulate;
  }
});
Object.defineProperty(exports, "getCandidatePositionByID", {
  enumerable: true,
  get: function get() {
    return _candidateDb.getCandidatePositionByID;
  }
});
Object.defineProperty(exports, "incrementVoiceCount", {
  enumerable: true,
  get: function get() {
    return _candidateDb.incrementVoiceCount;
  }
});

var _candidateDb = require("./db/candidate-db.utils");