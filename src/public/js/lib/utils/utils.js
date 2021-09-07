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

export const getNameRegex = () => /^[a-zA-Z]{1,}$/;

export const strip = (str) => str.replace(/\s+/g, ' ');
export const stripAll = (str) => str.replace(/\s+/g, '');
export const stripStartEnd = (str) => str.replace(/^\s+|\s+$/g, '');
