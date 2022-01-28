import { TwitterIcon } from '@/components/common/Icons';
import { InstagramIcon } from '@/components/common/Icons';
import { MarkerIcon } from '@/components/common/Icons';
import { PhoneIcon } from '@/components/common/Icons';
import { WebsiteIcon } from '@/components/common/Icons';
import { LinkedInIcon } from '@/components/common/Icons';
import { LocationIcon } from '@/components/common/Icons';
import { FacebookIcon } from '@/components/common/Icons';
import Section from '@/components/common/Section';
import Button from '@/components/forms/Button';
import Footer from '@/components/layout/Footer';
import { SectionHeader } from '@/components/layout/Header';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { about } from '@/data/navigation';
import React from 'react';

const careers = () => {
  return (
    <>
      <Navigation parentPage={about.url} />
      <Map />
      <CForm />
      <Footer hideConsultation />
    </>
  );
};

const Map = () => (
  <section className="google-map">
    <iframe
      title="Highrachy on Google Map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7225456353594!2d3.4277053146311514!3d6.429678795348128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf52560c8903b%3A0x264b8d5dbb789d4a!2sHighrachy!5e0!3m2!1sen!2sus!4v1643001127842!5m2!1sen!2sus"
      width={600}
      height={450}
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      className="full-map img-cover"
    />
  </section>
);

const Form = () => (
  <section className="form-wrapper p-5">
    <SectionHeader>Get in Touch</SectionHeader>
    <div className="py-4">
      <p className="lead">
        If you want to reach out, discuss opportunities or plan your property
        strategy, we’d love to hear from you.
      </p>
      <form action="#form" method="post">
        <div className="form-floating mb-4">
          <input
            className="form-control"
            type="text"
            placeholder="Full name"
            aria-label="Full name"
            id="floatingInput"
          />
          <label htmlFor="floatingInput">Full Name</label>
        </div>

        <div className="form-floating mb-4">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingEmail">Email address</label>
        </div>

        <div className="form-floating mb-4">
          <select
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
          >
            <option value="">Select a Subject</option>
            <option value={1}>Investment</option>
            <option value={2}>Consultation</option>
            <option value={3}>Property Management</option>
            <option value={4}>Enquiries</option>
            <option value={5}>Others</option>
          </select>
          <label htmlFor="floatingSelect">Subject</label>
        </div>

        <div className="form-floating mb-4">
          <input
            type="email"
            className="form-control"
            id="floatingSubject"
            placeholder="subject"
          />
          <label htmlFor="floatingSubject">Subject</label>
        </div>

        <div className="form-floating mb-4">
          <textarea
            className="form-control"
            id="floatingTextarea"
            placeholder="name@example.com"
            style={{ height: '100px' }}
          />
          <label htmlFor="floatingTextarea">Your Message</label>
        </div>

        <Button color="primary" className="mt-4 mb-6">
          Send Message
        </Button>
      </form>
    </div>
  </section>
);
const CForm = () => (
  <Section noPaddingTop altBg>
    <div id="form" className="contact-form-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12 mb-5 pd-5">
            <Form />
          </div>
          <div className="col-lg-5 offset-lg-1">
            <div className="contact-info-wrapper mt-7">
              <SectionHeader> Contact Us</SectionHeader>
              <div className="contact-info">
                <p className="lead mt-4">
                  Feel free to get in touch with us via any convenient way
                </p>
                <ul className="list-unstyled">
                  <li>
                    <div className="contact-text d-flex align-items-center pb-4">
                      <span className="icon-circled">
                        <PhoneIcon />
                      </span>
                      <p>
                        <a href="#" className="text-reset">
                          +234 802 833 7440
                        </a>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="contact-text d-flex align-items-center pb-4">
                      <span className="icon-circled">
                        <WebsiteIcon />
                      </span>
                      <p>
                        <a href="#" className="text-reset">
                          info@highrachy.com
                        </a>
                        <br />
                        <a href="#" className="text-reset">
                          www.highrachy.com
                        </a>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="contact-text d-flex align-items-center pb-4">
                      <span className="icon-circled">
                        <LocationIcon />
                      </span>
                      <p>
                        5th Floor, Ibukun House, <br />
                        No.70 Adetokunbo Ademola Street, <br />
                        Victoria Island, Lagos.
                      </p>
                    </div>
                  </li>
                </ul>
                <ul className="list-inline icon-md">
                  <li className="list-inline-item">
                    <a className="text-reset" href="#">
                      <FacebookIcon />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="text-reset" href="#">
                      <TwitterIcon />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="text-reset" href="#">
                      <LinkedInIcon />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="text-reset" href="#">
                      <InstagramIcon />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
);
export default careers;
