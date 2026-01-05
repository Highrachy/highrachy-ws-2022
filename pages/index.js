import CircleBackground from '@/components/common/CircleBackground';
import { ServicesListCard } from '@/components/layout/ServicesList';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import ProjectList from '@/components/layout/ProjectList';
import WelcomeArea from '@/components/layout/WelcomeArea';
import BusinessRelationships from '@/components/layout/BusinessRelationships';
import { home } from '@/data/navigation';
import { NextSeo } from 'next-seo';
import SEOHead from '@/components/utils/SEOHead';
import OrgSchema from '@/components/utils/OrgSchema';
import BlissvillePowered from '@/components/common/BlissvillePowered';

export default function Home() {
  return (
    <>
      <SEOHead
        title="Welcome to Highrachy - Real Estate & Project-Oriented Solutions"
        canonical="https://www.highrachy.com"
      />
      <OrgSchema />
      <CircleBackground />
      <Navigation parentPage={home.url} />
      <WelcomeArea />
      <ServicesListCard />
      <ProjectList isSlideshow />
      <BlissvillePowered />
      <BusinessRelationships topClientsOnly />
      <Footer />
    </>
  );
}
