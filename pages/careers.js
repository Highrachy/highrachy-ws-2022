import FeatureCard from '@/components/common/FeatureCard';
import { GetInTouch } from '@/components/common/NeedConsultation';
import Section from '@/components/common/Section';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { benefits } from '@/data/careers';
import Link from 'next/link';
import React from 'react';

const careers = () => {
  return (
    <>
      <Navigation />
      <PageHeader
        title="Careers"
        bgImage="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
      />
      <Career />
      <Perks />
      <GetInTouch />
      <Footer hideConsultation />
    </>
  );
};

const Career = () => (
  <Section title="Join our Team">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <p className="lead mb-4">
            We’re a growing team of professionals looking to disrupt the
            industry with our bold endeavours
          </p>
        </div>
      </div>

      <ul className="list-group">
        <li className="list-group-item">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start position-relative p-4">
            <div>
              <h5 className="mb-0">Front End Engineer - Payment Interfaces</h5>
              <span className="badge rounded-pill bg-light-red text-color">
                Lagos
              </span>{' '}
              <span className="badge rounded-pill bg-light-red text-color">
                Permanent, Full-time
              </span>
            </div>
            <Link href="/careers-signle">
              <a className="btn btn-secondary btn-wide text-uppercase stretched-link">
                Apply Now
              </a>
            </Link>
          </div>
        </li>
        <li className="list-group-item">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start position-relative p-4">
            <div>
              <h5 className="mb-0">Backend Designer </h5>
              <span className="badge rounded-pill bg-light-red text-color">
                Remote
              </span>{' '}
              <span className="badge rounded-pill bg-light-red text-color">
                Contract
              </span>
            </div>
            <Link href="/careers-signle">
              <a className="btn btn-secondary btn-wide text-uppercase stretched-link">
                Apply Now
              </a>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  </Section>
);

const Perks = () => (
  <Section title="Benefits & Incentives" centered altBg>
    <div className="container">
      <div className="row">
        <div className="offset-md-1 col-md-10">
          <div className="row">
            {benefits.map(({ icon, title, content }, index) => (
              <FeatureCard key={index} icon={icon} title={title}>
                {content}
              </FeatureCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Section>
);
export default careers;
