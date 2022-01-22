import navigation from '@/data/navigation';
import useScrollPosition from '@/hooks/useScrollPosition';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from 'react-bootstrap';
import ActiveLink from '../utils/ActiveLink';
import useWindowSize from '@/hooks/useWindowSize';

const DesktopNavigation = ({ MENU, Listings }) => {
  return (
    <>
      <Navbar.Collapse id="highrachy-navbar">
        <Nav className="me-auto">{MENU}</Nav>
        <Nav>{Listings}</Nav>
      </Navbar.Collapse>
    </>
  );
};

const MobileNavigation = ({ MENU, Listings }) => (
  <>
    <Navbar.Offcanvas
      id="highrachy-navbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="end"
    >
      <Offcanvas.Header className="border-bottom" closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {MENU}
        <div className="px-4 mt-5">{Listings}</div>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  </>
);

const Navigation = () => {
  const { width } = useWindowSize();

  const currentScrollPos = useScrollPosition();

  const [navbarColor, setNavbarColor] = useState('bg-transparent');
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [className, setClassName] = useState('show');
  const startingPos = 1;

  React.useEffect(() => {
    // maintain current status
    if (currentScrollPos === lastScrollPos) return;

    // in starting position
    if (currentScrollPos < startingPos) {
      setClassName('show');
      setNavbarColor('transparent');
      return;
    }

    // scrolling up or down
    const showNavbar = lastScrollPos > currentScrollPos;
    showNavbar ? setClassName('show') : setClassName('hide');
    setNavbarColor('white');

    // reset lastScrollPos
    setLastScrollPos(currentScrollPos);
  }, [currentScrollPos, lastScrollPos]);

  const MENU = navigation.map(({ children, url, title }, index) => (
    <React.Fragment key={index}>
      {Object.keys(children)?.length > 0 ? (
        <NavDropdown title={title} id={`${url}-dropdown`}>
          {Object.entries(children).map(([url, title], index) => (
            <ActiveLink
              activeClassName="text-danger"
              key={`${url}-dropdown-${index}`}
              href={`/${url}`}
              passHref
            >
              <NavDropdown.Item>{title}</NavDropdown.Item>
            </ActiveLink>
          ))}
        </NavDropdown>
      ) : (
        <ActiveLink activeClassName="text-danger" href={`/${url}`} passHref>
          <Nav.Link aria-current="page" className={`nav-url`}>
            {title}
          </Nav.Link>
        </ActiveLink>
      )}
    </React.Fragment>
  ));

  const Listings = (
    <ActiveLink activeClassName="text-danger" href={`/listings`} passHref>
      <Nav.Link aria-current="page" className={`btn btn-sm btn-dark`}>
        Listings
      </Nav.Link>
    </ActiveLink>
  );

  const currentNavigation =
    width > 991 ? (
      <DesktopNavigation MENU={MENU} Listings={Listings} />
    ) : (
      <MobileNavigation MENU={MENU} Listings={Listings} />
    );

  return (
    <Navbar
      bg={navbarColor}
      expand="lg"
      sticky={navbarColor === 'transparent' ? '' : 'top'}
      className={className}
    >
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>
            <Image src="/logo.png" alt="Highrachy" width="169" height="50" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="highrachy-navbar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z" />
          </svg>
        </Navbar.Toggle>
        {currentNavigation}
      </Container>
    </Navbar>
  );
};

export default Navigation;
