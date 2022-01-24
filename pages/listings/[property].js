import Section from '@/components/common/Section';
import Footer from '@/components/layout/Footer';
import { SectionHeader } from '@/components/layout/Header';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { useRouter } from 'next/router';
import React from 'react';

const SingleCareer = () => {
  const router = useRouter();
  const { property } = router.query;
  return (
    <>
      <Navigation />
      <PageHeader
        title={`Tenant Application Form`}
        bgImage="/assets/img/bg/listings.jpg"
      />

      <Section>
        <IntroText />
        <Form />
      </Section>
      <Footer hideConsultation />
    </>
  );
};

const IntroText = () => (
  <PaddedSection title="Tenant Application Form">
    <div className="col-sm-12">
      <p className="lead fw-normal mt-3">
        Thank you for your request to rent one of our properties. The process to
        secure the flat/house is as follows:
      </p>
      <ol className="text-lg lh-2">
        <li className="mb-4">
          A <strong>holding deposit</strong> of ₦50, 000 should be paid to
          Highrachy Investment and Technology Limited, at the time of
          application. This will enable us to take the property off the market
          and commence credit and reference checks. The holding deposit can be
          refunded should you fail these checks.
        </li>
        <li className="mb-4">
          After deposit, complete the below application and return to us as soon
          as possible to info@highrachy.com along with a photo ID such as
          International passport photo or driver’s license. If you are applying
          as a Non-Nigerian, we will need a passport and copies of residency
          visas as appropriate.
        </li>
        <li className="mb-4">
          Once the checks are completed to and approved by the landlord, we will
          proceed to lease signing.
        </li>
        <li className="mb-4">
          The amount of the rent (less the holding deposit of ₦50, 000) will
          then be due immediately and the first year’s rent is payable on or
          before the lease start date.
        </li>
      </ol>
      <p className>
        Please also be aware that the rent due date will be the lease start
        date.
      </p>
    </div>
  </PaddedSection>
);

const PaddedSection = ({ children, title }) => (
  <section className="pb-5">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-9 col-sm-10">
          <SectionHeader>{title}</SectionHeader>
          {children}
        </div>
      </div>
    </div>
  </section>
);

const Form = () => (
  <Section title="Apply Now" centered altBg>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10 col-sm-8 col-lg-7 col-xl-6">
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Full name"
              aria-label="Full name"
              id="floatingInput"
            />
            <label htmlFor="floatingInput">Full Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingPhone"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingPhone">Phone Number</label>
          </div>
          <div className="mb-3">
            <label htmlFor="formFile2" className="form-label">
              Resume
            </label>
            <input className="form-control" type="file" id="formFile2" />
          </div>
          <div className="form-group mb-1">
            <button type="button" className="btn btn-primary text-uppercase">
              Submit
            </button>
          </div>
          <p className="small text-muted mb-0 font-italic">
            All applications will remain private
          </p>
        </div>
      </div>
    </div>
  </Section>
);

export default SingleCareer;
