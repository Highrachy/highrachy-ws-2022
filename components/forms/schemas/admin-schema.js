import {
  booleanValidation,
  optionalValidation,
  stringValidation,
} from './schema-helpers';

export const newJobSchema = {
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
