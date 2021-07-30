/* eslint-disable import/extensions */
import {
  handleAutoTypingTexts,
  handleHeaderMenu,
  handleUserVote,
} from './lib/index.js';

(() => {
  handleHeaderMenu();
  handleUserVote();
  handleAutoTypingTexts();
})();
