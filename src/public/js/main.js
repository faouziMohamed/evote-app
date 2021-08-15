import {
  getCandidatesEvent,
  handleUserVote,
  useAutoTypingTexts,
  useHeader,
} from './lib/index';

(() => {
  useHeader();
  handleUserVote();
  useAutoTypingTexts();
  getCandidatesEvent();
})();
