import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import Parallax from '@/components/common/Parallax';
import Section from '@/components/common/Section';

export default function NotFound() {
  return (
    <>
      <Navigation />
      <Parallax bgImage="/assets/img/bg/404.jpg">
        <Section className="text-center">
          <div className="container">
            <div className="row">
              <div className="container text-center py-5">
                <div className="h1 header-404 text-white">404</div>
                <h4 className="text-white">
                  Ooopps.! The Page you were looking for, couldn&apos;t be
                  found.
                </h4>
              </div>
            </div>
          </div>
        </Section>
      </Parallax>

      <Footer hideConsultation />
    </>
  );
}
