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
      {projects.map(({ title, image, content }) => (
        <Carousel.Item key={title}>
          <ImageBlock title={title} image={image}>
            <h5 className="mb-0 text-gray">{title}</h5>
            <p className="text pt-3">{humanize.truncate(content, 200)}</p>
            <Link href="/contact-us" passHref>
              <a>View More</a>
            </Link>
          </ImageBlock>
        </Carousel.Item>
      ))}
    </Carousel>
  </Section>
);

const isAltBg = (index) => (index + 1) % 2 === 0;

const ProjectListGrid = () => {
  return (
    <Section title="Our Projects">
      {projects.map(({ title, image, content }, index) => (
        <Section key={title} noPaddingTop={index === 0} altBg={isAltBg(index)}>
          <ImageBlock title={title} image={image} altBg={isAltBg(index)}>
            <h5 className="mb-0 text-gray">{title}</h5>
            <p className="text pt-3">{humanize.truncate(content, 200)}</p>
            <Link href="/contact-us" passHref>
              <a>View More</a>
            </Link>
          </ImageBlock>
        </Section>
      ))}
    </Section>
  );
};

export default ProjectList;
