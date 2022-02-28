import React from 'react';
import ITyped from 'react-ityped';
import { AnimatePresence, motion } from 'framer-motion';
import Tilt from 'react-tilt';
import Image from 'next/image';
import { shimmer, toBase64 } from 'helpers/image';
import Button from '../forms/Button';
import Section from '../common/Section';

const IMAGE_LIST = [
  '/assets/img/slides/3.jpg',
  '/assets/img/slides/1.png',
  '/assets/img/slides/2.jpg',
  '/assets/img/slides/4.png',
];

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
            See It In Action
          </Button>
        </div>
        <div className="offset-lg-1 col-lg-6 col-md-5 col-sm-12 align-self-center">
          {(
            <Image
              src="/assets/img/slides/hero-image.jpg"
              className="rounded Tilt-inner"
              width="554"
              height="554"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(554, 554)
              )}`}
              alt="Hero Image"
            />
          ) || <ImageListSection />}
        </div>
      </div>
    </div>
  </Section>
);

export const ImageListSection = () => {
  const [currentImage, setCurrentImage] = React.useState(null);

  const onClick = ({ src, name }) =>
    src ? setCurrentImage({ src, name }) : setCurrentImage(null);

  return (
    <>
      <motion.section className="position-relative row g-2" layout>
        <AnimatePresence initial={false}>
          <div key="image-list__col-1" className="col-6">
            {[0, 1].map((index) => (
              <SingleImage
                key={index}
                name={`image-list-${index}`}
                tall={index === 0}
                src={IMAGE_LIST[index]}
                onClick={onClick}
              />
            ))}
          </div>
          <div key="image-list__col-2" className="col-6">
            {[2, 3].map((index) => (
              <SingleImage
                key={index}
                name={`image-list-${index}`}
                tall={index === 3}
                src={IMAGE_LIST[index]}
                onClick={onClick}
              />
            ))}
          </div>

          <BigSingleImage
            src={currentImage?.src}
            name={currentImage?.name}
            onClick={onClick}
          />
        </AnimatePresence>
      </motion.section>
    </>
  );
};

const SingleImage = ({ tall, src, name, onClick }) => {
  const height = tall ? 350 : 210;
  const width = 300;

  return (
    <motion.div
      key={name}
      layoutId={name}
      onClick={() => onClick({ src, name })}
    >
      <Tilt className="Tilt" options={{ max: 25, scale: 1.01 }}>
        <Image
          src={src}
          className="rounded Tilt-inner"
          height={height}
          width={width}
          alt="welcome area image"
        />
      </Tilt>
    </motion.div>
  );
};

const BigSingleImage = ({ src, name, onClick }) => {
  if (!src) return null;
  return (
    <motion.div
      className="position-absolute"
      layoutId={name}
      onClick={() => onClick({})}
    >
      <Tilt className="Tilt" options={{ max: 25, scale: 1.01 }}>
        <Image
          src={src}
          className="rounded Tilt-inner"
          width="554"
          height="524"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(554, 524)
          )}`}
          alt="testing"
          placeholder="blur"
        />
      </Tilt>
    </motion.div>
  );
};

export default WelcomeArea;
