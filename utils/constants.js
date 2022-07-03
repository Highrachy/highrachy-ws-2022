export const COLOR_STYLE = [
  'none',
  'primary',
  'secondary',
  'success',
  'danger',
  'error',
  'warning',
  'info',
  'light',
  'dark',
];

export const TENANT_STATUS = {
  WAITING_LIST: 'WAITING LIST',
  APPLIED: 'APPLIED',
  REJECTED: 'REJECTED',
  CONFIRMED: 'CONFIRMED',
  LEAVING_SOON: 'LEAVING SOON',
  MOVED_OUT: 'MOVED OUT',
};

export const TENANT_STATUS_COLOR = {
  [TENANT_STATUS.WAITING_LIST]: 'secondary',
  [TENANT_STATUS.APPLIED]: 'info',
  [TENANT_STATUS.CONFIRMED]: 'success',
  [TENANT_STATUS.LEAVING_SOON]: 'warning',
  [TENANT_STATUS.MOVED_OUT]: 'danger',
  [TENANT_STATUS.REJECTED]: 'danger',
};
