import { isEmpty, removeExtraSpaces } from '../utils/utils';

export default class SearchBar {
  static parent = document.querySelector('#user-research');
  static searchBar = SearchBar.parent.querySelector('#search-input');
  static searchBtn = SearchBar.parent.querySelector('#search-btn');

  static hide() {
    SearchBar.parent.classList.add('hidden');
  }

  static show() {
    SearchBar.parent.classList.remove('hidden');
  }

  static clear() {
    SearchBar.searchBar.value = '';
  }

  static isEmpty() {
    return isEmpty(SearchBar.searchBar.value);
  }

  static setValue(value) {
    SearchBar.searchBar.value = removeExtraSpaces(value);
  }

  static getValue() {
    return removeExtraSpaces(SearchBar.searchBar.value);
  }

  static focus() {
    SearchBar.searchBar.focus();
  }

  static blur() {
    SearchBar.searchBar.blur();
  }

  static getInput() {
    return SearchBar.searchBar;
  }

  static getSearchBtn() {
    return SearchBar.searchBtn;
  }
}
