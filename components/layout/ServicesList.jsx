import React from 'react';
import { IconWithBackground } from '../common/Icons';
import Shape from '../common/Shape';
import Humanize from 'humanize-plus';
import Section from '../common/Section';
import { SectionHeader } from './Header';
import services from '@/data/services';
import classNames from 'classnames';
import { convertToSlug } from '@/helpers/string';

export const ServicesListCard = () => {
  return (
    <Section title="Our Services" altBg centered>
      <div className="container mb-6">
        <div className="row">
          {Object.entries(services).map(([name, content]) => (
            <SingleServiceCard key={name} {...content} />
          ))}
        </div>
      </div>
      <Shape />
    </Section>
  );
};

const SingleServiceCard = ({ content, icon, title }) => (
  <section className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
    <div className="service-card card w-100 h-100 text-center px-1 px-md-3 px-lg-1 pt-5 pb-3">
      <div className="mx-auto mb-2">
        <IconWithBackground icon={icon} iconClassName="icon-md" />
      </div>
      <div className="card-body">
        <div className="card-text">
          <h6 className="text-color">{title} </h6>
          <p className="text-muted small">{Humanize.truncate(content, 80)}</p>
          {/* <a href="#" className="text-left stretched-link">
            Go somewhere
          </a> */}
        </div>
      </div>
    </div>
  </section>
);

const ServicesImage = ({ altBg, icon }) => (
  <div
    className={classNames(
      'col-md-4 col-sm-12 align-self-center position-relative',
      {
        'order-md-first': !!altBg,
        'order-md-last': !altBg,
      }
    )}
  >
    {/* <IconWithBackground icon={icon} size={12} iconClassName="icon-lg" /> */}
    <div className="icon-xxl text-light-red">{icon}</div>
  </div>
);

const ServicesContent = ({ altBg, content, name }) => (
  <div
    className={classNames('col-md-8 col-sm-12 align-self-center', {
      'order-md-first': !altBg,
      'order-md-last': !!altBg,
    })}
  >
    <SectionHeader small className="mb-3" headerClassName="text-gray">
      {name}
    </SectionHeader>

    <p className="text-lg">{content}</p>
  </div>
);

const SingleServicesList = ({ alternate, ...props }) => {
  return (
    <Section altBg={alternate} id={convertToSlug(props.title)}>
      <div className="container">
        <div className="row justify-content-center">
          <ServicesContent {...props} altBg={alternate} />
          <ServicesImage {...props} altBg={alternate} />
        </div>
      </div>
    </Section>
  );
};

const ServicesList = () => (
  <Section title="Our Services" noPaddingBottom>
    <div className="container">
      <p className="lead mt-4 mb-5">
        Our unique approach recognizes the value of trust and our commitment to
        you is consistency and reliability.
      </p>
    </div>
    {Object.values(services).map((service, index) => (
      <SingleServicesList
        key={index}
        {...service}
        alternate={(index + 1) % 2 === 1}
      />
    ))}
  </Section>
);

export default ServicesList;
