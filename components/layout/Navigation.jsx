import navigation from '@/data/navigation';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import ActiveLink from '../utils/ActiveLink';

const Navigation = () => {
  return (
    <Navbar bg="transparent" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>
            <Image src="/logo.png" alt="Highrachy" width="169" height="50" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navigation.map(({ children, url, title }, index) => (
              <React.Fragment key={index}>
                {Object.keys(children)?.length > 0 ? (
                  <NavDropdown title={title} id={`${url}-dropdown`}>
                    {Object.entries(children).map(([url, title], index) => (
                      <ActiveLink
                        activeClassName="text-danger"
                        key={`${url}-dropdown-${index}`}
                        href={url}
                        passHref
                      >
                        <NavDropdown.Item>{title}</NavDropdown.Item>
                      </ActiveLink>
                    ))}
                  </NavDropdown>
                ) : (
                  <ActiveLink
                    activeClassName="text-danger"
                    href={`/${url}`}
                    passHref
                  >
                    <Nav.Link aria-current="page" className={`nav-url`}>
                      {title}
                    </Nav.Link>
                  </ActiveLink>
                )}
              </React.Fragment>
            ))}
          </Nav>
          <Nav>
            <ActiveLink
              activeClassName="text-danger"
              href={`/listings`}
              passHref
            >
              <Nav.Link aria-current="page" className={`btn btn-dark`}>
                Listings
              </Nav.Link>
            </ActiveLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
