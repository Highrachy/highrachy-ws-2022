import DownloadCompanyProfile from '@/components/common/DownloadCompanyProfile';
import FeatureCard from '@/components/common/FeatureCard';
import { MissionIcon } from '@/components/common/Icons';
import { VisionIcon } from '@/components/common/Icons';
import ImageBlock from '@/components/common/ImageBlock';
import Section from '@/components/common/Section';
import Shape from '@/components/common/Shape';
import BusinessRelationships from '@/components/layout/BusinessRelationships';
import Footer from '@/components/layout/Footer';
import { SectionHeader } from '@/components/layout/Header';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { welcomeNote, welcomeNoteLeadText } from '@/data/about-us';
import { about } from '@/data/navigation';
import projects from '@/data/projects';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import React from 'react';

const AboutUs = () => {
  return (
    <>
      <NextSeo
        title="About Highrachy"
        description="Highrachy is a 21st century project-oriented organization setup
        primarily to meet your real estate needs."
        canonical="https://www.highrachy.com/about-us"
      />
      <Navigation parentPage={about.url} />
      <PageHeader title="About Us" bgImage="/assets/img/bg/about-us.jpg" />
      <OurCompany />
      <MissionAndVision />
      <ValuePreposition />
      <BusinessRelationships />
      <Footer />
    </>
  );
};

const OurCompany = () => (
  <Section title="Our Company">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-6 pe-lg-6">
          <p className="text lead pt-3">{welcomeNote}</p>
          <p className="lead fw-bold">{welcomeNoteLeadText}</p>
          <DownloadCompanyProfile />
        </div>
        <div className="col-lg-6 col-md-6 mt-lg-n7">
          <Image
            src="/assets/img/about-us/our-company.svg"
            className="img-fluid d-block"
            height={800}
            width={800}
            alt="Our Company"
          />
        </div>
      </div>
    </div>
  </Section>
);

const ValuePreposition = () => (
  <Section>
    <ImageBlock title={projects[0].title} image={projects[0].image}>
      <SectionHeader small>Value Proposition</SectionHeader>
      <p className="text pt-3">
        Our tested methodology perfectly harnesses the individual skill sets of
        our team by stricking a ballance between design and technology to ensure
        that you are WOWed. All these promises delivered via impeccable services
        make Highrachy the number one choice for your real estate requirements.
      </p>
    </ImageBlock>
  </Section>
);

const MissionAndVision = () => (
  <Section altBg>
    <div className="container mb-6">
      <div className="row">
        <div className="offset-lg-1 col-lg-10">
          <div className="row">
            <FeatureCard icon={<VisionIcon />} title="Our Vision">
              To be globally recognised as the access point for real
              opportunities within the African Real Estate industry.
            </FeatureCard>
            <FeatureCard icon={<MissionIcon />} title="Our Mission">
              To avail people from across the globe with convenient access to
              value driven real estate opportunities with keen focus on quality,
              comfort and value for money.
            </FeatureCard>
          </div>
        </div>
      </div>
    </div>
    <Shape />
  </Section>
);

export default AboutUs;
