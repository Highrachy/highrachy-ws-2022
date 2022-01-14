import React from 'react';
import Parallax from '../common/Parallax';
import Section from '../common/Section';

const Consultation = () => (
  <Parallax bgImage="https://radiustheme.com/demo/html/techkit/assets/images/bg/contact-bg.jpg">
    <Section className="text-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="text-white lead pb-5">
              We are here to answer your questions 24/7
            </div>
            <h3 className="h2 text-white pb-5">NEED A CONSULTATION?</h3>
            <a href="contact.html" className="btn btn-primary btn-wide">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </Section>
  </Parallax>
);

export default Consultation;
