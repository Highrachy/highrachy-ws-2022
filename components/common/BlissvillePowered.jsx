import Image from 'next/image';
import Section from './Section';

export default function BlissvillePowered() {
  return (
    <Section altBg centered>
      {/* <section className="blissville-powered py-6"> */}
      <div className="container">
        <div className="row align-items-center g-4 py-5">
          {/* Text content */}
          <div className="col-12 col-md-8">
            <h2 className="mb-3 h3">Blissville: Powered by Highrachy</h2>

            <p>
              <strong>Blissville</strong> is a premium residential brand proudly
              owned and powered by{' '}
              <strong>Highrachy Investment &amp; Technology Limited</strong>.
              Built on the pillars of{' '}
              <strong>Quality, Wellness, Innovation, and Sustainability</strong>
              , Blissville represents our commitment to smart, eco-friendly
              living.
            </p>

            <a
              href="https://www.blissville.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="fw-semibold text-decoration-none"
            >
              Explore Blissville Projects →
            </a>
          </div>

          {/* Logo */}
          <div className="col-12 col-md-4 text-md-end text-center">
            <Image
              src="/blissville-logo.png"
              alt="Blissville logo"
              className="img-fluid"
              height={111}
              width={400}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
