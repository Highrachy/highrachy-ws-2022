import classNames from 'classnames';
import React from 'react';
import { HeaderUnderBlock } from '../layout/Header';

const Section = ({
  children,
  title,
  className,
  centered,
  altBg,
  noPaddingTop,
  noPaddingBottom,
  small,
  headerClassName,
  ...props
}) => {
  return (
    <section
      className={classNames(className, 'position-relative', {
        'bg-light': altBg,
        'py-6 py-lg-7': !noPaddingBottom && !noPaddingTop,
        'pt-6 pt-lg-7': noPaddingBottom,
        'pb-6 pb-lg-7': noPaddingTop,
      })}
      {...props}
    >
      {title && (
        <div className="container">
          <SectionHeader
            center={!!centered}
            className={classNames({
              'mb-md-6 mb-5': centered,
              'mb-3': !centered,
            })}
            headerClassName={headerClassName}
            small={small}
          >
            {title}
          </SectionHeader>
        </div>
      )}
      {children}
    </section>
  );
};

export const SectionHeader = ({
  children,
  className,
  center,
  headerClassName,
  small,
}) => (
  <header className={classNames(className, { 'text-center': center })}>
    <h3
      className={classNames(headerClassName, { 'h4 mb-0': small, h3: !small })}
    >
      {children}
    </h3>
    <HeaderUnderBlock small={small} />
  </header>
);

export default Section;
