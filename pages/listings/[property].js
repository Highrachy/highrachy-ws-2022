import {
  BathIcon,
  BedIcon,
  LeftAngleIcon,
  ToiletIcon,
} from '@/components/common/Icons';
import { RightAngleIcon } from '@/components/common/Icons';
import { LocationIcon } from '@/components/common/Icons';
import Section from '@/components/common/Section';
import Button from '@/components/forms/Button';
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
import { generateNumOptions, valuesToOptions } from '@/utils/helpers';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';

const SingleListing = ({ property }) => {
  const breadcrumb = [
    { title: 'Find Aparments', url: 'listings' },
    { title: property?.name },
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
        title={`Listings | ${property?.name}`}
        description="Highrachy is a 21st century project-oriented organization setup
        primarily to meet your real estate needs."
      />
      <Navigation />
      <PageHeader
        title={`Tenant Application Form`}
        bgImage="/assets/img/bg/listings.jpg"
        breadcrumb={breadcrumb}
      />
      {router.isFallback ? (
        <div>Loading</div>
      ) : (
        <TenantForm listing={property} />
      )}
      <Footer hideConsultation />
    </>
  );
};

const AlertStatus = ({ listing }) =>
  listing?.availableUnits === 0 &&
  (listing?.availableSoon ? (
    <div className="alert alert-info my-4" role="alert">
      This property will be <strong>available soon</strong>. You can submit an
      application to join the waiting list.
    </div>
  ) : (
    <div className="alert alert-danger my-4" role="alert">
      Property not available
    </div>
  ));

const IntroText = ({ listing }) => (
  <div className="col-sm-12">
    <AlertStatus listing={listing} />

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

const PaddedSection = ({ children, title }) => (
  <section className="pb-5">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-9 col-md-10 col-sm-11">
          {title && <SectionHeader>{title}</SectionHeader>}
          {children}
        </div>
      </div>
    </div>
  </section>
);

const IntroSection = ({ listing }) => (
  <section>
    <div className="position-relative mb-5">
      <h2 className="mb-0 text-gray">
        {listing.type} - {listing.name}
      </h2>
      <div className="text-muted">
        <LocationIcon /> {listing.address}
      </div>
      <ul className="list-inline text-muted">
        <li className="list-inline-item pe-4">
          <BedIcon /> Bed: {listing.beds}
        </li>
        <li className="list-inline-item pe-4">
          <BathIcon /> Bath: {listing.baths}
        </li>
        <li className="list-inline-item pe-4">
          <ToiletIcon /> Toilet: {listing.toilets}
        </li>
      </ul>
    </div>
  </section>
);

const TenantForm = ({ listing }) => {
  const [step, setStep] = React.useState(0);
  const handleSubmit = async (values, actions) => {
    console.log('submitting', values, actions);
    const fetchOptions = {
      /**
       * The default method for a request with fetch is GET,
       * so we must tell it to use the POST HTTP method.
       */
      method: 'POST',
      /**
       * These headers will be added to the request and tell
       * the API that the request body is JSON and that we can
       * accept JSON responses.
       */
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      /**
       * The body of our POST request is the JSON string that
       * we created above.
       */
      body: JSON.stringify({ data: { ...values, apartment: apartment.id } }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tenants`,
      fetchOptions
    );

    if (!response.ok) {
      if (response.status === 403) {
        toast.info(
          'You have already submitted an application for this property'
        );
        return;
      }

      const errorMessage = await response.text();

      toast.error(errorMessage);
    } else {
      toast.success('Information sent successfully');
    }
    actions.setSubmitting(false);
    actions.resetForm();
  };

  const ALL_STEPS = [
    <IntroText listing={listing} key="1" />,
    <ProfileInformation key="2" />,
    <PersonalInformation key="3" />,
    <EmergencyContact key="4" />,
    <LandlordInformation key="5" />,
    <EmploymentDetails key="6" />,
    // <DependantsInformation key="7" />,
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
      >
        <PaddedSection>
          <>
            <IntroSection listing={listing} />
            <div className="bg-light py-5 px-6 mb-4">
              {!isFirstStep && (
                <p className="muted fw-bold mb-0 small">
                  Step {step}/{lastStep}
                </p>
              )}
              {ALL_STEPS[step]}
              <StepNavigation
                step={step}
                setStep={setStep}
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
              />
            </div>

            {isLastStep ? (
              <FormikButton>Submit Application</FormikButton>
            ) : (
              <Button color="dark" onClick={() => setStep(step + 1)}>
                {isFirstStep ? (
                  listing?.availableUnits === 0 && listing?.availableSoon ? (
                    'Join the waiting list'
                  ) : (
                    'Start Tenant Application'
                  )
                ) : (
                  <>Continue</>
                )}
              </Button>
            )}
          </>
        </PaddedSection>
      </FormikForm>
    </Section>
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
        formGroupClassName="col-md-6"
        label="Date of Birth"
        name="dateOfBirth"
        placeholder="Date of Birth"
      />
      <Input
        formGroupClassName="col-md-6"
        name="bvn"
        label="BVN"
        tooltipText="For identity purposes only. Does not give access to accounts"
      />
    </div>
    <div className="row">
      <Select
        name="identificationType"
        label="Identification Type"
        options={valuesToOptions(
          ["Driver's Licenses", 'International Passpport'],
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
    <Textarea name="currentAddress" label="Current Address" />

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

    <Textarea name="previousAddress" label="Previous Address" />
  </>
);

const EmergencyContact = () => (
  <>
    <SectionHeader small>Emergency Contact</SectionHeader>
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
  </>
);

const LandlordInformation = () => (
  <>
    <SectionHeader small>Landlord Information</SectionHeader>
    <Input name="landlordFullName" label="Landlord Full Name" />

    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="landlordEmail"
        type="email"
        label="Landlord Contact Email"
      />
      <Input
        formGroupClassName="col-md-6"
        name="landlordTelephone"
        label="Landlord Telephone"
      />
    </div>
    <Textarea name="landlordAddress" label="Landlord Address" />
    <Input name="landlordPostcode" label="Landlord Post Code" />
  </>
);

const EmploymentDetails = () => (
  <>
    <SectionHeader small>Employment Details</SectionHeader>
    <Input name="employmentCompanyName" label="Company Name" />

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
        placeholder="Approx. Start Date"
      />
    </div>

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

    <Textarea
      name="employmentMoreDetails"
      label="More Employment Details"
      optional
    />
  </>
);

const DependantsInformation = () => (
  <>
    <SectionHeader small>Dependants/Co-residents</SectionHeader>

    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="dependant['name']"
        label="Dependant Name 1"
      />
      <Select
        formGroupClassName="col-md-6"
        name="dependant['name']"
        label="Age (In Years)"
        options={generateNumOptions(100, 'year', {
          firstOptionText: 'Select Age',
        })}
      />
    </div>

    <div className="row">
      <Select
        formGroupClassName="col-md-6"
        name="dependant['relationship']"
        label="Relationship Type"
        options={valuesToOptions(
          ['Dependants', 'Co-Residents'],
          'Select Relationship Type'
        )}
      />
      <Input
        formGroupClassName="col-md-6"
        name="dependant['occupation']"
        label="Occupation"
      />
    </div>

    <Switch
      name="dependant['specialNeeds']"
      label="Do you have children or persons with special needs living with you"
    />

    <Textarea
      name="employment['specialNeedsMoreDetails']"
      label="Please provide us with necessary details on the special needs of your dependants"
    />
    <Input name="dependant['pets']" label="List your Pets" />
  </>
);

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://highrachy-strapi.herokuapp.com/api/apartments?filters[slug][$eq]=${params.property}`
  );

  const { data } = await res.json();

  return { props: { property: { id: data[0].id, ...data[0]['attributes'] } } };
}

export async function getStaticPaths() {
  const res = await fetch(
    `https://highrachy-strapi.herokuapp.com/api/apartments`
  );
  const { data: propertyLists } = await res.json();
  return {
    paths: propertyLists.map((propertyList) => {
      return {
        params: {
          property: propertyList['attributes']['slug'],
        },
      };
    }),
    fallback: true,
  };
}

export default SingleListing;
