import CircleBackground from '@/components/common/CircleBackground';
import ServicesList from '@/components/layout/ServicesList';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import ProjectList from '@/components/layout/ProjectList';
import WelcomeArea from '@/components/layout/WelcomeArea';
import Consultation from '@/components/layout/Consultation';

export default function Home() {
  return (
    <>
      <CircleBackground />
      <Navigation />
      <WelcomeArea />
      <ServicesList />
      <ProjectList />
      <Consultation />
      <Footer />
    </>
  );
}
