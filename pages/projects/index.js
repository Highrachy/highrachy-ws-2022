import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import ProjectList from '@/components/layout/ProjectList';
import React from 'react';

const Services = () => {
  return (
    <>
      <Navigation />
      <PageHeader title="Our Projects" bgImage="/assets/img/bg/projects.jpg" />
      <ProjectList />
      <Footer />
    </>
  );
};

export default Services;
