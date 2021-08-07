import { getCandidatesEvent } from './internal/candidates';
import {
  handleAutoTypingTexts,
  handleHeaderMenu,
  handleUserVote,
} from './internal/index';

(() => {
  handleHeaderMenu();
  handleUserVote();
  handleAutoTypingTexts();
  getCandidatesEvent();
})();
