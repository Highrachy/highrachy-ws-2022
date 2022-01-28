import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import ProjectList from '@/components/layout/ProjectList';
import { projects } from '@/data/navigation';
import React from 'react';

const Services = () => {
  return (
    <>
      <Navigation parentPage={projects.url} />
      <PageHeader title="Our Projects" bgImage="/assets/img/bg/projects.jpg" />
      <ProjectList />
      <Footer />
    </>
  );
};

export default Services;
