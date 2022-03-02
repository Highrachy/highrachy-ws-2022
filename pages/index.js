import CircleBackground from '@/components/common/CircleBackground';
import { ServicesListCard } from '@/components/layout/ServicesList';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import ProjectList from '@/components/layout/ProjectList';
import WelcomeArea from '@/components/layout/WelcomeArea';
import BusinessRelationships from '@/components/layout/BusinessRelationships';
import { home } from '@/data/navigation';
import { NextSeo } from 'next-seo';

export default function Home() {
  return (
    <>
      <NextSeo
        title="Welcome to Highrachy"
        description="Highrachy is a 21st century project-oriented organization setup
        primarily to meet your real estate needs."
        canonical="https://www.highrahcy.com/"
      />
      <CircleBackground />
      <Navigation parentPage={home.url} />
      <WelcomeArea />
      <ServicesListCard />
      <ProjectList isSlideshow />
      <BusinessRelationships topClientsOnly />
      <Footer />
    </>
  );
}
