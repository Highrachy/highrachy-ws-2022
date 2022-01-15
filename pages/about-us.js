import FeatureCard from '@/components/common/FeatureCard';
import { ConsultingIcon } from '@/components/common/Icons';
import { MissionIcon } from '@/components/common/Icons';
import { VisionIcon } from '@/components/common/Icons';
import { TechnologyIcon } from '@/components/common/Icons';
import ImageBlock from '@/components/common/ImageBlock';
import Section from '@/components/common/Section';
import BusinessRelationships from '@/components/layout/BusinessRelationships';
import Footer from '@/components/layout/Footer';
import { SectionHeader } from '@/components/layout/Header';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import projects from '@/data/projects';
import Image from 'next/image';
import React from 'react';

const AboutUs = () => {
  return (
    <>
      <Navigation />
      <PageHeader
        title="About Us"
        bgImage="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
      />
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
        <div className="col-sm-7">
          <p>
            Far from a mere technology company, we are a solutions company that
            goes way beyond solving problems as identified by you, but also
            constantly enhancing your lives, lifestyles and living.
          </p>
          Our solutions are inspired by ideas that promise more convenience,
          comfort, security, safety, income and plain fun just for YOU.
          <p></p>
          <p>
            A real estate partner you can trust. Our research and development
            (R&amp;D) team ensures that your returns on investing with us is
            guaranteed.
          </p>
        </div>
        <div className="col-sm-4 offset-sm-1">
          <Image
            src="/assets/svg/our-culture.svg"
            className="img-fluid d-block"
            height={790}
            width={980}
            alt="Our Culture"
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
    <div className="container">
      <div className="row">
        <div className="offset-md-1 col-md-10">
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
  </Section>
);

export default AboutUs;
