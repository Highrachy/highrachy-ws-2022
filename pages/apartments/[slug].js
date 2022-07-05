import {
  BathIcon,
  BedIcon,
  LeftAngleIcon,
  ToiletIcon,
} from '@/components/common/Icons';
import { RightAngleIcon } from '@/components/common/Icons';
import { LocationIcon } from '@/components/common/Icons';
import Section, { PaddedSection } from '@/components/common/Section';
import Button from '@/components/forms/Button';
import CheckboxGroup from '@/components/forms/CheckboxGroup';
import DatePicker from '@/components/forms/DatePicker';
import FormikButton from '@/components/forms/FormikButton';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import { tenantSchema } from '@/components/forms/schemas/page-schema';
import Select from '@/components/forms/Select';
import Switch from '@/components/forms/Switch';
import Textarea from '@/components/forms/Textarea';
import Upload from '@/components/forms/Upload';
import Footer from '@/components/layout/Footer';
import { SectionHeader } from '@/components/layout/Header';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { tenantTestData } from '@/data/tenant';
import { TENANT_STATUS } from '@/utils/constants';
import {
  generateNumOptions,
  getError,
  isDevEnvironment,
  statusIsSuccessful,
  valuesToOptions,
} from '@/utils/helpers';
import { getTokenFromStore } from '@/utils/localStorage';
import axios from 'axios';
import { useFormikContext } from 'formik';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { FaChevronLeft, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const SingleApartment = ({ apartment }) => {
  const breadcrumb = [
    { title: 'Find Aparments', url: 'apartments' },
    { title: apartment?.name },
  ];

  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NextSeo
        title={`Apartments | ${apartment?.name}`}
        description="Highrachy is a 21st century project-oriented organization setup
        primarily to meet your real estate needs."
      />
      <Navigation />
      <PageHeader
        title={`Tenant Application Form`}
        bgImage="/assets/img/bg/apartments.jpg"
        breadcrumb={breadcrumb}
      />

      <TenantForm apartment={apartment} />

      <Footer hideConsultation />
    </>
  );
};

const AlertStatus = ({ apartment }) =>
  apartment?.availableUnits === 0 &&
  (apartment?.availableSoon ? (
    <div className="alert alert-info my-4" role="alert">
      This property will be <strong>available soon</strong>. You can submit an
      application to join the waiting list.
    </div>
  ) : (
    <div className="alert alert-danger my-4" role="alert">
      Property not available
    </div>
  ));

const IntroText = ({ apartment }) => (
  <div className="col-sm-12">
    <AlertStatus apartment={apartment} />

    <SectionHeader small>Tenant Application Form</SectionHeader>
    <p className="lead fw-normal mt-3">
      Thank you for your request to rent one of our properties. The process to
      secure the flat/house is as follows:
    </p>
    <ol className="text-lg lh-2">
      <li className="mb-4">
        A <strong>holding deposit</strong> of ₦50, 000 should be paid to
        Highrachy Investment and Technology Limited, at the time of application.
        This will enable us to take the property off the market and commence
        credit and reference checks. The holding deposit can be refunded should
        you fail these checks.
      </li>
      <li className="mb-4">
        After deposit, complete the below application and return to us as soon
        as possible to info@highrachy.com along with a photo ID such as
        International passport photo or driver’s license. If you are applying as
        a Non-Nigerian, we will need a passport and copies of residency visas as
        appropriate.
      </li>
      <li className="mb-4">
        Once the checks are completed to and approved by the landlord, we will
        proceed to lease signing.
      </li>
      <li className="mb-4">
        The amount of the rent (less the holding deposit of ₦50, 000) will then
        be due immediately and the first year’s rent is payable on or before the
        lease start date.
      </li>
    </ol>
    <p>
      Please also be aware that the rent due date will be the lease start date.
    </p>
  </div>
);

const IntroSection = ({ apartment }) => (
  <section>
    <div className="position-relative mb-5">
      <h2 className="mb-0 text-gray">
        {apartment.type} - {apartment.name}
      </h2>
      <div className="text-muted">
        <LocationIcon /> {apartment.address}
      </div>
      <ul className="list-inline text-muted">
        <li className="list-inline-item pe-4">
          <BedIcon /> Bed: {apartment.beds}
        </li>
        <li className="list-inline-item pe-4">
          <BathIcon /> Bath: {apartment.baths}
        </li>
        <li className="list-inline-item pe-4">
          <ToiletIcon /> Toilet: {apartment.toilets}
        </li>
      </ul>
    </div>
  </section>
);

const TenantForm = ({ apartment }) => {
  const [step, setStep] = React.useState(0);
  const isWaitingList =
    apartment?.availableUnits === 0 && apartment?.availableSoon;
  const handleSubmit = async (values, actions) => {
    if (
      !values.facebook &&
      !values.twitter &&
      !values.instagram &&
      !values.linkedin
    ) {
      toast.error('You need to add at least one of your social media account');
      actions.setSubmitting(false);
      return;
    }
    if (
      !values.companyFacebook &&
      !values.companyTwitter &&
      !values.companyInstagram &&
      !values.companyLinkedin
    ) {
      toast.error(
        "You need to add at least one of your company's social media account"
      );
      actions.setSubmitting(false);
      return;
    }
    const payload = {
      apartment: apartment.id,
      ...values,
      dateOfBirth: values.dateOfBirth.date,
      employmentStartDate: values.employmentStartDate.date,
      status: isWaitingList
        ? TENANT_STATUS.WAITING_LIST
        : TENANT_STATUS.APPLIED,

      // BOOLEAN VALUES_TO_OPTIONS
      ownLastProperty: !!values?.ownLastProperty,
      neverRentedBefore: !!values?.neverRentedBefore,
      isSelfEmployed: !!values?.isSelfEmployed,
      changeEmployerSoon: !!values?.changeEmployerSoon,
      hasPersonsWithSpecialNeed: !!values?.hasPersonsWithSpecialNeed,

      //CONDITION VALUES
      ...(values?.ownLastProperty
        ? {
            landlordFullName: values.tenantFullName,
            landlordEmail: values.personalEmail,
            landlordTelephone: values.mobileTelephone,
          }
        : {}),
      ...(values?.isSelfEmployed
        ? {
            employmentPositionTitle: 'CEO',
            employmentContractType: 'Self Employed',
            employmentManagerName: 'Not Applicable - Self Employed',
            employmentPosition: 'Not Applicable - Self Employed',
            employmentManagerEmail: 'Not Applicable - Self Employed',
            employmentManagerTelephone: 'Not Applicable - Self Employed',
          }
        : {}),
    };

    delete payload.confirmation;

    try {
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/tenants`,
        data: { data: payload },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            Router.push('/apartments');
            toast.success('Information sent successfully');
            actions.setSubmitting(false);
            actions.resetForm();
          }
        })
        .catch(function (error) {
          toast.error(getError(error));
          actions.setSubmitting(false);
        });
    } catch (error) {
      toast.error(getError(error));
      actions.setSubmitting(false);
    }
  };

  const ALL_STEPS = [
    <IntroText apartment={apartment} key="1" />,
    <ProfileInformation key="2" />,
    <PersonalInformation key="3" />,
    <EmergencyContact key="4" />,
    <EmploymentDetails key="5" />,
    <DependantsInformation key="6" />,
  ];

  const lastStep = ALL_STEPS.length - 1;
  const isFirstStep = step === 0;
  const isLastStep = step === lastStep;

  return (
    <Section>
      <FormikForm
        schema={tenantSchema}
        handleSubmit={handleSubmit}
        name="tenant-application-form"
        showFormikState
        showAllFormikState
        persistForm
        initialValues={isDevEnvironment() ? tenantTestData : {}}
      >
        <PaddedSection>
          <>
            <IntroSection apartment={apartment} />
            <div className="bg-light py-5 px-6 mb-4">
              {!isFirstStep && (
                <p className="muted fw-bold mb-0 small">
                  Step {step}/{lastStep}
                </p>
              )}
              {ALL_STEPS[step]}
            </div>

            <ActionButtons
              apartment={apartment}
              step={step}
              setStep={setStep}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              isWaitingList={isWaitingList}
            />
          </>
        </PaddedSection>
      </FormikForm>
    </Section>
  );
};

const ActionButtons = ({
  step,
  setStep,
  isFirstStep,
  isLastStep,
  isWaitingList,
}) => {
  const { values } = useFormikContext();
  const confirmation = !!values?.['confirmation']?.[0];
  const tenantFullName = !!values?.['tenantFullName'];
  const tenantProfileImage = !!values?.['tenantProfileImage'];
  const initialData = tenantFullName && tenantProfileImage;

  return (
    <div className="d-flex justify-content-between">
      {isLastStep ? (
        // Submit Button on last step
        <FormikButton className="px-5" disabled={!confirmation}>
          Submit Application
        </FormikButton>
      ) : (
        // Show Forward button on all steps except Last Step
        <Button
          color="primary"
          className="px-5"
          onClick={() => setStep(step + 1)}
          disabled={!initialData && !isFirstStep}
        >
          {isFirstStep ? (
            isWaitingList ? (
              'Join the waiting list'
            ) : (
              'Start Tenant Application'
            )
          ) : (
            <>Continue</>
          )}
        </Button>
      )}

      {/*  Show Back button on all steps except First Step */}
      {!isFirstStep && (
        <Button
          color="none"
          className="ms-3 btn-outline-info"
          onClick={() => setStep(step - 1)}
        >
          <FaChevronLeft /> Back
        </Button>
      )}
    </div>
  );
};

const StepNavigation = ({ step, setStep, isFirstStep, isLastStep }) => {
  return step === 1 ? null : (
    <div className="d-flex flex-column flex-md-row justify-content-end align-items-end mb-3 mt-5">
      <div>
        {!isFirstStep && (
          <Button
            color="none"
            className="btn-outline-dark btn-sm"
            onClick={() => setStep(step - 1)}
          >
            <LeftAngleIcon /> Previous Step
          </Button>
        )}
      </div>
      &nbsp;&nbsp;&nbsp;
      <div>
        {!isLastStep && !isFirstStep && (
          <Button
            color={isFirstStep ? 'danger' : 'none'}
            className="btn-outline-dark btn-sm"
            onClick={() => setStep(step + 1)}
          >
            <>
              Next Step <RightAngleIcon />
            </>
          </Button>
        )}
      </div>
    </div>
  );
};

const ProfileInformation = () => (
  <>
    <SectionHeader small>Tenant Application</SectionHeader>
    <p className="lead">
      Please do not fill the information on behalf of another person. Applicants
      may not fraudulently present their information on behalf of another.
      Highrachy reserves the right to revoke a person&sbquo;s tenancy where the
      person resident on the property is not the original applicant.
    </p>
    <div className="mt-3">
      <Input name="tenantFullName" label="Tenant Full Name" />
      <Upload
        changeText="Update Picture"
        defaultImage="/assets/img/placeholder/image.png"
        imgOptions={{
          className: 'mb-3 icon-md',
          width: 200,
          height: 300,
        }}
        name="tenantProfileImage"
        uploadText={`Upload Picture`}
        folder={`tenants/picture`}
      />
      <p className="small mt-4">
        Note that the individual whose information is filled herein will be
        responsible for making all payments (including rent, Service charges and
        levies). Kindly specify if the property will be occupied by multiple
        persons and specify the number and provide details of other occupants in
        the space provided below.
      </p>
    </div>
  </>
);

const PersonalInformation = () => (
  <>
    <SectionHeader small>Personal Information</SectionHeader>
    <div className="row">
      <Input formGroupClassName="col-md-6" name="title" label="Title" />
      <Input
        formGroupClassName="col-md-6"
        name="firstName"
        label="First Name"
      />
    </div>
    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="middleName"
        label="Middle Name"
        optional
      />
      <Input formGroupClassName="col-md-6" name="lastName" label="Last Name" />
    </div>

    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="mobileTelephone"
        label="Mobile Telephone"
      />
      <Input
        formGroupClassName="col-md-6"
        name="homeTelephone"
        label="Home Telephone"
        optional
      />
    </div>

    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="personalEmail"
        type="email"
        label="Personal Email"
      />
      <Input
        formGroupClassName="col-md-6"
        name="workEmail"
        type="email"
        label="Work Email"
        optional
      />
    </div>
    <div className="row">
      <DatePicker
        label="Date of Birth"
        name="dateOfBirth"
        placeholder="YYYY-MM-DD"
        helpText="YYYY-MM-DD"
      />
    </div>
    <div className="row">
      <Select
        name="identificationType"
        label="Identification Type"
        options={valuesToOptions(
          [
            "Driver's License",
            'International Passpport',
            'National Identification',
          ],
          'Select One...'
        )}
        formGroupClassName="col-md-6"
      />
      <Input
        formGroupClassName="col-md-6"
        name="identificationNumber"
        label="Identification Number"
      />
    </div>
    <Textarea
      name="currentAddress"
      label="Current Address"
      placeholder="The required information under ‘previous employment’ is to be provided if you are currently self-employed."
    />
    <small>
      Please provide sufficient information as to the name, location, position
      held and number of years spent at the organization
    </small>

    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="postCode"
        label="Post Code"
        optional
      />
      <Input
        formGroupClassName="col-md-6"
        name="timeAtCurrentAddress"
        label="Time at Current Address"
        helpText="Time in Years and Month"
        optional
      />
    </div>

    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="stateOfOrigin"
        label="State of Origin"
        optional
      />
      <Select
        formGroupClassName="col-md-6"
        name="maritalStatus"
        label="Marital Status"
        options={valuesToOptions(
          ['Single', 'Married', 'Divorced', 'Separated', 'Widowed'],
          'Select Marital Status'
        )}
      />
    </div>

    <Textarea
      name="previousEmployment"
      label="Previous Employment"
      helpText="Please provide sufficient information as to the name, location, position held and number of years spent at the organization"
    />

    <h5>Social Media</h5>
    <p className="text-muted">
      At least one (1) of your social media handle is required
    </p>
    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="facebook"
        type="url"
        label="Facebook"
        helpText="https://www.facebook.com/..."
        optional
      />
      <Input
        formGroupClassName="col-md-6"
        name="twitter"
        label="Twitter"
        type="url"
        helpText="https://www.twitter.com/..."
        optional
      />
    </div>

    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="instagram"
        label="Instagram"
        type="url"
        helpText="https://www.instagram.com/..."
        optional
      />
      <Input
        formGroupClassName="col-md-6"
        name="linkedin"
        label="LinkedIn"
        helpText="https://www.linkedin.com/..."
        type="url"
        optional
      />
    </div>
  </>
);

const EmergencyContact = () => {
  const { values } = useFormikContext();
  const ownLastProperty = !!values?.['ownLastProperty'];
  const neverRentedBefore = !!values?.['neverRentedBefore'];
  const landlordText = neverRentedBefore ? 'Guardian' : 'Landlord';

  return (
    <>
      <SectionHeader small>Emergency Contact</SectionHeader>
      <p className="lead">
        This can <strong>not</strong> be someone who is also resident in the
        property with you.
      </p>
      <Input name="emergencyFullName" label="Full Name" />

      <div className="row">
        <Input
          formGroupClassName="col-md-6"
          name="emergencyEmail"
          type="email"
          label="Emergency Contact Email"
        />
        <Input
          formGroupClassName="col-md-6"
          name="emergencyRelationship"
          label="Relationship"
        />
      </div>
      <div className="row">
        <Input
          formGroupClassName="col-md-6"
          name="emergencyTelephone1"
          label="Telephone 1"
        />
        <Input
          formGroupClassName="col-md-6"
          name="emergencyTelephone2"
          label="Telephone 2"
          optional
        />
      </div>

      <Textarea name="emergencyAddress" label="Address" />

      <div className="mt-5"></div>
      <SectionHeader small>Landlord Information</SectionHeader>

      <ToggleField
        name="ownLastProperty"
        label="Do you own the last property?"
        note="Please provide us with a copy of your last mortgage statement or any
          other document confirming ownership"
      />

      {!ownLastProperty && (
        <ToggleField
          name="neverRentedBefore"
          label="Is this your first rented apartment?"
          note="Please fill in the details of your last guardian and provide us with proof of address in this case, e.g. utility
        bill, bank statement, etc."
        />
      )}

      {!ownLastProperty && (
        <Input name="landlordFullName" label={`${landlordText} Full Name`} />
      )}

      {!ownLastProperty && (
        <div className="row">
          <Input
            formGroupClassName="col-md-6"
            name="landlordEmail"
            type="email"
            label={`${landlordText} Contact Email`}
          />
          <Input
            formGroupClassName="col-md-6"
            name="landlordTelephone"
            label={`${landlordText} Telephone`}
          />
        </div>
      )}
      <Textarea name="landlordAddress" label={`${landlordText} Address`} />
      <Input name="landlordPostcode" label={`${landlordText} Post Code`} />

      {(ownLastProperty || neverRentedBefore) && (
        <Upload
          changeText="Update Picture"
          defaultImage="/assets/img/placeholder/image.png"
          imgOptions={{
            className: 'mb-3 icon-md',
            width: 200,
            height: 300,
          }}
          name="propertyEvidenceURL"
          uploadText={`Upload Evidence`}
          folder={`tenants/picture`}
        />
      )}
    </>
  );
};

const EmploymentDetails = () => {
  const { values } = useFormikContext();
  const isSelfEmployed = !!values?.['isSelfEmployed'];
  const changeEmployerSoon = !!values?.['changeEmployerSoon'];

  return (
    <>
      <SectionHeader small>Employment Details</SectionHeader>

      <ToggleField
        name="isSelfEmployed"
        label="Are you’re self-employed?"
        note="Please provide us with your last 3 years’ tax returns or a letter from
        your accountant, confirming your last 3 years of income"
      />

      <Input name="employmentCompanyName" label="Company Name" />

      {!isSelfEmployed && (
        <div className="row">
          <Input
            formGroupClassName="col-md-6"
            name="employmentPositionTitle"
            label="Position Title"
          />
          <Select
            formGroupClassName="col-md-6"
            name="employmentContractType"
            label="Contract Type"
            options={valuesToOptions(
              [
                'Contractor',
                'Consultant',
                'Freelancer',
                'Full-Time Employee',
                'Part-Time Employee',
                'Self Employed',
                'Temporary Employee',
                'Temporary Worker',
              ],
              'Select Contract Type'
            )}
          />
        </div>
      )}

      <Textarea name="employmentAddress" label="Company Address" />

      <div className="row">
        <Input
          formGroupClassName="col-md-6"
          name="employmentPostcode"
          label="Company Address Post Code"
        />
        <DatePicker
          formGroupClassName="col-md-6"
          label="Appox. Start Date"
          name="employmentStartDate"
          placeholder="YYYY-MM-DD"
          helpText="YYYY-MM-DD"
        />
      </div>

      {!isSelfEmployed && (
        <>
          <div className="row">
            <Input
              formGroupClassName="col-md-6"
              name="employmentManagerName"
              label="Contract/Manager's Name"
            />
            <Input
              formGroupClassName="col-md-6"
              name="employmentManagerPosition"
              label="Manager Position"
            />
          </div>

          <div className="row">
            <Input
              formGroupClassName="col-md-6"
              name="employmentManagerEmail"
              type="email"
              label="Manager Email"
            />
            <Input
              formGroupClassName="col-md-6"
              name="employmentManagerTelephone"
              label="Manager Telephone"
              optional
            />
          </div>
        </>
      )}

      <Textarea
        name="employmentMoreDetails"
        label="More Employment Details"
        optional
      />

      <h5>Social Media</h5>
      <p className="text-muted">
        At least one (1) of the company&apos;s social media handle is required
      </p>
      <div className="row">
        <Input
          formGroupClassName="col-md-6"
          name="companyFacebook"
          type="url"
          label="Company Facebook"
          optional
        />
        <Input
          formGroupClassName="col-md-6"
          name="companyTwitter"
          label="Twitter"
          type="url"
          optional
        />
      </div>

      <div className="row">
        <Input
          formGroupClassName="col-md-6"
          name="companyInstagram"
          label="Instagram"
          type="url"
          optional
        />
        <Input
          formGroupClassName="col-md-6"
          name="companyLinkedin"
          label="LinkedIn"
          type="url"
          optional
        />
      </div>

      <ToggleField
        name="changeEmployerSoon"
        label="Are you changing employer between now and the tenancy start date?"
        note=" Please provide us with your offer letter in this case."
      />

      {changeEmployerSoon && (
        <Upload
          changeText="Update Picture"
          defaultImage="/assets/img/placeholder/image.png"
          imgOptions={{
            className: 'mb-3 icon-md',
            width: 200,
            height: 300,
          }}
          name="offerLetterURL"
          uploadText={`Upload Offer Letter`}
          folder={`tenants/picture`}
        />
      )}
    </>
  );
};

const DependantsInformation = () => {
  const [dependants, setDependants] = React.useState([1]);
  const { values } = useFormikContext();
  const hasPersonsWithSpecialNeed = !!values?.['hasPersonsWithSpecialNeed'];

  return (
    <>
      <SectionHeader small>Dependants/Co-residents</SectionHeader>

      {dependants.map((number) => (
        <DependantInfo number={number} key={number} />
      ))}

      {dependants.length < 5 && (
        <div className="border-bottom">
          <Button
            color="secondary"
            className="mt-2 mb-5 btn-sm py-2 px-4"
            onClick={() =>
              setDependants([...dependants, dependants.length + 1])
            }
          >
            <FaPlus /> Add More Dependants
          </Button>
        </div>
      )}
      <div className="my-5"></div>
      <Switch
        name="hasPersonsWithSpecialNeed"
        label="Do you have children or persons with special needs living with you"
      />

      {hasPersonsWithSpecialNeed && (
        <Textarea
          name="specialNeedDetails"
          label="Please provide us with necessary details on the special needs of your dependants"
        />
      )}

      <div className="mt-6"></div>
      <SectionHeader small>Pets</SectionHeader>
      <Input
        name="pets"
        label="List your Pets"
        helpText="Please note that the landlord has to give written permission for you to
        keep a pet at the property and you must abide by the House Rules on
        keeping pet/s. Examples are cats, dogs, e.t.c"
      />

      <div className="mt-6"></div>
      <SectionHeader small>Confirmation</SectionHeader>
      <CheckboxGroup
        inline
        name="confirmation"
        options={[
          {
            label: (
              <>
                By submitting this form, I confirm that the information provided
                on this Tenant Application Form is (to the best of my knowledge)
                accurate, complete and not misleading and that I have read and
                agreed to the attached{' '}
                <Link href="/privacy/data-protection-statement" passHref>
                  <a target="_blank" className="text-primary">
                    Data Protection Statement
                  </a>
                </Link>
                .
              </>
            ),
            value: true,
          },
        ]}
      />
    </>
  );
};

const DependantInfo = ({ number }) => {
  const { values } = useFormikContext();
  const age = values?.[`dependantAge${number}`];
  const relationship = values?.[`dependantRelationship${number}`];
  const showUploadField = age && age >= 18 && relationship === 'Dependants';

  return (
    <section>
      <div className="row">
        <Input
          formGroupClassName="col-md-6"
          name={`dependantName${number}`}
          label={`Dependant Name ${number}`}
        />
        <Select
          formGroupClassName="col-md-6"
          name={`dependantAge${number}`}
          label={`Age ${number} (In Years)`}
          options={generateNumOptions(100, 'year', {
            firstOptionText: 'Select Age',
          })}
        />
      </div>

      <div className="row">
        <Select
          formGroupClassName="col-md-6"
          name={`dependantRelationship${number}`}
          label={`Relationship Type ${number}`}
          options={valuesToOptions(
            ['Dependants', 'Co-Residents'],
            'Select Relationship Type'
          )}
        />
        <Input
          formGroupClassName="col-md-6"
          name={`dependantOccupation${number}`}
          label={`Occupation ${number}`}
        />
      </div>

      {showUploadField && (
        <Upload
          changeText="Update Picture"
          defaultImage="/assets/img/placeholder/image.png"
          imgOptions={{
            className: 'mb-3 icon-md',
            width: 200,
            height: 300,
          }}
          name={`dependantIdentification${number}`}
          uploadText={`Upload Dependant  ${number} Identification`}
          folder={`tenants/picture`}
        />
      )}
    </section>
  );
};

const ToggleField = ({ name, label, note }) => {
  const { values } = useFormikContext();

  return (
    <section>
      <div className="mt-4">
        <Switch name={name} label={label} />
      </div>
      {values?.[name] && <p className="lead mb-4">{note}</p>}
    </section>
  );
};

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/apartments?filters[slug][$eq]=${params.slug}`
  );

  const { data } = await res.json();

  return { props: { apartment: { id: data[0].id, ...data[0]['attributes'] } } };
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/apartments`);
  const { data: propertyLists } = await res.json();
  return {
    paths: propertyLists.map((propertyList) => {
      return {
        params: {
          slug: propertyList['attributes']['slug'],
        },
      };
    }),
    fallback: true,
  };
}

export default SingleApartment;
