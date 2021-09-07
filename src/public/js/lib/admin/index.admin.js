import { useAddUserModal } from './userAdd';
import { useUsersTable } from './usersList';

export const useAdminPrivileges = () => {
  useUsersTable();
  useAddUserModal();
};
