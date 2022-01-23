import FeatureCard from '@/components/common/FeatureCard';
import ImageBlock from '@/components/common/ImageBlock';
import Section from '@/components/common/Section';
import Shape from '@/components/common/Shape';
import BusinessRelationships from '@/components/layout/BusinessRelationships';
import Footer from '@/components/layout/Footer';
import { SectionHeader } from '@/components/layout/Header';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { aboutUsLeadText, theCulture } from '@/data/about-us';
import { our_team } from '@/data/team';
import Image from 'next/image';
import React from 'react';

const breadcrumb = [
  { title: 'About Us', url: 'about-us' },
  { title: 'Our Culture' },
];

const OurCulture = () => {
  return (
    <>
      <Navigation />
      <PageHeader
        breadcrumb={breadcrumb}
        title="Our Culture"
        bgImage="/assets/img/bg/about-us.jpg"
      />
      <OurCultureSection />
      <TheCulture />
      <OurTeam />
      <BusinessRelationships />
      <Footer />
    </>
  );
};

const OurCultureSection = () => (
  <Section altBg noPaddingBottom>
    <ImageBlock
      title={'Our Culture'}
      image={'/assets/svg/our-culture.svg'}
      altBg
    >
      <SectionHeader small>Our Culture</SectionHeader>
      <p className="text pt-3">{aboutUsLeadText}</p>
    </ImageBlock>
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

export const OurTeam = () => (
  <Section title="Our Team" id="our-team">
    <div className="container">
      <div className="row">
        {our_team.map((member, index) => (
          <SingleTeamCard {...member} key={index} />
        ))}
      </div>
    </div>
  </Section>
);

const SingleTeamCard = ({ image, name, title }) => (
  <div className="col-md-6 col-lg-4 mb-5">
    <div className="card shadow lift rounded">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={name}
        className="img-fluid w-100 card-img-top rounded-top"
      />
      <div className="card-body py-4">
        <p className="card-text">
          <strong>{name}</strong>
          <br />
          <span className="small">{title}</span>
        </p>
      </div>
    </div>
  </div>
);

export default OurCulture;
