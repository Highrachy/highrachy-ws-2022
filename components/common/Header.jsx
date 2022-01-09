import React from 'react';

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
