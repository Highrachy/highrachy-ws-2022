import store from 'store2';
import { USER_ROLE } from './constants';

const PREFIX = 'highrachy';
const TOKEN = `${PREFIX}-token`;
const MENU = `${PREFIX}-menu-state`;
const ROLE = `${PREFIX}-role-state`;

// Token
export const storeToken = (token) => store(TOKEN, token);
export const getTokenFromStore = () => store(TOKEN);

// Menu
export const storeMenuState = (menu) => store(MENU, menu);
export const getMenuStateFromStore = () => store(MENU);

// Clear Storage
export const clearStorage = () => store(false);

export const getRoleStateFromStore = () => {
  const role = store(ROLE);
  if (!role) {
    store(ROLE, USER_ROLE.NORMAL);
  }
  return USER_ROLE.ADMIN;
};
