import React from 'react';
import { IconWithBackground } from '../common/Icons';
import expertise from 'data/expertise';

const FeatureList = () => {
  return (
    <section className="py-7 bg-light">
      <div className="container">
        <header className="text-center mb-6">
          <h3 className="section-title">Our Expertise</h3>
          <div className="header-block">
            <span className="header-block__1"></span>
            <span className="header-block__2"></span>
            <span className="header-block__3"></span>
          </div>
        </header>
        <div className="row">
          {Object.entries(expertise).map(([name, content]) => (
            <FeatureCard key={name} {...content} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ content, icon, title }) => (
  <section className="feature-card col-md-4 col-sm-6 col-12">
    <div className="card w-100 h-100 text-center px-5 pt-5 pb-3">
      <div className="mx-auto mb-3">
        <IconWithBackground icon={icon} />
      </div>
      <div className="card-body">
        <div className="card-text">
          <h5 className="text-body">{title} </h5>
          <p>{content}</p>
        </div>
      </div>
    </div>
  </section>
);

export default FeatureList;
