import { PhoneIcon } from '@/components/common/Icons';
import { WebsiteIcon } from '@/components/common/Icons';
import { LocationIcon } from '@/components/common/Icons';
import Section from '@/components/common/Section';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import { contactUsSchema } from '@/components/forms/schemas/page-schema';
import Select from '@/components/forms/Select';
import Textarea from '@/components/forms/Textarea';
import Footer from '@/components/layout/Footer';
import { SectionHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import Map from '@/components/utils/Map';
import { about } from '@/data/navigation';
import services from '@/data/services';
import { valuesToOptions } from '@/utils/helpers';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-toastify';
import { socialMediaLinks } from '../data';

const allServices = Object.values(services).map((service) => service.title);
export const subjects = ['General', 'Enquiries', ...allServices, 'Others'];

const contactUs = () => {
  return (
    <>
      <NextSeo
        title="Contact Us"
        description=" If you want to reach out, discuss opportunities or plan your property
        strategy, we’d love to hear from you."
        canonical="https://www.highrahcy.com/contact-us"
      />
      <Navigation parentPage={about.url} />
      <Map />
      <ContactInfo />
      <Footer hideConsultation />
    </>
  );
};

const GetInTouch = () => (
  <section className="form-wrapper p-5">
    <SectionHeader>Get in Touch</SectionHeader>
    <div className="py-4">
      <p className="lead">
        If you want to reach out, discuss opportunities or plan your property
        strategy, we’d love to hear from you.
      </p>
      <ContactUsForm />
    </div>
  </section>
);

const ContactInfo = () => (
  <Section noPaddingTop altBg>
    <div id="form" className="contact-form-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12 mb-5 pd-5">
            <GetInTouch />
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
                        <a className="text-reset" href="tel:+2349055555146">
                          +234 905 555 5146
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
                        <a
                          href="mailto:info@highrachy.com"
                          className="text-reset"
                        >
                          info@highrachy.com
                        </a>
                        <br />
                        <a
                          href="https://www.highrachy.com"
                          className="text-reset"
                        >
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
                <ul className="list-inline icon-md2">
                  {socialMediaLinks.map(({ url, icon }, index) => (
                    <li
                      className="list-inline-item"
                      key={`contact-social-media-${index}`}
                    >
                      <Link href={url} passHref>
                        <a className="text-reset">{icon}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

const ContactUsForm = () => {
  const handleSubmit = async (values, actions) => {
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
      body: JSON.stringify({ data: values }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contacts`,
      fetchOptions
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      toast.error(errorMessage);
    } else {
      toast.success('Information sent successfully');
    }
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <FormikForm
      schema={contactUsSchema}
      handleSubmit={handleSubmit}
      name="contact-us-form"
      butttonText="Send Message"
      persistForm
      useSubmitButton
    >
      <Input name="name" label="Full Name" />
      <Input name="email" type="email" label="Email Address" />
      <Input name="phone" label="Phone Number" optional />
      <Select
        name="subject"
        label="Subject"
        options={valuesToOptions(subjects, 'Select One...')}
      />
      <Textarea name="message" label="Your Message" rows="6" />
    </FormikForm>
  );
};

export default contactUs;
