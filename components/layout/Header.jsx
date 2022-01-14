import { home } from '@/data/navigation';
import Link from 'next/link';
import React from 'react';
import Parallax from '../common/Parallax';
import Section from '../common/Section';

export const SectionHeader = ({ children, className, center }) => (
  <header className={`${className} ${center ? 'text-center' : ''}`}>
    <h3 className="section-header">{children}</h3>
    <HeaderUnderBlock />
  </header>
);

export const HeaderUnderBlock = () => (
  <div className="header-block">
    <span className="header-block__1"></span>
    <span className="header-block__2"></span>
    <span className="header-block__3"></span>
  </div>
);

export const PageHeader = ({ title, breadcrumb }) => (
  <Parallax bgImage="https://radiustheme.com/demo/html/techkit/assets/images/bg/contact-bg.jpg">
    <Section className="text-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <h3 className="h2 text-white pb-5">{title}</h3>
            <BreadCrumb breadcrumb={breadcrumb} />
          </div>
        </div>
      </div>
    </Section>
  </Parallax>
);

export const BreadCrumb = ({ breadcrumb }) => {
  const paths = [home, ...breadcrumb];
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb justify-content-center">
        {paths.map(({ title, url }, index) => {
          const isLast = index === paths.length - 1;
          return (
            <li
              key={title}
              className={`breadcrumb-item text-white ${isLast ? 'active' : ''}`}
              {...(isLast ? {} : { 'aria-current': 'page' })}
            >
              {isLast ? (
                title
              ) : (
                <Link href={`/${url}`} passHref>
                  <a className="text-reset">{title}</a>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
