import FeatureCard from '@/components/common/FeatureCard';
import { MissionIcon } from '@/components/common/Icons';
import { VisionIcon } from '@/components/common/Icons';
import Section from '@/components/common/Section';
import BusinessRelationships from '@/components/layout/BusinessRelationships';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import ProjectList from '@/components/layout/ProjectList';
import { our_team } from '@/data/team';
import React from 'react';

const OurTeam = () => {
  return (
    <>
      <Navigation />
      <PageHeader
        title="Our Team"
        bgImage="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
      />
      <TheTeam />
      <MissionAndVision />
      <ProjectList isSlideshow />
      <BusinessRelationships />
      <Footer />
    </>
  );
};

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

export const TheTeam = () => (
  <Section title="Our Team">
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

export default OurTeam;
