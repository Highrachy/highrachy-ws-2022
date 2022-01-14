import classNames from 'classnames';
import React from 'react';
import { SectionHeader } from '../layout/Header';

const Section = ({
  children,
  title,
  className,
  centered,
  altBg,
  noPaddingTop,
  noPaddingBottom,
}) => {
  return (
    <section
      className={classNames(className, 'position-relative', {
        'bg-light': altBg,
        'py-7': !noPaddingBottom && !noPaddingTop,
        'pt-7': noPaddingBottom,
        'pb-7': noPaddingTop,
      })}
    >
      {title && (
        <div className="container">
          <SectionHeader
            center={!!centered}
            className={classNames({ 'mb-6': centered, 'mb-3': !centered })}
          >
            {title}
          </SectionHeader>
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;
