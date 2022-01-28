import Section from '@/components/common/Section';
import Footer from '@/components/layout/Footer';
import { SectionHeader } from '@/components/layout/Header';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { about } from '@/data/navigation';
import { useRouter } from 'next/router';
import React from 'react';

const SingleCareer = () => {
  const router = useRouter();
  const { job } = router.query;
  return (
    <>
      <Navigation parentPage={about.url} />
      <PageHeader
        title={`Career - ${job}`}
        bgImage="/assets/img/bg/careers.jpg"
      />

      <Section>
        <WhoWeAre />
        <YourRole />
        <IdealCandidate />
      </Section>
      <Form />
      <Footer hideConsultation />
    </>
  );
};

const WhoWeAre = () => (
  <PaddedSection title="Who we are">
    <p>
      We&apos;re one of the leading digital agencies in Chicago and we&apos;re
      looking to add a new frontend developer to our brilliant team.
    </p>
    <p>
      We love new technologies and we have embraced many modern frontend tools
      to make our code more maintainable such as SASS, flexbox and webpack. When
      it comes to our more bespoke systems with large amounts of interface to
      build, you may also find yourself working with React and ES6+ as well as
      collaborating...
    </p>
    <p>
      We are proud to have a well respected team of frontend developers who work
      closely with our inhouse designers to to create intuitive and compelling
      user experiences, and would love to find the right person to join us as we
      line up a number of brand new big name clients.
    </p>
  </PaddedSection>
);

const YourRole = () => (
  <PaddedSection title="Your role">
    <p>
      You will play an important part in maintaining the existing product and to
      help design, create and develop critical improvements and innovative new
      offerings for a new version soon to be launched in 2019. This is an
      exciting opportunity to join them at a key milestone in the growth of the
      business where they plan to fully globalise the product.
    </p>
    <p>
      We&apos;re one of the leading digital agencies in Chicago and we&apos;re
      looking to add a new frontend developer to our brilliant team.
    </p>
  </PaddedSection>
);

const IdealCandidate = () => (
  <PaddedSection title="Ideal candidate">
    <ul>
      <li>Creative problem solver</li>
      <li>ability to learn API programming</li>
      <li>
        desirable to have coding skills in languages such as PHP, .NET, Java,
        Ruby and Python
      </li>
      <li>previous experience of working remotely is highly desirable</li>
      <li>
        previous experience of working in a startup/scaleup is highly desirable
      </li>
      <li>
        previous experience of working evening/night shift is highly desirable
      </li>
      <li>
        you love helping people &apos; enjoy working in a truly fast paced
        culture and thrive in small teams
      </li>
      <li>you&apos;re organised, reliable, diligent and attentive to detail</li>
      <li>you learn quickly and are comfortable with complexity</li>
      <li>you are able to work independently and under minimal supervision</li>
      <li>
        you have a flawless command of English and communicate with clarity,
        whether written or over the phone
      </li>
    </ul>
  </PaddedSection>
);

const PaddedSection = ({ children, title }) => (
  <section className="pb-5">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-9 col-sm-10">
          <SectionHeader small>{title}</SectionHeader>
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
