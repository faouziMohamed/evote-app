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
