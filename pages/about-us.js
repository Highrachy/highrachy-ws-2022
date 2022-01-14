import Section from '@/components/common/Section';
import { SectionHeader } from '@/components/layout/Header';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import WelcomeArea from '@/components/layout/WelcomeArea';
import React from 'react';

const breadcrumb = [
  { title: 'About Us', url: 'test' },
  { title: 'Our Culture' },
];
const AboutUs = () => {
  return (
    <div>
      <Navigation />
      <PageHeader title="About Us" breadcrumb={breadcrumb} />
      <Section title="Our Company">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus totam possimus magnam, consequatur animi quos
              voluptatibus minima fugit cum, autem ipsa eius, voluptatum eveniet
              eum quam? Beatae incidunt repudiandae rem veniam voluptate ratione
              distinctio libero corrupti aut optio soluta eveniet, velit
              delectus. Maiores tenetur cumque, nesciunt voluptate amet
              similique necessitatibus?
            </div>
          </div>
        </div>
      </Section>

      <WelcomeArea />
    </div>
  );
};

export default AboutUs;
