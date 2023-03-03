import {
  booleanValidation,
  conditionalValidation,
  numberRange,
  optionalValidation,
  positiveNumberValidation,
  required,
  requiredDate,
  stringValidation,
  urlValidation,
} from './schema-helpers';

export const jobSchema = {
  title: stringValidation('Title'),
  remote: booleanValidation('Remote'),
  contract: booleanValidation('Contract'),
  location: stringValidation('Location'),
  minimumRequirements: stringValidation('Job Summary'),
  desiredSkills: stringValidation('Qualifications'),
  softwareProficiency: stringValidation('Skills and Competencies'),
  note: optionalValidation(stringValidation('Note')),
  available: booleanValidation('Available'),
};

export const apartmentSchema = {
  name: stringValidation('Name'),
  type: stringValidation('Type'),
  location: stringValidation('Location'),
  description: stringValidation('Description'),
  address: stringValidation('Address'),
  totalUnits: positiveNumberValidation('Total Units'),
  availableUnits: positiveNumberValidation('Available Units'),
  baths: positiveNumberValidation('Baths'),
  beds: positiveNumberValidation('Beds'),
  toilets: positiveNumberValidation('Toilets'),
  availableSoon: optionalValidation(booleanValidation('Available soon')),
};

export const filterSchema = {
  field: stringValidation('Field'),
  value: required('Value'),
};

export const teamSchema = {
  fullName: stringValidation('Full Name'),
  position: stringValidation('Position'),
  image: stringValidation('Image'),
  priority: numberRange('Priority', 'number', 0, 20),
};

export const interviewSchema = {
  date: requiredDate('Interview Date'),
  time: required('Interview Time'),
  location: conditionalValidation(stringValidation('Location'), 'isOnline'),
  meetingLink: conditionalValidation(
    urlValidation('Meeting Link'),
    'isOnline',
    (isOnline) => !!isOnline
  ),
  isOnline: booleanValidation('Is Online'),
  interviewContent: stringValidation('Interview Content'),
};
