import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import ProjectList from '@/components/layout/ProjectList';
import { projects } from '@/data/navigation';
import React from 'react';
import SEOHead from '@/components/utils/SEOHead';
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import Button from '@/components/forms/Button';

const Projects = () => {
  return (
    <>
      <SEOHead
        title="Our Projects"
        description="Explore Highrachy’s portfolio of completed and ongoing real estate projects."
        canonical="https://www.highrachy.com/projects"
      />
      <Navigation parentPage={projects.url} />
      <BlissvilleTerracesHero />
      <ProjectList />
      <Footer />
    </>
  );
};

const BlissvilleTerracesHero = () => {
  return (
    <section className="hero-blissville">
      <Container fluid className="px-0">
        <Row className="g-0 align-items-center min-vh-100">
          {/* LEFT */}
          <Col lg={6} className="px-5 px-lg-6 py-5">
            <div className="hero-inner">
              {/* BADGE */}
              <span className="badge rounded-pill bg-dark-subtle text-dark fw-medium px-3 py-2 mb-4">
                Featured Project
              </span>

              {/* MAIN HEADING */}
              <h1 className="display-4 fw-medium mb-2">Blissville Terraces</h1>

              {/* SUB HEADING */}
              <p className="fw-semibold text-danger mb-4">
                <span className="text-muted">Smart Living.</span>&nbsp;
                <span className="text-danger">Prime Investment.</span>
              </p>

              {/* DESCRIPTION */}
              <p className="text-muted mb-4" style={{ maxWidth: 480 }}>
                A premium collection of 4-bedroom waterview tri-level terraces
                designed for modern living. Strategically located within
                Caribbean Lake City, offering strong long-term value in Lagos’
                fastest-growing corridor.
              </p>

              <div className="hero-investment my-5">
                <div className="d-flex gap-6">
                  {/* ROI */}
                  <div>
                    <div className="investment-value text-success">32%</div>
                    <small className="investment-label">
                      Projected Year 1 ROI
                    </small>
                  </div>

                  {/* TITLE */}
                  <div>
                    <div className="investment-value text-primary">C of O</div>
                    <small className="investment-label">
                      Secured Title Doc
                    </small>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="d-flex gap-3">
                <Button
                  color="danger"
                  href="https://www.blissville.com.ng/blissville-terraces"
                  className="px-4"
                  newTab
                >
                  View Project <FaArrowRight className="ms-2" />
                </Button>

                <Button
                  color="outline-dark"
                  href="https://www.blissville.com.ng/investors"
                  newTab
                >
                  Invest Now
                </Button>
              </div>
            </div>
          </Col>

          {/* RIGHT IMAGE */}
          <Col lg={6} className="position-relative hero-image-col">
            <div className="hero-image-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/img/projects/blissville-terraces.jpg"
                alt="Blissville Terraces"
                className="w-100 h-100 object-fit-cover"
              />
              {/* DARK OVERLAY */}
              <div className="hero-overlay"></div>
              {/* BOTTOM BAR */}
              <div className="hero-bottom-card d-flex justify-content-between align-items-center px-3 px-md-4 py-2 py-md-3">
                <div>
                  <div className="text-uppercase text-xs text-white-50">
                    Ongoing Development
                  </div>
                  <div className="text-white text-sm fw-semibold mt-n2">
                    Blissville Terraces
                  </div>
                </div>

                <div className="text-end">
                  <div className="text-uppercase text-xs text-white-50">
                    Delivery
                  </div>
                  <div className="text-white text-sm fw-semibold mt-n2">
                    In Progress
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Projects;
