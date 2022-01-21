import classNames from 'classnames';
import solutions from 'data/solutions';
import Image from 'next/image';
import React from 'react';
import AngleList from '../common/AngleList';
import Section from '../common/Section';
import { SectionHeader } from './Header';

const SolutionsImage = ({ altBg, title, image }) => (
  <div
    className={classNames(
      'col-md-4 col-sm-12 align-self-center position-relative',
      {
        'order-md-first': !!altBg,
        'order-md-last': !altBg,
      }
    )}
  >
    <Image
      src={image}
      className="img-fluid d-block"
      height={500}
      width={360}
      alt={title}
    />
  </div>
);

const SolutionsContent = ({ altBg, content, title, list }) => (
  <div
    className={classNames('col-md-8 col-sm-12 align-self-center', {
      'order-md-first': !altBg,
      'order-md-last': !!altBg,
    })}
  >
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
    <Section altBg={alternate}>
      <div className="container">
        <div className="row">
          <>
            <SolutionsContent {...props} altBg={alternate} />
            <SolutionsImage {...props} altBg={alternate} />
          </>
        </div>
      </div>
    </Section>
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
