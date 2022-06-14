import {
  email,
  phoneNumber,
  emailValidation,
  requiredDate,
  stringValidation,
  phoneValidation,
  optionalValidation,
  required,
  OptionalPhoneNumber,
} from './schema-helpers';

export const contactUsSchema = {
  name: stringValidation('Full Name'),
  email: stringValidation('Email'),
  phone: optionalValidation(required('Phone Number')),
  subject: required('Subject'),
  message: stringValidation('Message', 10),
};

export const jobApplicationSchema = {
  fullName: stringValidation('Full Name'),
  email,
  phoneNumber,
  resume: stringValidation('Resume'),
};

export const tenantSchema = {
  // step 1 - start
  tenantFullName: stringValidation('Tenant Full Name'),
  tenantProfileImage: stringValidation('Tenant Profile Name'),

  // step 2 - Profile
  title: stringValidation('Title'),
  firstName: stringValidation('First Name'),
  middleName: optionalValidation(stringValidation('Middle Name')),
  lastName: stringValidation('Last Name'),
  mobileTelephone: phoneNumber,
  homeTelephone: OptionalPhoneNumber,
  personalEmail: email,
  workEmail: optionalValidation(emailValidation('Work Email')),
  dateOfBirth: requiredDate('Date of Birth'),
  bvn: stringValidation('BVN'),
  identificationType: stringValidation('Identification Type'),
  identificationNumber: stringValidation('Identification Number'),
  currentAddress: stringValidation('Current Address'),
  postCode: optionalValidation(stringValidation('Post Code')),
  timeAtCurrentAddress: optionalValidation(
    stringValidation('Time at Current Address')
  ),
  stateOfOrigin: optionalValidation(stringValidation('State of Origin')),
  maritalStatus: stringValidation('Marital Status'),
  previousAddress: stringValidation('Previous Address'),

  // step 3 - Emergency
  emergencyFullName: stringValidation('Emergency Full Name'),
  emergencyEmail: emailValidation('Emergency Email'),
  emergencyRelationship: stringValidation('Emergency Relationship'),
  emergencyTelephone1: phoneValidation('Emergency Telephone 1'),
  emergencyTelephone2: optionalValidation(
    phoneValidation('Emergency Telephone 2')
  ),
  emergencyAddress: stringValidation('Current Address'),

  // step 4 - Landlord
  landlordFullName: stringValidation('Landlord Full Name'),
  landlordEmail: emailValidation('Landlord Email'),
  landlordTelephone: phoneValidation('Landlord Telephone'),
  landlordAddress: stringValidation('Landlord Address'),
  landlordPostcode: stringValidation('Landlord Postcode'),

  // step 5 - Employment Details
  employmentCompanyName: stringValidation('Employment Company Name'),
  employmentPositionTitle: stringValidation('EmploymentPositionTitle'),
  employmentContractType: stringValidation('Employment Contract Type'),
  employmentAddress: stringValidation('Employment Address'),
  employmentPostcode: stringValidation('Company Address Post Code'),
  employmentStartDate: requiredDate('Employment State Date'),
  employmentManagerName: stringValidation('Employment Manager Name'),
  employmentManagerPosition: stringValidation('Employment Manager Position'),
  employmentManagerEmail: emailValidation('Employment Manager Email'),
  employmentManagerTelephone: optionalValidation(
    phoneValidation('Employment Manager Phone')
  ),
  employmentMoreDetails: optionalValidation(
    stringValidation('Employment More Details')
  ),
};
