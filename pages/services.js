import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import SolutionsList from '@/components/layout/SolutionsList';
import React from 'react';

const Services = () => {
  return (
    <>
      <Navigation />
      <PageHeader
        title="Our Services"
        bgImage="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
      />
      <SolutionsList />
      <Footer />
    </>
  );
};

export default Services;
