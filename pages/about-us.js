import FeatureCard from '@/components/common/FeatureCard';
import { ConsultingIcon } from '@/components/common/Icons';
import { MissionIcon } from '@/components/common/Icons';
import { VisionIcon } from '@/components/common/Icons';
import { TechnologyIcon } from '@/components/common/Icons';
import ImageBlock from '@/components/common/ImageBlock';
import Section from '@/components/common/Section';
import Shape from '@/components/common/Shape';
import BusinessRelationships from '@/components/layout/BusinessRelationships';
import Footer from '@/components/layout/Footer';
import { SectionHeader } from '@/components/layout/Header';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { welcomeNote, welcomeNoteLeadText } from '@/data/about-us';
import projects from '@/data/projects';
import { our_team } from '@/data/team';
import Image from 'next/image';
import React from 'react';

const AboutUs = () => {
  return (
    <>
      <Navigation />
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
        <div className="col-lg-7 col-md-6 pe-lg-6">
          <p className="text lead pt-3">{welcomeNote}</p>
          <p className="lead fw-bold">{welcomeNoteLeadText}</p>
        </div>
        <div className="col-lg-5 col-md-6 mt-lg-n6">
          <Image
            src="/assets/img/about-us/our-company.png"
            className="img-fluid d-block"
            height={396}
            width={598}
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
      <SectionHeader small>Value Preposition</SectionHeader>
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
              To be a globally known one-stop-shop for value within the real and
              technology industries.
            </FeatureCard>
            <FeatureCard icon={<MissionIcon />} title="Our Mission">
              To continuously enhance your lives be it home or work by providing
              technology and real investments solutions and ensuring seamless
              objective delivery via Project Management consultancy.
            </FeatureCard>
          </div>
        </div>
      </div>
    </div>
    <Shape />
  </Section>
);

export default AboutUs;
