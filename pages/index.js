import CircleBackground from '@/components/common/CircleBackground';
import FeatureList from '@/components/layout/FeatureList';
import Navigation from '@/components/layout/Navigation';
import WelcomeArea from '@/components/layout/WelcomeArea';

export default function Home() {
  return (
    <>
      <CircleBackground />
      <Navigation />
      <WelcomeArea />
      <FeatureList />
    </>
  );
}
