import projects from '@/data/projects';
import React from 'react';
import { Badge, Carousel, Image } from 'react-bootstrap';
import Section from '../common/Section';
import Link from 'next/link';
import ImageBlock from '../common/ImageBlock';
import humanize from 'humanize-plus';
import { FaExternalLinkAlt, FaMapMarkerAlt } from 'react-icons/fa';

const ProjectList = ({ isSlideshow }) => {
  return isSlideshow ? <ProjectListCarousel /> : <ProjectListGrid />;
};

const ProjectListCarousel = () => (
  <Section title="Our Projects" centered>
    <Carousel>
      {projects.map((props, index) => (
        <Carousel.Item key={index}>
          <ProjectCardOld {...props} index={index} />
        </Carousel.Item>
      ))}
    </Carousel>
  </Section>
);

const isAltBg = (index) => (index + 1) % 2 === 0;

const ProjectListGrid = () => {
  return (
    <Section title="Our Projects">
      <div className="container">
        <p className="lead mt-4 mb-6">
          Actualize the dream of acquiring a property, readily tailored to suit
          your peculiar taste with the specific finishing details you desire.
          Highrachy aims to meet the needs of communities and individuals we
          work with. Our properties are available to anyone who wants to feature
          modern and stylish designs and first-class amenities that support a
          convenient and peaceful lifestyle.
        </p>
        <div className="row g-4">
          {projects.map((project, i) => (
            <div key={i} className="col-md-6">
              <ProjectCard {...project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const ProjectCard = (project) => {
  const { image, title, description, content, status, year } = project;

  return (
    <div className="card border-0 rounded-3 shadow-sm overflow-hidden h-100 project-card">
      <div className="position-relative">
        <Image
          src={image}
          alt={title}
          width={800}
          height={500}
          className="w-100 object-fit-cover"
        />

        {/* Category badge (top-left) */}
        {status && (
          <Badge
            bg="light"
            text="dark"
            className="position-absolute top-0 start-0 m-3 px-3 py-2 fw-semibold rounded-pill"
          >
            {status}
          </Badge>
        )}

        {/* Year badge (top-right) */}
        {year && (
          <Badge
            bg="dark"
            className="position-absolute top-0 end-0 m-3 px-3 py-2 fw-semibold rounded-pill"
          >
            {year}
          </Badge>
        )}

        {/* Overlay description */}
        {description && (
          <div className="position-absolute bottom-0 start-0 end-0 p-3 project-overlay">
            <p className="text-white small mb-0">{description}</p>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="card-body bg-white">
        <h5 className="fw-semibold mb-1">{title}</h5>
        <p className="text pt-3">{humanize.truncate(content, 200)}</p>

        <Link
          passHref
          href={{
            pathname: '/projects/[projectTitle]',
            query: { projectTitle: title },
          }}
        >
          <a>Learn More</a>
        </Link>
        <p>&nbsp;</p>

        {/* <div className="d-flex justify-content-between small text-uppercase fw-semibold">
          <div>
            <div className="text-muted">Area</div>
            <div className="text-dark">{area}</div>
          </div>
          <div className="text-end">
            <div className="text-muted">Value</div>
            <div className="text-dark">{value}</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

const ProjectCardOld = ({
  title,
  content,
  image,
  externalLink,
  status,
  index,
  useAltBg,
}) => (
  <ImageBlock title={title} image={image} altBg={useAltBg && isAltBg(index)}>
    <h5 className="mb-0 text-gray">{title}</h5>
    {status && <span className="ongoing-label">{status}</span>}
    <p className="text pt-3">{humanize.truncate(content, 200)}</p>
    <Link
      passHref
      href={{
        pathname: '/projects/[projectTitle]',
        query: { projectTitle: title },
      }}
    >
      <a>Learn More</a>
    </Link>
  </ImageBlock>
);

export default ProjectList;
