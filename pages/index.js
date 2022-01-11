import CircleBackground from '@/components/common/CircleBackground';
import FeatureList from '@/components/layout/FeatureList';
import Navigation from '@/components/layout/Navigation';
import ProjectList from '@/components/layout/ProjectList';
import ServiceList from '@/components/layout/SolutionsList';
import WelcomeArea from '@/components/layout/WelcomeArea';
// import dynamic from 'next/dynamic';
// import Cursor from 'react-custom-pointer';
// const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
//   ssr: false,
// });
// <AnimatedCursor
// innerSize={8}
// outerSize={8}
// color="193, 11, 111"
// outerAlpha={0.2}
// innerScale={0.7}
// outerScale={5}
// />
export default function Home() {
  return (
    <>
      <CircleBackground />
      <Navigation />
      <WelcomeArea />
      <FeatureList />
      <ServiceList />
      <ProjectList />
    </>
  );
}
