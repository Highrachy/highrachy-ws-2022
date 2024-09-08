import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ITyped from 'react-ityped';
import Image from 'next/image';
import { shimmer, toBase64 } from 'helpers/image';
import Button from '../forms/Button';
import Section from '../common/Section';
import { Autoplay, EffectCube, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

const STRINGS = ['Expert', 'Specialist', 'Professional'];

const WelcomeArea = () => (
  <Section noPaddingTop>
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-5 col-md-7 col-sm-12 align-self-center mt-5">
          <h1 className="h2">
            Industry Leading <br />
            Solutions{' '}
            <span className="text-danger">
              <ITyped
                className="d-inline"
                showCursor={false}
                strings={STRINGS}
                typeSpeed={50}
                backSpeed={30}
                startDelay={100}
                backDelay={2500}
              />
            </span>
          </h1>
          <p className="lead my-3">
            Highrachy is a 21st century project-oriented organization setup
            primarily to meet your real estate needs.
          </p>
          <Button color="primary" href="/contact-us" className="mb-6">
            Let’s Work Together
          </Button>
        </div>
        <div className="offset-lg-1 col-lg-6 col-md-5 col-sm-12 align-self-center img-wrapper">
          <Swiper
            effect={'cube'}
            grabCursor={true}
            cubeEffect={{
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            }}
            pagination={true}
            modules={[Autoplay, EffectCube, Pagination]}
            className="mySwiper"
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
          >
            {[1, 2, 3].map((index) => (
              <SwiperSlide key={index}>
                <section className="position-relative">
                  <div className="hero-description">
                    <h5 className="mb-0 me-2">Blissville Terraces</h5>
                    <p className="mb-0">Starting from ₦135 Million</p>
                  </div>
                  <Image
                    src={'/assets/img/slides/bvt-' + index + '.jpg'}
                    className="rounded Tilt-inner"
                    width="615"
                    height="607"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(554, 554)
                    )}`}
                    alt="Blissville Terraces"
                  />
                </section>
                )
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  </Section>
);

export default WelcomeArea;
