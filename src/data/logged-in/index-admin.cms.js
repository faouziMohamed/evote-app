import { addScriptTag, getCommonPageData, setCurrentPage } from '../cms.utils';

const content = {
  en: {
    pageTitle: 'Users Management',
    pageDescription:
      'All aspects related to the app users can be managed from this page',
    createUserBtn: 'Create User',
    allUsersBtn: 'All Users',
    normalUsersBtn: 'Normal Users',
    adminUsersBtn: 'Admin Users',
    candidatesBtn: 'Candidates',
    editUserBtn: 'Edit User',
    deleteUserBtn: 'Delete User',
    LockAccountBtn: 'Lock account',
    saveActionsBtn: 'Save Actions',
    usernameCol: 'Username',
    nameCol: 'Name',
    emailCol: 'Email',
    roleCol: 'Role',
    activatonCol: 'Activation',
    accountTypeCol: 'Account Type',
    voteStatusCol: 'Vote Status',
    cinCol: 'CIN',
  },
};

const metadata = {
  en: {
    title: 'Users Management',
    description:
      'Admin page to manage different type of users and perform ' +
      'some highlevel operations',
    keywords: 'candidates, details, descriptions',
  },
};

export const indexAdminPageData = {
  lang: 'en',
  content,
  metadata,
  slug: ['admin'],
  toggle: { currentPage: 'admin', setCurrentPage },
  inject: {
    bodyScripts: [
      {
        addScriptTag,
        src: '/js/admin_bundle.js',
        type: 'text/javascript',
        attributes: ['async', 'defer'],
      },
    ],
  },
};

export function getIndexAdminPageData(options = {}) {
  return (
    getCommonPageData({ ...indexAdminPageData, ...options }) || {
      ...indexAdminPageData,
      ...options,
    }
  );
}
