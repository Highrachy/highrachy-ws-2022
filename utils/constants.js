import { FaHandshake, FaPeopleArrows } from 'react-icons/fa';
import { GrStatusCriticalSmall } from 'react-icons/gr';
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri';
import { BsQuestionCircleFill } from 'react-icons/bs';

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

export const APPLICANT_STAGE = {
  APPLIED: 'APPLIED',
  REVIEWED: 'REVIEWED',
  INTERVIEW_STAGE: 'INTERVIEW STAGE',
  OFFER_STAGE: 'OFFER STAGE',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
};

export const APPLICANT_STAGE_INFO = {
  [APPLICANT_STAGE.APPLIED]: {
    icon: <BsQuestionCircleFill />,
    color: 'secondary',
  },
  [APPLICANT_STAGE.REVIEWED]: {
    icon: <GrStatusCriticalSmall />,
    color: 'info',
  },
  [APPLICANT_STAGE.INTERVIEW_STAGE]: {
    icon: <FaPeopleArrows />,
    color: 'info',
  },
  [APPLICANT_STAGE.OFFER_STAGE]: {
    icon: <FaHandshake />,
    color: 'success',
  },
  [APPLICANT_STAGE.ACCEPTED]: {
    icon: <RiCheckboxCircleFill />,
    color: 'success',
  },
  [APPLICANT_STAGE.REJECTED]: {
    icon: <RiCloseCircleFill />,
    color: 'danger',
  },
};

export const FILTER_FIELDS = {
  TEXT: 'text',
  SELECT: 'select',
};

export const DATA_TYPE = {
  STRING: 'string',
  NUMBER: 'number',
  DATE: 'date',
  BOOLEAN: 'boolean',
};
