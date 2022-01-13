import React from 'react';
import { IconWithBackground } from '../common/Icons';
import expertise from '@/data/services';
import { SectionHeader } from '../common/Header';
import Shape from '../common/Shape';
import Humanize from 'humanize-plus';

const ServicesList = () => {
  return (
    <section className="py-7 pb-8 bg-light position-relative">
      <div className="container">
        <SectionHeader center className="mb-6">
          Our Services
        </SectionHeader>
        <div className="row">
          {Object.entries(expertise).map(([name, content]) => (
            <SingleServiceCard key={name} {...content} />
          ))}
        </div>
      </div>
      <Shape />
    </section>
  );
};

const SingleServiceCard = ({ content, icon, title }) => (
  <section className="col-md-3 col-sm-6 col-12">
    <div className="service-card card w-100 h-100 text-center px-1 pt-5 pb-3">
      <div className="mx-auto mb-2">
        <IconWithBackground icon={icon} />
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

export default ServicesList;
