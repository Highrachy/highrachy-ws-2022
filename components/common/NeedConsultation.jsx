import Link from 'next/link';
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
            <Link href="/contact-us" passHref>
              <a className="btn btn-primary btn-wide">Contact Us</a>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  </Parallax>
);

export const GetInTouch = () => (
  <Parallax bgImage="https://get.pxhere.com/photo/man-light-black-and-white-group-people-white-skyline-photography-window-city-meeting-reflection-corporate-office-communication-darkness-business-partner-black-monochrome-conversation-skyscrapers-women-talking-symmetry-photograph-snapshot-image-conference-shape-contact-feedback-company-discussion-interview-cityview-organization-viewing-platform-monochrome-photography-discussing-911100.jpg">
    <Section className="text-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <h3 className="h2 text-white pb-5 uppercase">
              Didn&apos;t see your job?
            </h3>
            <div className="text-white lead pb-5">
              We&apos;re always on the hunt for talented designers and
              developers to join our team
            </div>
            <Link href="/contact-us" passHref>
              <a className="btn btn-primary btn-wide">Get in Touch</a>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  </Parallax>
);

export default NeedConsultation;
