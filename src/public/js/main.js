/* eslint-disable import/extensions */
import { getDataFromCookie, redirectTo } from './lib/lib.js';

const ul = document.querySelector('.list-candidates');
document.querySelector('.getCandidate').addEventListener('click', () => {
  let jwtAccesToken;
  try {
    jwtAccesToken = getDataFromCookie('jwtAccesToken');
  } catch (e) {
    redirectTo('/login');
  }

  fetch('/api/candidates/all', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${jwtAccesToken}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      ul.innerHTML = '';
      const { data } = res;
      data.forEach((item) => {
        const { candidate } = item;
        const li = document.createElement('li');
        const name = { ...candidate.name };
        const path = `/candidate/${candidate.cin}`;
        li.innerHTML = `<a href="${path}">${name.first} ${name.last}</a>`;
        ul.appendChild(li);
      });
      return true;
    })
    .catch(() => {});
});
