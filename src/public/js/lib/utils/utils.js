export function getFullName(name = { first: '', last: '' }) {
  return `${name.first} ${name.last}`;
}

export const getDataFromCookie = (cookieName) =>
  document.cookie
    .split('; ')
    .find((token) => token.startsWith(cookieName))
    .split('=')[1];

export const decodeCookie = (cookieName) => decodeURIComponent(cookieName);
export const redirectTo = (path) => {
  window.location.href = path;
};

export const reloadPage = () => window.location.reload();

export async function postData({ url = '', data = {}, stringify = true }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: stringify ? JSON.stringify(data) : data,
  });
  return response.json();
}

export async function getData({ url = '' }) {
  const response = await fetch(url);
  return response.json();
}

export function newElement(name, attributes = {}, childs = []) {
  const node = document.createElement(name);
  const keys = Object.getOwnPropertyNames(attributes);
  keys.forEach((key) => {
    node.setAttribute(`${key}`, attributes[`${key}`]);
  });

  node.append(...childs);
  return node;
}

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const capitalizeAll = (str) => str.replace(/\w\S*/g, capitalize);

export const getEmailRegex = () =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getUsernameRegex = () => /^[a-z][a-z0-9_]{3,}$/;

export const getNameRegex = () => /^[a-zA-Z](\.?\s?\w+)+$/;

export const getPasswordRegex = () =>
  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%^$!%*?&])[\w\W@#%^$!%*?&]{7,}/;

export const strip = (str) => String(str).replace(/\s+/g, ' ');
export const stripAll = (str) => String(str).replace(/\s+/g, '');
export const removeExtraSpaces = (str) => strip(str).trim();

export const isString = (str) => typeof str === 'string';
export const isAnArray = (arr) => Array.isArray(arr);

export const isArrayOfStrings = (arr) =>
  isAnArray(arr) && arr.every((item) => isString(item));

export const isEmpty = (str) => !str || !strip(str).trim();
export const isNotEmpty = (str) => !isEmpty(str);

export const isValidEmail = (str) =>
  getEmailRegex().test(removeExtraSpaces(str));

export const isValidUsername = (str) =>
  getUsernameRegex().test(removeExtraSpaces(str));

export const isValidName = (str) => getNameRegex().test(removeExtraSpaces(str));

export const isValidPassword = (str) =>
  getPasswordRegex().test(removeExtraSpaces(str));
