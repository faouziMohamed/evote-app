/* eslint-disable import/extensions */
import { handleAutoTypingTexts } from './autotext.js';
import { handleHeaderMenu, handleUserVote } from './lib.js';

(() => {
  handleHeaderMenu();
  handleUserVote();
  handleAutoTypingTexts();
})();
