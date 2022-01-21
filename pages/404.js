import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import Parallax from '@/components/common/Parallax';
import Section from '@/components/common/Section';

export default function NotFound() {
  return (
    <>
      <Navigation />
      <Parallax bgImage="https://images.unsplash.com/photo-1625887022685-2ba48f557be6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80">
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
