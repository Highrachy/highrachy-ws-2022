import React from 'react';
import Parallax from './Parallax';
import Section from './Section';

const NeedConsultation = () => (
  <Parallax bgImage="https://get.pxhere.com/photo/man-light-black-and-white-group-people-white-skyline-photography-window-city-meeting-reflection-corporate-office-communication-darkness-business-partner-black-monochrome-conversation-skyscrapers-women-talking-symmetry-photograph-snapshot-image-conference-shape-contact-feedback-company-discussion-interview-cityview-organization-viewing-platform-monochrome-photography-discussing-911100.jpg">
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

export default NeedConsultation;
