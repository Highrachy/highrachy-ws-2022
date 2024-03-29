import NeedConsultation from '@/components/common/NeedConsultation';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import ServicesList from '@/components/layout/ServicesList';
import { services } from '@/data/navigation';
import { NextSeo } from 'next-seo';
import React from 'react';

const Services = () => {
  return (
    <>
      <NextSeo
        title="Our Services | Real Estate, Consulting, Technology, and Investment"
        description="Give yourself the gift of true value driven by quality for a better tomorrow with us."
        canonical="https://www.highrachy.com/services"
      />
      <Navigation parentPage={services.url} />
      <PageHeader title="Our Services" bgImage="/assets/img/bg/services.jpg" />
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
