import { BedIcon } from '@/components/common/Icons';
import { LeftAngleIcon } from '@/components/common/Icons';
import { RightAngleIcon } from '@/components/common/Icons';
import { ToiletIcon } from '@/components/common/Icons';
import { BathIcon } from '@/components/common/Icons';
import { LocationIcon } from '@/components/common/Icons';
import Section from '@/components/common/Section';
import Button from '@/components/forms/Button';
import DatePicker from '@/components/forms/DatePicker';
import {
  DisplayFormikState,
  setInitialValues,
} from '@/components/forms/form-helper';
import Input from '@/components/forms/Input';
import { createSchema } from '@/components/forms/schemas/schema-helpers';
import Select from '@/components/forms/Select';
import Switch from '@/components/forms/Switch';
import Textarea from '@/components/forms/Textarea';
import Footer from '@/components/layout/Footer';
import { SectionHeader } from '@/components/layout/Header';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { allListings } from '@/data/listings';
import { generateNumOptions, valuesToOptions } from '@/utils/helpers';
import { Form, Formik } from 'formik';
import { Persist } from 'formik-persist';
import React from 'react';

const SingleListing = ({ property }) => {
  const breadcrumb = [
    { title: 'Find Aparments', url: 'listings' },
    { title: property.name },
  ];

  return (
    <>
      <Navigation />
      <PageHeader
        title={`Tenant Application Form`}
        bgImage="/assets/img/bg/listings.jpg"
        breadcrumb={breadcrumb}
      />

      <TenantForm listing={property} />
      <Footer hideConsultation />
    </>
  );
};

const IntroText = () => (
  <div className="col-sm-12">
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
        <div className="col-lg-8 col-md-9 col-sm-10">
          {title && <SectionHeader>{title}</SectionHeader>}
          {children}
        </div>
      </div>
    </div>
  </section>
);

const PropertyListing = ({ listing }) => (
  <>
    <div className="list-group-item mt-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start position-relative p-4">
        <div>
          <h4 className="mb-0">
            {listing.type} - {listing.name}
          </h4>
          <div className="text-muted">
            <LocationIcon /> {listing.address}
          </div>
        </div>
      </div>
    </div>

    <table className="table table-bordered">
      <tbody>
        <tr>
          <td className="fw-bold">Property Name</td>
          <td className="lead">{listing.name}</td>
        </tr>
        <tr>
          <td className="fw-bold">Property Type</td>
          <td className="lead">{listing.type}</td>
        </tr>
        <tr>
          <td className="fw-bold">Address</td>
          <td className="lead">{listing.address}</td>
        </tr>
        <tr>
          <td className="fw-bold">Beds</td>
          <td className="lead">{listing.beds}</td>
        </tr>
        <tr>
          <td className="fw-bold">Baths</td>
          <td className="lead">{listing.baths}</td>
        </tr>
        <tr>
          <td className="fw-bold">Toilets</td>
          <td className="lead">{listing.toilets}</td>
        </tr>
      </tbody>
    </table>
  </>
);

const TenantForm = ({ listing }) => {
  const [step, setStep] = React.useState(0);
  const handleSubmit = (values, actions) => {
    setTimeout(() => {
      toast.success('Information sent successfully');
      actions.setSubmitting(false);
    }, 4000);
  };

  const ALL_STEPS = [
    <div key="1">
      <SectionHeader small>Tenant Application Form</SectionHeader>
      <IntroText />
      <PropertyListing listing={listing} />
    </div>,
    <PersonalInformation key="2" />,
    <EmergencyContact key="3" />,
    <LandlordInformation key="4" />,
    <EmploymentDetails key="5" />,
    <DependantsInformation key="6" />,
  ];

  const isFirstStep = step === 0;
  const isLastStep = step === ALL_STEPS.length - 1;
  // const progress = Math.round((step / ALL_STEPS.length) * 100);

  return (
    <Section>
      <div className="container">
        <Formik
          initialValues={setInitialValues({})}
          onSubmit={handleSubmit}
          validationSchema={createSchema({})}
        >
          {({ isSubmitting, handleSubmit, ...props }) => (
            <Form>
              <PaddedSection>
                <>
                  {ALL_STEPS[step]}

                  {!isLastStep && (
                    <Button color="danger" onClick={() => setStep(step + 1)}>
                      {isFirstStep ? 'Apply Now' : <>Continue</>}
                    </Button>
                  )}
                  <div className="mt-6 float-end">
                    {!isFirstStep && (
                      <Button
                        color="dark"
                        className="btn-outline-dark"
                        onClick={() => setStep(step - 1)}
                      >
                        Previous <LeftAngleIcon />
                      </Button>
                    )}
                    &nbsp; &nbsp; &nbsp;
                    {!isLastStep && !isFirstStep && (
                      <Button
                        color={isFirstStep ? 'danger' : 'none'}
                        className="btn-outline-dark"
                        onClick={() => setStep(step + 1)}
                      >
                        <>
                          Next <RightAngleIcon />
                        </>
                      </Button>
                    )}
                  </div>
                  <Persist name={'tenant-application-form'} />
                  <DisplayFormikState {...props} showAll />
                </>
              </PaddedSection>
            </Form>
          )}
        </Formik>
      </div>
    </Section>
  );
};

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
    <Input name="emergency['fullName']" label="Full Name" />

    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="emergency['email']"
        type="email"
        label="Emergency Contact Email"
      />
      <Input
        formGroupClassName="col-md-6"
        name="emergency['relationship']"
        label="Relationship"
      />
    </div>
    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="emergency['telephone1']"
        label="Telephone 1"
      />
      <Input
        formGroupClassName="col-md-6"
        name="emergency['telephone2']"
        label="Telephone 2"
        optional
      />
    </div>

    <Textarea name="emergency['address']" label="Address" />
  </>
);

const LandlordInformation = () => (
  <>
    <SectionHeader small>Landlord Information</SectionHeader>
    <Input name="landlord['fullName']" label="Landlord Full Name" />

    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="landlord['email']"
        type="email"
        label="Landlord Contact Email"
      />
      <Input
        formGroupClassName="col-md-6"
        name="landlord['telephone']"
        label="Landlord Telephone"
      />
    </div>
    <Textarea name="landlord['address']" label="Landlord Address" />
    <Input name="landlord['postCode']" label="Landlord Post Code" />
  </>
);

const EmploymentDetails = () => (
  <>
    <SectionHeader small>Employment Details</SectionHeader>
    <Input name="employment['companyName']" label="Company Name" />

    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="employment['positionTitle']"
        label="Position Title"
      />
      <Select
        formGroupClassName="col-md-6"
        name="employment['contractType']"
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
    <Textarea name="employment['address']" label="Company Address" />

    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="employment['postCode']"
        label="Company Address Post Code"
      />
      <DatePicker
        formGroupClassName="col-md-6"
        label="Appox. Start Date"
        name="employment['startDate']"
        placeholder="Approx. Start Date"
      />
    </div>

    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="employment['managerName']"
        label="Contract/Manager's Name"
      />
      <Input
        formGroupClassName="col-md-6"
        name="employment['managerPosition']"
        label="Manager Position"
      />
    </div>

    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="employment['managerEmail']"
        type="email"
        label="Manager Email"
      />
      <Input
        formGroupClassName="col-md-6"
        name="employment['managerTelephone']"
        label="Manager Telephone"
        optional
      />
    </div>

    <Textarea
      name="employment['moreDetails']"
      label="More Employment Details"
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
  return { props: { property: allListings[params.property] } };
}

export async function getStaticPaths() {
  const propertyLists = Object.keys(allListings);
  return {
    paths: propertyLists.map((propertyList) => {
      return {
        params: {
          property: propertyList,
        },
      };
    }),
    fallback: false,
  };
}

export default SingleListing;
