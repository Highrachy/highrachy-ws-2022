import Link from 'next/link';
import React from 'react';
import Parallax from './Parallax';
import Section from './Section';

const NeedConsultation = ({ image, text, header, buttonText }) => (
  <Parallax bgImage={image}>
    <Section className="text-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="text-white lead pb-5">{text}</div>
            <h3 className="h2 text-white pb-5">{header}</h3>
            <Link href="/contact-us" passHref>
              <a className="btn btn-primary btn-wide">{buttonText}</a>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  </Parallax>
);

NeedConsultation.defaultProps = {
  image: '/assets/img/bg/consultation.jpg',
  text: 'We are here to answer your questions 24/7',
  header: 'NEED A CONSULTATION?',
  buttonText: 'Contact Us',
};

export default NeedConsultation;
