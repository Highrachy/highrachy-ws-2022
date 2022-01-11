import Image from 'next/image';
import React from 'react';
import { SectionHeader } from '../common/Header';
import Shape from '../common/Shape';

const ProjectList = () => {
  const title = 'Project List';
  const image =
    'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80';
  return (
    <section className="py-7 bg-light">
      <div className="container">
        <SectionHeader center className="mb-6">
          Our Projects
        </SectionHeader>
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-12 align-self-center position-relative">
            <Image
              src={image}
              className="img-fluid d-block rounded"
              height={800}
              width={1200}
              alt={title}
            />
          </div>
          <div className="col-lg-4 col-md-8 col-sm-12 align-self-center position-relative">
            <h4>BlissVille</h4>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quam
              consectetur assumenda excepturi maiores pariatur.
            </p>
            <a href="#">View More</a>
          </div>
        </div>
      </div>
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
