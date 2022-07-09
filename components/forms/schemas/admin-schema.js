import {
  booleanValidation,
  optionalValidation,
  positiveNumberValidation,
  required,
  stringValidation,
} from './schema-helpers';

export const jobSchema = {
  title: stringValidation('Title'),
  remote: booleanValidation('Remote'),
  contract: booleanValidation('Contract'),
  location: stringValidation('Location'),
  minimumRequirements: stringValidation('Minimum Requirements'),
  desiredSkills: stringValidation('Desired Skills'),
  softwareProficiency: stringValidation('Software Proficiency'),
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
