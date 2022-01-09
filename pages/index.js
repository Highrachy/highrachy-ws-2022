import CircleBackground from '@/components/common/CircleBackground';
import FeatureList from '@/components/layout/FeatureList';
import Navigation from '@/components/layout/Navigation';
import ServiceList from '@/components/layout/SolutionsList';
import WelcomeArea from '@/components/layout/WelcomeArea';

export default function Home() {
  return (
    <>
      <CircleBackground />
      <Navigation />
      <WelcomeArea />
      <FeatureList />
      <ServiceList />
    </>
  );
}
