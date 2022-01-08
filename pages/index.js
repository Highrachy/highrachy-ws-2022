import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  Button,
  Container,
  Modal as BModal,
  Nav,
  Navbar,
} from 'react-bootstrap';
import ITyped from 'react-ityped';
import Tilt from 'react-tilt';

export default function Home() {
  return (
    <>
      <TopCircle />
      <Header />
      <WelcomeArea />
    </>
  );
}

const Header = () => (
  <Navbar bg="transparent" expand="lg">
    <Container>
      <Navbar.Brand href="#">
        <Image src="/logo.png" alt="Highrachy" width="169" height="50" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="ms-auto">
          <Nav.Link href="#action1">Home</Nav.Link>
          <Nav.Link href="#action2">About Us</Nav.Link>
          <Nav.Link href="#action2">Expertise</Nav.Link>
          <Nav.Link href="#action2">Solutions</Nav.Link>
          <Nav.Link href="#action2">Projects</Nav.Link>
          <Nav.Link href="#action2" className="pe-0">
            Contact Us
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

const TopCircle = () => (
  <div
    className="rounded-circle d-inline-block position-absolute"
    style={{
      position: 'absolute',
      width: '849px',
      height: '849px',
      left: '-170px',
      top: '-149px',
      background: '#FAFAFA',
      zIndex: '-1',
    }}
  ></div>
);

const WelcomeArea = () => {
  const strings = ['Expert', 'Specialist', 'Professional'];

  return (
    <div className="welcome-area h-100" id="welcome">
      {/* ***** Header Text Start ***** */}
      <div className="header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12 col-sm-12 align-self-center">
              <h1 className="h2">
                Industry Leading Solutions{' '}
                <span className="text-danger">
                  <ITyped
                    className="d-inline"
                    showCursor={false}
                    strings={strings}
                    typeSpeed={50}
                    backSpeed={50}
                    startDelay={100}
                    backDelay={2000}
                  />
                </span>
              </h1>
              <p className="lead">
                Welcome to Highrachy, a 21st century project oriented firm
                determined to meet your real estate and technological needs.
              </p>
              <button type="button" href="#" className="btn btn-primary pt-2">
                Let’s Work Together
              </button>
            </div>
            <div className="offset-lg-1 col-lg-6 col-md-12 col-sm-12 align-self-center">
              <ImageList />
            </div>
          </div>
        </div>
      </div>
      {/* ***** Header Text End ***** */}
    </div>
  );
};

export const ImageList = () => {
  const [currentImage, setCurrentImage] = React.useState(null);

  const onClick = ({ src, name }) => {
    console.log(`in onClick`, src, name);
    if (src) {
      setCurrentImage({ src, name });
    } else {
      setCurrentImage(null);
    }
  };

  return (
    <>
      <motion.section
        className="position-relative row g-2"
        style={{ width: '554px', height: '524px' }}
        layout
      >
        <AnimatePresence initial={false}>
          <>
            <div className="col-6">
              <TestImage
                key="1"
                name="1"
                tall
                src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                onClick={onClick}
              />
              <TestImage
                key="2"
                name="2"
                src="https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80"
                onClick={onClick}
              />
            </div>
            <div className="col-6">
              <TestImage
                key="3"
                name="3"
                src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                onClick={onClick}
              />
              <TestImage
                key="4"
                name="4"
                tall
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80"
                onClick={onClick}
              />
            </div>
          </>
          {currentImage && (
            <ImageList2
              src={currentImage.src}
              name={currentImage.name}
              onClick={onClick}
            />
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
};

const ImageList2 = ({ src, name, onClick }) => {
  return (
    <motion.div
      className="position-absolute"
      layoutId={name}
      // style={{ height: '524px' }}
      onClick={() => onClick({})}
      animate={{ scale: [1, 1.01, 1], transition: { type: 'crossfade' } }}
      exit={{ scale: [1.01, 1.01, 1] }}
    >
      <Tilt className="Tilt" options={{ max: 25, scale: 1.01 }}>
        <Image
          src={src}
          className="rounded Tilt-inner"
          width="554"
          height="524"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(1200, 800)
          )}`}
          alt="testing"
          placeholder="blur"
        />
      </Tilt>
    </motion.div>
  );
};

const TestImage = ({ tall, src, name, onClick }) => {
  const height = tall ? 350 : 210;
  const width = '300';
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
          // blurDataURL={`data:image/svg+xml;base64,${toBase64(
          //   shimmer(width, height)
          // )}`}
          alt="testing"
          // placeholder="blur"
        />
      </Tilt>
    </motion.div>
  );
};

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const Modal = ({ children, content }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <BModal
          size="sm"
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <BModal.Header closeButton>
            <BModal.Title id="example-modal-sizes-title-sm">
              Small Modal
            </BModal.Title>
          </BModal.Header>
          <BModal.Body>{content}</BModal.Body>
        </BModal>
      )}
      <span onClick={() => setShowModal(true)}>{children}</span>
    </>
  );
};

// const ImageModal = ({ children, content, name }) => {
//   return (
//     <>
//       {showModal ? (
//         <AnimatePresence>
//           <motion.div
//             style={{
//               width: '50vw',
//               height: '50vh',
//               position: 'absolute',
//             }}
//             layoutId={name}
//             animate={{ scale: [1, 1.01, 1] }}
//             exit={{ scale: [1.01, 1.01, 1] }}
//           >
//             {content}
//           </motion.div>
//         </AnimatePresence>
//       ) : (
//         <span onClick={() => setShowModal(true)}>{children}</span>
//       )}
//     </>
//   );
// };
