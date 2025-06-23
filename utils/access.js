import { USER_ROLE } from './constants';

const ADMIN_USERS = [
  'haruna',
  'nnamdi',
  'david',
  'admin',
  'support',
  'oluwatodimu.adeleke',
];
const CONTENT_USERS = ['adeola.adedokun'];

export const getUserRole = (username) => {
  if (ADMIN_USERS.includes(username)) {
    return USER_ROLE.ADMIN;
  } else if (CONTENT_USERS.includes(username)) {
    return USER_ROLE.CONTENT;
  } else {
    return USER_ROLE.NORMAL;
  }
};
