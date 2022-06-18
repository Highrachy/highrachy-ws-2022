import store from 'store2';

const PREFIX = 'highrachy';
const TOKEN = `${PREFIX}-token`;
const MENU = `${PREFIX}-menu-state`;

// Token
export const storeToken = (token) => store(TOKEN, token);
export const getTokenFromStore = () => store(TOKEN);

// Menu
export const storeMenuState = (menu) => store(MENU, menu);
export const getMenuStateFromStore = () => store(MENU);

// Clear Storage
export const clearStorage = () => store(false);
