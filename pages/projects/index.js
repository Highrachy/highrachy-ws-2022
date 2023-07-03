import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import ProjectList from '@/components/layout/ProjectList';
import { projects } from '@/data/navigation';
import React from 'react';
import { NextSeo } from 'next-seo';

const Projects = () => {
  return (
    <>
      <NextSeo
        title="Our Projects"
        description="Highrachy is a 21st century project-oriented organization setup
        primarily to meet your real estate needs."
        canonical="https://www.highrachy.com/projects"
      />
      <Navigation parentPage={projects.url} />
      <PageHeader title="Our Projects" bgImage="/assets/img/bg/projects.jpg" />
      <ProjectList />
      <Footer />
    </>
  );
};

export default Projects;
