import {
  controleUserVoteSelection,
  getCandidatesEvent,
  useAutoTypingTexts,
  useHeader,
} from './lib/index';

(() => {
  useHeader();
  controleUserVoteSelection();
  useAutoTypingTexts();
  getCandidatesEvent();
})();
