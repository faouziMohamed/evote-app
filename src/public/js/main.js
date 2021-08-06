/* eslint-disable import/extensions */
import { getCandidatesEvent } from './internal/candidates.js';
import {
  handleAutoTypingTexts,
  handleHeaderMenu,
  handleUserVote,
} from './internal/index.js';

(() => {
  handleHeaderMenu();
  handleUserVote();
  handleAutoTypingTexts();
  getCandidatesEvent();
})();
