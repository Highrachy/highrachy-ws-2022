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
  booleanValidation,
  conditionalValidation,
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

  // what does the dependant do
  [`dependantOccupation${number}`]: optionalValidation(
    required(`Dependant Occupation ${number}`)
  ),
  // school, work, none of the above
  [`dependantIdentification${number}`]: conditionalValidation(
    optionalValidation(stringValidation(`Dependant ${number} Identification`)),
    [`dependantAge${number}`, `dependantRelationship${number}`],
    (age, relationship) => age >= 18 && relationship === 'Dependants'
  ),
});

export const tenantSchema = {
  // step 1 - start
  title: stringValidation('Title'),
  firstName: stringValidation('First Name'),
  middleName: optionalValidation(stringValidation('Middle Name')),
  lastName: stringValidation('Last Name'),
  tenantProfileImage: stringValidation('Tenant Profile Name'),
  mobileTelephone: phoneNumber,
  homeTelephone: OptionalPhoneNumber,
  personalEmail: email,
  workEmail: optionalValidation(emailValidation('Work Email')),
  dateOfBirth: requiredDate('Date of Birth'),
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
  facebook: optionalValidation(stringValidation('Facebook')),
  twitter: optionalValidation(stringValidation('Twitter')),
  instagram: optionalValidation(stringValidation('Instragram')),
  linkedin: optionalValidation(stringValidation('LinkedIn')),

  // // step 2 - Emergency and Landlord
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
  landlordPostcode: optionalValidation(stringValidation('Landlord Postcode')),
  neverRentedBefore: optionalValidation(
    booleanValidation('Never Rented Before')
  ),
  propertyEvidenceURL: optionalValidation(
    stringValidation('Property Evidence')
  ),

  // ownLastProperty (hide the following fields if true)
  // - landlordFullName, landlordEmail, landlordTelephone
  // show mortgage Statement field

  // step 3 - Employment Details
  isSelfEmployed: optionalValidation(booleanValidation('Self Employed')),
  employmentCompanyName: stringValidation('Employment Company Name'),
  employmentPositionTitle: conditionalValidation(
    stringValidation('Employment Position Title'),
    'isSelfEmployed'
  ),
  employmentContractType: conditionalValidation(
    stringValidation('Employment Contract Type'),
    'isSelfEmployed'
  ),
  employmentAddress: stringValidation('Employment Address'),
  employmentPostcode: optionalValidation(
    stringValidation('Company Address Post Code')
  ),
  employmentStartDate: requiredDate('Employment State Date'),
  employmentManagerName: conditionalValidation(
    stringValidation('Employment Manager Name'),
    'isSelfEmployed'
  ),
  employmentManagerPosition: conditionalValidation(
    stringValidation('Employment Manager Position'),
    'isSelfEmployed'
  ),
  employmentManagerEmail: conditionalValidation(
    emailValidation('Employment Manager Email'),
    'isSelfEmployed'
  ),
  employmentManagerTelephone: conditionalValidation(
    optionalValidation(phoneValidation('Employment Manager Phone')),
    'isSelfEmployed'
  ),
  companyFacebook: optionalValidation(stringValidation('Company Facebook')),
  companyTwitter: optionalValidation(stringValidation('Company Twitter')),
  companyInstagram: optionalValidation(stringValidation('Company Instagram')),
  companyLinkedin: optionalValidation(stringValidation('Company LinkedIn')),
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

  // step 4 - Dependabots
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
  confirmation: booleanValidation('Confirmation'),
};
