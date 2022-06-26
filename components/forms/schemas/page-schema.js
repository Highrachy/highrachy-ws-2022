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
  urlValidation,
  booleanValidation,
  conditionalValidation,
  requiredIf,
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

const dependantSchema = (number) => ({
  [`dependantName${number}`]: optionalValidation(
    stringValidation(`Dependant Name ${number}`)
  ),
  [`dependantAge${number}`]: conditionalValidation(
    required(`Dependant Age ${number}`),
    `dependantName${number}`,
    (name) => !!name
  ),

  [`dependantRelationship${number}`]: conditionalValidation(
    stringValidation(`Dependant Relationship ${number}`),
    `dependantName${number}`,
    (name) => !!name
  ),
  [`dependantOccupation${number}`]: conditionalValidation(
    stringValidation(`Dependant Occupation ${number}`),
    `dependantName${number}`,
    (name) => !!name
  ),
  [`dependantIdentification${number}`]: conditionalValidation(
    stringValidation(`Dependant ${number} Identification`),
    [`dependantAge${number}`, `dependantRelationship${number}`],
    (age, relationship) => age > 18 && relationship === 'Dependants'
  ),
});

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
  previousEmployment: stringValidation('Previous Employment'),
  facebook: optionalValidation(urlValidation('Facebook')),
  twitter: optionalValidation(urlValidation('Twitter')),
  instagram: optionalValidation(urlValidation('Instragram')),
  linkedIn: optionalValidation(urlValidation('LinkedIn')),

  // // step 3 - Emergency and Landlord
  emergencyFullName: stringValidation('Emergency Full Name'),
  emergencyEmail: emailValidation('Emergency Email'),
  emergencyRelationship: stringValidation('Emergency Relationship'),
  emergencyTelephone1: phoneValidation('Emergency Telephone 1'),
  emergencyTelephone2: optionalValidation(
    phoneValidation('Emergency Telephone 2')
  ),
  emergencyAddress: stringValidation('Current Address'),
  ownLastProperty: optionalValidation(booleanValidation('Own Last Property')),
  landlordFullName: conditionalValidation(
    stringValidation('Landlord/Guardian Full Name'),
    'ownLastProperty'
  ),
  landlordEmail: conditionalValidation(
    emailValidation('Landlord Email'),
    'ownLastProperty'
  ),
  landlordTelephone: conditionalValidation(
    phoneValidation('Landlord Telephone'),
    'ownLastProperty'
  ),
  landlordAddress: stringValidation('Landlord Address'),
  landlordPostcode: stringValidation('Landlord Postcode'),
  neverRentedBefore: optionalValidation(
    booleanValidation('Never Rented Before')
  ),
  propertyEvidenceURL: optionalValidation(
    stringValidation('Property Evidence')
  ),

  // ownLastProperty (hide the following fields if true)
  // - landlordFullName, landlordEmail, landlordTelephone
  // show mortgage Statement field

  // step 4 - Employment Details
  isSelfEmployed: optionalValidation(booleanValidation('Self Employed')),
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
  companyFacebook: requiredIf([
    'companyTwitter',
    'companyInstagram',
    'companyLinkedIn',
  ]),
  companyTwitter: requiredIf([
    'companyFacebook',
    'companyInstagram',
    'companyLinkedIn',
  ]),
  companyInstagram: requiredIf([
    'companyFacebook',
    'companyTwitter',
    'companyLinkedIn',
  ]),
  companyLinkedIn: requiredIf([
    'companyFacebook',
    'companyTwitter',
    'companyInstagram',
  ]),
  employmentMoreDetails: optionalValidation(
    stringValidation('Employment More Details')
  ),
  changeEmployerSoon: optionalValidation(
    booleanValidation('Change Employer Soon')
  ),
  offerLetterURL: optionalValidation(stringValidation('Offer Letter')),

  // isSelfEmployed (hide the following fields if true)
  // - Position Title = CEO,contractype = self employed (Hidden)
  // manager name, manager position, manager email, manager telephone (hidden)
  // companyFacebook, companyTwitter, companyInstagram, companyLinkedIn (only one is allowed)
  // - changing employment (move down, show offer letter upload)

  // step 5 - Dependabots
  ...dependantSchema(1),
  ...dependantSchema(2),
  ...dependantSchema(3),
  ...dependantSchema(4),
  ...dependantSchema(5),
  hasPersonsWithSpecialNeed: optionalValidation(
    booleanValidation('Has Special Needs')
  ),
  specialNeedDetails: optionalValidation(
    stringValidation('Special Needs Details')
  ),
  pets: optionalValidation(stringValidation('List of Pets')),
};

// status => waiting list, applied, confirmed, leaving soon, Moved Out
