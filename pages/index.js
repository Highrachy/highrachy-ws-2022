import CircleBackground from '@/components/common/CircleBackground';
import ServicesList from '@/components/layout/ServicesList';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import ProjectList from '@/components/layout/ProjectList';
import WelcomeArea from '@/components/layout/WelcomeArea';
import BusinessRelationships from '@/components/layout/BusinessRelationships';

export default function Home() {
  return (
    <>
      <CircleBackground />
      <Navigation />
      <WelcomeArea />
      <ServicesList />
      <ProjectList isSlideshow />
      <BusinessRelationships topClientsOnly />
      <Footer />
    </>
  );
}
