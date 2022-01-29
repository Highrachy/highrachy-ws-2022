import {
  stringValidation,
  optionalValidation,
  required,
} from './schema-helpers';

export const contactUsSchema = {
  fullName: stringValidation('Full Name'),
  email: stringValidation('Email'),
  phone: optionalValidation(required('Phone Number')),
  subject: required('Subject'),
  message: stringValidation('Message', 10),
};
