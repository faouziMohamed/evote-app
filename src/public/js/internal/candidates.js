function newElement(name, attributes = {}, childs = []) {
  const node = document.createElement(name);
  const keys = Object.getOwnPropertyNames(attributes);
  keys.forEach((key) => {
    node.setAttribute(`${key}`, attributes[`${key}`]);
  });

  node.append(...childs);
  return node;
}

export const getCandidatesEvent = () => {
  const ul = document.querySelector('.list-candidates');
  if (!ul) return;
  const getFullName = (details) => `${details.name.first} ${details.name.last}`;
  document.querySelector('.getCandidate').addEventListener('click', () => {
    fetch('/api/candidates/all', { method: 'GET', redirect: 'follow' })
      .then((res) => {
        if (res.redirected) window.location.reload();
        return res.json();
      })
      .then((res) => {
        ul.innerHTML = '';
        const { data } = res;
        data.forEach((item) => {
          const { details } = item;
          const path = `/candidate/${details.cin}`;
          const link = newElement('a', { href: path }, [getFullName(details)]);
          const li = newElement('li', {}, [link]);
          ul.append(li);
        });
        return true;
      })
      .catch(() => {});
  });
};
