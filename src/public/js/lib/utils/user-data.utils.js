export const addUsersToCache = (usersData = [{}]) => {
  const dataStringified = JSON.stringify(usersData);
  localStorage.setItem('users', dataStringified);
};

export const getUsersFromCache = () => {
  const usersData = localStorage.getItem('users') || [{}];
  return JSON.parse(usersData);
};

export const addOneUserToCache = (user = {}) => {
  const usersData = getUsersFromCache() || [{}];
  usersData.push(user);
  addUsersToCache(usersData);
};

export async function getUsersData() {
  const users = await fetch(`/api/users/all?displayable=true`);
  const { data } = await users.json();
  return data;
}
