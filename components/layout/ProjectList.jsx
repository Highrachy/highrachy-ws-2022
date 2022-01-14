import projects from '@/data/projects';
import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import { SectionHeader } from './Header';
import Humanize from 'humanize-plus';
import Section from '../common/Section';
import Link from 'next/link';

const ProjectList = () => {
  return (
    <Section title="Our Projects" centered>
      <Carousel>
        {projects.map(({ title, image, content }) => (
          <Carousel.Item key={title}>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-12 align-self-center">
                  <Image
                    src={image}
                    className="img-fluid d-block rounded"
                    height={800}
                    width={1200}
                    alt={title}
                  />
                </div>
                <div className="col-lg-4 col-md-8 col-sm-12 align-self-center">
                  <h4>{title}</h4>
                  <p className="text-lg">{Humanize.truncate(content, 200)}</p>
                  <Link href="/contact-us" passHref>
                    <a>View More</a>
                  </Link>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Section>
  );
};

export default ProjectList;

// .btn-with-ball .btn-ball {
//   display: inline-block;
//   width: 6px;
//   height: 6px;
//   margin-left: 20px;
//   vertical-align: middle;
//   background-color: currentColor;
//   border-radius: 100%
// }
