import FeatureCard from '@/components/common/FeatureCard';
import { LocalImage } from '@/components/common/Image';
import Section from '@/components/common/Section';
import Shape from '@/components/common/Shape';
import BusinessRelationships from '@/components/layout/BusinessRelationships';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { aboutUsLeadText, theCulture } from '@/data/about-us';
import { about } from '@/data/navigation';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import React from 'react';

const breadcrumb = [
  { title: 'About Us', url: 'about-us' },
  { title: 'Our Culture' },
];

const OurCulture = ({ teams }) => {
  return (
    <>
      <NextSeo
        title="Our Culture"
        description="Highrachy is a 21st century project-oriented organization setup
        primarily to meet your real estate needs."
        canonical="https://www.highrahcy.com/our-culture"
      />
      <Navigation parentPage={about.url} />
      <PageHeader
        breadcrumb={breadcrumb}
        title="Our Culture"
        bgImage="/assets/img/bg/about-us.jpg"
      />
      <OurCultureSection />
      <TheCulture />
      <OurTeam teams={teams} />
      <BusinessRelationships />
      <Footer />
    </>
  );
};

const OurCultureSection = () => (
  <Section title="Our Culture">
    <div className="container">
      <div className="row">
        <div className="col-lg-7 col-md-6 pe-lg-6">
          <p className="text lead pt-3">{aboutUsLeadText}</p>
        </div>
        <div className="col-lg-5 col-md-6 mt-lg-n7">
          <Image
            src="/assets/img/about-us/our-culture.svg"
            className="img-fluid d-block"
            height={500}
            width={500}
            alt="Our Company"
          />
        </div>
      </div>
    </div>
  </Section>
);

const TheCulture = () => (
  <Section altBg>
    <div className="container mb-6">
      <div className="row">
        <div className="col-12">
          <div className="row">
            {Object.values(theCulture).map(
              ({ title, icon, content }, index) => (
                <FeatureCard
                  icon={icon}
                  title={title}
                  key={index}
                  size="one-third"
                >
                  {content}
                </FeatureCard>
              )
            )}
          </div>
        </div>
      </div>
    </div>
    <Shape />
  </Section>
);

export const OurTeam = ({ teams }) => {
  if (!teams) return null;
  return (
    <Section title="Our Team" id="our-team">
      <div className="container">
        <div className="row">
          {teams.map((member, index) => (
            <SingleTeamCard {...member.attributes} key={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

const SingleTeamCard = ({ image, fullName, position }) => (
  <div className="col-md-4 col-lg-3 col-sm-6 mb-5">
    <div className="card shadow lift rounded">
      <LocalImage
        src={image}
        alt={fullName}
        className="img-fluid w-100 card-img-top rounded-top team-image"
      />
      <div className="card-body py-4">
        <p className="card-text">
          <strong>{fullName}</strong>
          <br />
          <span className="small">{position}</span>
        </p>
      </div>
    </div>
  </div>
);

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/teams?filters[publish][$eq]=true&sort=priority:desc`
  );
  const { data } = await res.json();

  return {
    props: {
      teams: data,
    },
    revalidate: 10,
  };
}

export default OurCulture;
