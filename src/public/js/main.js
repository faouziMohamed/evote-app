import {
  getCandidatesEvent,
  handleAutoTypingTexts,
  handleHeaderMenu,
  handleUserVote,
} from './lib/index';

(async () => {
  handleHeaderMenu();
  handleUserVote();
  handleAutoTypingTexts();
  getCandidatesEvent();
})();
