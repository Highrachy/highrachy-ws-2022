import solutions from 'data/solutions';
import Image from 'next/image';
import React from 'react';
import AngleList from '../common/AngleList';
import { SectionHeader } from '../common/Header';

const SolutionsImage = ({ title, image }) => (
  <div className="col-lg-4 col-md-8 col-sm-12 align-self-center position-relative">
    <Image
      src={image}
      className="img-fluid d-block"
      height={500}
      width={360}
      alt={title}
    />
  </div>
);

const SolutionsContent = ({ content, title, list }) => (
  <div className="col-lg-8 col-md-8 col-sm-12 align-self-center">
    <SectionHeader className="mb-3">{title}</SectionHeader>

    <p className="text-lg">{content}</p>
    <div className="row">
      {list.map((item) => (
        <AngleList key={item} text={item} />
      ))}
    </div>
  </div>
);

const SingleSolutionsList = ({ alternate, ...props }) => {
  return (
    <section className={`py-7 ${alternate ? 'bg-light' : ''}`}>
      <div className="container">
        <div className="row">
          {alternate ? (
            <>
              <SolutionsImage {...props} />
              <SolutionsContent {...props} />
            </>
          ) : (
            <>
              <SolutionsContent {...props} />
              <SolutionsImage {...props} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const SolutionsList = () =>
  solutions.map((solution, index) => (
    <SingleSolutionsList
      key={index}
      {...solution}
      alternate={(index + 1) % 2 === 0}
    />
  ));

export default SolutionsList;
