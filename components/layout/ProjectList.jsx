import projects from '@/data/projects';
import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import { SectionHeader } from '../common/Header';
import Humanize from 'humanize-plus';

const ProjectList = () => {
  return (
    <section className="py-7">
      <SectionHeader center className="mb-6">
        Our Projects
      </SectionHeader>
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
                  <a href="#">View More</a>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
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
