import CircleBackground from '@/components/common/CircleBackground';
import Parallax from '@/components/common/Parallax';
import ServicesList from '@/components/layout/ServicesList';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import ProjectList from '@/components/layout/ProjectList';
import WelcomeArea from '@/components/layout/WelcomeArea';

export default function Home() {
  return (
    <>
      <CircleBackground />
      <Navigation />
      <WelcomeArea />
      <ServicesList />
      <ProjectList />
      <Parallax bgImage="https://radiustheme.com/demo/html/techkit/assets/images/bg/contact-bg.jpg" />
      <Footer />
    </>
  );
}
