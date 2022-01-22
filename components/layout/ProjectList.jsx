import projects from '@/data/projects';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import Section from '../common/Section';
import Link from 'next/link';
import ImageBlock from '../common/ImageBlock';
import humanize from 'humanize-plus';

const ProjectList = ({ isSlideshow }) => {
  return isSlideshow ? <ProjectListCarousel /> : <ProjectListGrid />;
};

const ProjectListCarousel = () => (
  <Section title="Our Projects" centered>
    <Carousel>
      {projects.map((props, index) => (
        <Carousel.Item key={index}>
          <ProjectCard {...props} index={index} />
        </Carousel.Item>
      ))}
    </Carousel>
  </Section>
);

const isAltBg = (index) => (index + 1) % 2 === 0;

const ProjectListGrid = () => {
  return (
    <Section title="Our Projects">
      {projects.map((props, index) => (
        <Section key={index} noPaddingTop={index === 0} altBg={isAltBg(index)}>
          <ProjectCard useAltBg {...props} index={index} />
        </Section>
      ))}
    </Section>
  );
};

const ProjectCard = ({ title, content, image, index, useAltBg }) => (
  <ImageBlock title={title} image={image} altBg={useAltBg && isAltBg(index)}>
    <h5 className="mb-0 text-gray">{title}</h5>
    <p className="text pt-3">{humanize.truncate(content, 200)}</p>
    <Link
      passHref
      href={{
        pathname: '/projects/[project]',
        query: { project: title },
      }}
    >
      <a>Learn More</a>
    </Link>
  </ImageBlock>
);

export default ProjectList;
