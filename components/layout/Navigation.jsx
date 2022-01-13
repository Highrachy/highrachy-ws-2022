import navigation from '@/data/navigation';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import ActiveLink from '../utils/ActiveLink';

const Navigation = () => {
  return (
    // <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
    //   <div className="container">
    //     <Link href="/" passHref>
    //       <a className="navbar-brand">
    //         <Image src="/logo.png" alt="Highrachy" width="169" height="50" />
    //       </a>
    //     </Link>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarSupportedContent"
    //       aria-controls="navbarSupportedContent"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>

    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <ul className="navbar-nav ms-auto">
    //         {Object.entries(NAVIGATION_LINKS).map(([key, value], index) => (
    //           <ActiveLink
    //             activeClassName="text-danger"
    //             key={index}
    //             href={value === 'Home' ? '/' : `/${key}`}
    //             passHref
    //           >
    //             <a
    //               aria-current="page"
    //               className={`nav-link ${key === 'contact-us' ? 'pe-0' : ''}`}
    //             >
    //               {value}
    //             </a>
    //           </ActiveLink>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
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
            {navigation.map(({ children, link, title }, index) => (
              <React.Fragment key={index}>
                {Object.keys(children)?.length > 0 ? (
                  <NavDropdown title={title} id={`${link}-dropdown`}>
                    {Object.entries(children).map(([link, title], index) => (
                      <ActiveLink
                        activeClassName="text-danger"
                        key={`${link}-dropdown-${index}`}
                        href={link}
                        passHref
                      >
                        <NavDropdown.Item>{title}</NavDropdown.Item>
                      </ActiveLink>
                    ))}
                  </NavDropdown>
                ) : (
                  <ActiveLink
                    activeClassName="text-danger"
                    href={`/${link}`}
                    passHref
                  >
                    <Nav.Link aria-current="page" className={`nav-link`}>
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
