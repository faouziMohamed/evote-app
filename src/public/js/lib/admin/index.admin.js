import UserAdd from './user-add';

export const useAdminPrivileges = () => {
  try {
    new UserAdd().render();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('AdminUiError : ', error.message);
  }
};
