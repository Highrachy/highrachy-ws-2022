import NeedConsultation from '@/components/common/NeedConsultation';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import ServicesList from '@/components/layout/ServicesList';
import React from 'react';

const Services = () => {
  return (
    <>
      <Navigation />
      <PageHeader
        title="Our Services"
        bgImage="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
      />
      <ServicesList />
      <NeedConsultation
        text="Expand your wealth today with wonderful returns on your investment."
        header="Access an array of opportunities within the real estate industry today"
        buttonText="Invest Now"
      />
      <Footer hideConsultation />
    </>
  );
};

export default Services;
