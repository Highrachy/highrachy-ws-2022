import FeatureCard from '@/components/common/FeatureCard';
import { GetInTouch } from '@/components/common/NeedConsultation';
import Section from '@/components/common/Section';
import Button from '@/components/form/Button';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { benefits } from '@/data/careers';
import React from 'react';

const careers = () => {
  return (
    <>
      <Navigation />
      <PageHeader
        title="Contact Us"
        bgImage="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
      />
      <Form />
      <Footer hideConsultation />
    </>
  );
};

const Form = () => (
  <Section title="Get in Touch" centered altBg>
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
              type="email"
              className="form-control"
              id="floatingSubject"
              placeholder="subject"
            />
            <label htmlFor="floatingSubject">Subject</label>
          </div>

          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              id="floatingTextarea"
              placeholder="name@example.com"
              style={{ height: '100px' }}
            />
            <label htmlFor="floatingTextarea">Your Message</label>
          </div>

          <Button color="primary" className="mt-3 mb-6">
            Send Message
          </Button>
        </div>
      </div>
    </div>
  </Section>
);
export default careers;
