import FeatureCard from '@/components/common/FeatureCard';
import { IconWithBackground } from '@/components/common/Icons';
import NeedConsultation from '@/components/common/NeedConsultation';
import Section from '@/components/common/Section';
import Button from '@/components/forms/Button';
import Footer from '@/components/layout/Footer';
import { SectionHeader } from '@/components/layout/Header';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { benefits } from '@/data/careers';
import { about } from '@/data/navigation';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Careers = ({ jobs }) => {
  return (
    <>
      <NextSeo
        title="Careers at Highrachy"
        description="Highrachy is a 21st century project-oriented organization setup
        primarily to meet your real estate needs."
        canonical="https://www.highrahcy.com/careers"
      />
      <Navigation parentPage={about.url} />
      <PageHeader title="Careers" bgImage="/assets/img/bg/careers.jpg" />
      <Career />
      <Perks />
      <AvailablePositions jobs={jobs} />
      <NeedConsultation
        header="We're always on the hunt for talented individuals to join our team"
        text="Didn't see your job"
        buttonText="Get in Touch"
      />
      <Footer hideConsultation />
    </>
  );
};

const Career = () => (
  <Section title="Join our Team">
    <div className="container">
      <div className="row">
        <div className="col-lg-7 col-md-6 pe-lg-6">
          <p className="text lead pt-3 mb-4">
            Careers at Highrachy is truly one of a kind experience. We are
            committed to making your life as rewarding as your job. You get the
            opportunity to build a successful career and be the change you want
            to see in the world.
          </p>
          <Link href="#available-positions" passHref>
            <a className="btn btn-primary">View Available Positions</a>
          </Link>
        </div>
        <div className="col-lg-5 col-md-6 mt-lg-n6">
          <Image
            src="/assets/img/about-us/careers.svg"
            className="img-fluid d-block"
            height={574}
            width={590}
            alt="Join Our Team"
          />
        </div>
      </div>
    </div>
  </Section>
);

const Perks = () => (
  <Section title="Benefits & Incentives" centered altBg>
    <div className="container">
      <div className="row">
        {benefits.map(({ icon, title }, index) => (
          <section
            key={index}
            className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4"
          >
            <div className="service-card card w-100 h-100 text-center px-1 px-md-3 px-lg-1 pt-5 pb-3">
              <div className="mx-auto mb-2">
                <IconWithBackground icon={icon} iconClassName="icon-md" />
              </div>
              <div className="card-body">
                <div className="card-text">
                  <h6 className="text-color mb-3">{title} </h6>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  </Section>
);

const AvailablePositions = ({ jobs }) => (
  <Section title="Available Positions" centered id="available-positions">
    <div className="container">
      {jobs.length > 0 ? (
        <ul className="list-group">
          {jobs.map(
            ({ attributes: { slug, title, location, remote, contract } }) => (
              <li className="list-group-item" key={slug}>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start position-relative p-4">
                  <div>
                    <h5 className="mb-0">{title}</h5>
                    <JobInfo
                      location={location}
                      remote={remote}
                      contract={contract}
                    />
                  </div>
                  <Link
                    passHref
                    href={{
                      pathname: '/careers/[slug]',
                      query: { slug },
                    }}
                  >
                    <a className="btn btn-secondary btn-wide text-uppercase stretched-link">
                      Apply Now
                    </a>
                  </Link>
                </div>
              </li>
            )
          )}
        </ul>
      ) : (
        <h4 className="text-center text-muted">
          No available position at the moment
        </h4>
      )}
    </div>
  </Section>
);

export const JobInfo = ({ location, remote, contract }) => (
  <>
    <span className="badge rounded-pill bg-light-red text-color">
      {remote ? 'Remote' : location}
    </span>{' '}
    <span className="badge rounded-pill bg-light-red text-color">
      {contract ? 'Contract' : 'Permanent, Full-time'}
    </span>
  </>
);

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/jobs?filters[available][$eq]=true`
  );
  const { data } = await res.json();

  return {
    props: {
      jobs: data,
    },
    revalidate: 10,
  };
}

export default Careers;
