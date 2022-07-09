import {
  APPLICANT_STAGE,
  DATA_TYPE,
  FILTER_FIELDS,
  TENANT_STATUS,
} from '@/utils/constants';
import { booleanOptions, valuesToOptions } from '@/utils/helpers';

export const filterApartments = {
  name: {},
  type: {},
  location: {},
  availableUnits: {},
  baths: {},
  beds: {},
  toilets: {},
  availableSoon: {
    field: FILTER_FIELDS.SELECT,
    type: DATA_TYPE.BOOLEAN,
  },
};

export const filterApplicants = {
  fullName: {},
  email: {},
  phoneNumber: {},
  status: {
    field: FILTER_FIELDS.SELECT,
    values: valuesToOptions(Object.values(APPLICANT_STAGE)),
  },
};

export const filterJobs = {
  title: {},
  available: {
    field: FILTER_FIELDS.SELECT,
    values: booleanOptions('Open', 'Closed'),
    label: 'Status',
    type: DATA_TYPE.BOOLEAN,
  },
  remote: {
    field: FILTER_FIELDS.SELECT,
    type: DATA_TYPE.BOOLEAN,
  },
  contract: {
    field: FILTER_FIELDS.SELECT,
    type: DATA_TYPE.BOOLEAN,
  },
};

export const filterTenants = {
  tenantFullName: {},
  firstName: {},
  lastName: {},
  personalEmail: {},
  selfEmployed: {
    field: FILTER_FIELDS.SELECT,
    type: DATA_TYPE.BOOLEAN,
  },
  ownLastProperty: {
    field: FILTER_FIELDS.SELECT,
    type: DATA_TYPE.BOOLEAN,
  },
  employmentCompanyName: {
    label: 'Company Name',
  },
  changeEmployerSoon: {
    field: FILTER_FIELDS.SELECT,
    type: DATA_TYPE.BOOLEAN,
  },
  hasPersonsWithSpecialNeed: {
    field: FILTER_FIELDS.SELECT,
    type: DATA_TYPE.BOOLEAN,
  },
  status: {
    field: FILTER_FIELDS.SELECT,
    values: valuesToOptions(Object.values(TENANT_STATUS)),
  },
};
