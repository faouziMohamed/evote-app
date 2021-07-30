/* eslint-disable import/extensions */
import { getCandidatesEvent } from './lib/candidates.js';
import {
  handleAutoTypingTexts,
  handleHeaderMenu,
  handleUserVote,
} from './lib/index.js';

(() => {
  handleHeaderMenu();
  handleUserVote();
  handleAutoTypingTexts();
  getCandidatesEvent();
})();
