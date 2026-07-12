import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import Parallax from '@/components/common/Parallax';
import Section from '@/components/common/Section';
import SEOHead from '@/components/utils/SEOHead';

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="Page Not Found"
        description="The requested page could not be found on Highrachy."
        canonical="https://www.highrachy.com/404"
        noindex
        nofollow
      />
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
