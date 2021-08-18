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
