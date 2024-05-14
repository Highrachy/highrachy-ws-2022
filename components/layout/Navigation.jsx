import navigation from '@/data/navigation';
import useScrollPosition from '@/hooks/useScrollPosition';
import React from 'react';
import { useState } from 'react';
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from 'react-bootstrap';
import ActiveLink from '../utils/ActiveLink';
import useWindowSize from '@/hooks/useWindowSize';
import HighrachyLogo from '../utils/HighrachyLogo';
import ThemeChanger from '../common/ThemedChanger';
import { useTheme } from 'next-themes';

const DesktopNavigation = ({ MENU, Apartments, DarkModeIcon }) => {
  return (
    <>
      <Navbar.Collapse id="highrachy-navbar">
        <Nav className="me-auto">{MENU}</Nav>
        <Nav>{DarkModeIcon}</Nav>
        <Nav>{Apartments}</Nav>
      </Navbar.Collapse>
    </>
  );
};

const MobileNavigation = ({ MENU, Apartments, DarkModeIcon }) => (
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
        {DarkModeIcon}
        <div className="px-4 mt-5">{Apartments}</div>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  </>
);

const Navigation = ({ parentPage }) => {
  const { width } = useWindowSize();
  const { resolvedTheme } = useTheme();
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => setHasMounted(true), []);

  const currentScrollPos = useScrollPosition();

  const [navbarColor, setNavbarColor] = useState('bg-transparent');
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [className, setClassName] = useState('show');
  const startingPos = 1;
  const isDark = resolvedTheme === 'dark';

  React.useEffect(() => {
    setNavbarColor(isDark ? 'dark' : 'light');
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
    setNavbarColor(isDark ? 'dark' : 'light');

    // reset lastScrollPos
    setLastScrollPos(currentScrollPos);
  }, [currentScrollPos, lastScrollPos, isDark]);

  if (!hasMounted) return null;

  const MENU = navigation.map(({ children, url, title }, index) => (
    <React.Fragment key={index}>
      {Object.keys(children)?.length > 0 ? (
        <NavDropdown
          title={title}
          id={`${url}-dropdown`}
          active={parentPage === url}
        >
          {Object.entries(children).map(([url, title], index) => (
            <ActiveLink
              key={`${url}-dropdown-${index}`}
              href={`/${url}`}
              passHref
            >
              <NavDropdown.Item>{title}</NavDropdown.Item>
            </ActiveLink>
          ))}
        </NavDropdown>
      ) : (
        <ActiveLink href={`/${url}`} passHref>
          <Nav.Link aria-current="page" className={`nav-url`}>
            {title}
          </Nav.Link>
        </ActiveLink>
      )}
    </React.Fragment>
  ));

  const Apartments = (
    <>
      <ActiveLink href={`/apartments`} passHref>
        <Nav.Link aria-current="page" className={`btn btn-sm btn-apartments`}>
          Find Apartments
        </Nav.Link>
      </ActiveLink>
    </>
  );

  const DarkModeIcon = (
    <Nav.Link>
      <ThemeChanger />
    </Nav.Link>
  );

  const isDesktop = width > 991;

  const currentNavigation = isDesktop ? (
    <DesktopNavigation
      MENU={MENU}
      Apartments={Apartments}
      DarkModeIcon={DarkModeIcon}
    />
  ) : (
    <MobileNavigation
      MENU={MENU}
      Apartments={Apartments}
      DarkModeIcon={DarkModeIcon}
    />
  );

  return (
    <Navbar
      bg={navbarColor}
      expand="lg"
      sticky={navbarColor === 'transparent' ? '' : 'top'}
      className={className}
    >
      <Container>
        <Navbar.Brand>
          <HighrachyLogo />
        </Navbar.Brand>
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
