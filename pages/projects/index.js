import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import ProjectList from '@/components/layout/ProjectList';
import { projects } from '@/data/navigation';
import React from 'react';
import { NextSeo } from 'next-seo';
import SEOHead from '@/components/utils/SEOHead';

const Projects = () => {
  return (
    <>
      <SEOHead
        title="Our Projects"
        description="Explore Highrachy’s portfolio of completed and ongoing real estate projects."
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
