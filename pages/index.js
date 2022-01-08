import Image from 'next/image';
import { Container, Nav, Navbar } from 'react-bootstrap';

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
      'z-index': '-1',
    }}
  ></div>
);

const WelcomeArea = () => (
  <div className="welcome-area h-100" id="welcome">
    {/* ***** Header Text Start ***** */}
    <div className="header-text">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-12 col-sm-12 align-self-center">
            <h1>
              Industry Leading Solutions &nbsp;
              <span className="text-danger">Expert</span>
            </h1>
            <p className="lead">
              Welcome to Highrachy, a 21st century project oriented firm
              determined to meet your real estate and technological needs.
            </p>
            <button type="button" href="#" className="btn btn-primary">
              Let’s Work Together
            </button>
          </div>
          <div className="offset-lg-1 col-lg-6 col-md-12 col-sm-12 align-self-center">
            <div className="row g-2">
              <div className="col-6">
                <TestImage
                  tall
                  src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                />
                <TestImage src="https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80" />
              </div>
              <div className="col-6">
                <TestImage src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" />
                <TestImage
                  tall
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* ***** Header Text End ***** */}
  </div>
);

const TestImage = ({ tall, src }) => {
  const height = tall ? 350 : 210;
  const width = '300';
  return (
    <Image
      src={src}
      className="rounded"
      height={height}
      width={width}
      blurDataURL={`data:image/svg+xml;base64,${toBase64(
        shimmer(width, height)
      )}`}
      alt="testing"
      placeholder="blur"
    />
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
