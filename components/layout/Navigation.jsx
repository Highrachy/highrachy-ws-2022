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

  const MENU = navigation.map(({ children, url, title }, index) => (
    <React.Fragment key={index}>
      {Object.keys(children)?.length > 0 ? (
        <NavDropdown title={title} id={`${url}-dropdown fade-up`}>
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
    <Navbar bg="transparent" expand="lg" sticky="top">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>
            <Image src="/logo.png" alt="Highrachy" width="169" height="50" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="highrachy-navbar" />
        {currentNavigation}
      </Container>
    </Navbar>
  );
};

// const Navigation2 = () => {
//   const scrollPosition = useScrollPosition();

//   const [navbarColor, setNavbarColor] = useState('bg-transparent');

//   React.useEffect(() => {
//     if (scrollPosition > 50) {
//       setNavbarColor('bg-white');
//     } else {
//       setNavbarColor('bg-transparent');
//     }
//   }, [scrollPosition]);

//   console.log(scrollPosition);
//   return (
//     <nav className={`navbar navbar-expand-lg sticky-top ${navbarColor}`}>
//       <div className="container">
//         <a className="navbar-brand" href="#">
//           Brand
//         </a>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#main_nav"
//         >
//           <span className="navbar-toggler-icon" />
//         </button>
//         <div className="collapse navbar-collapse" id="main_nav">
//           <ul className="navbar-nav">
//             <li className="nav-item active">
//               {' '}
//               <a className="nav-link" href="#">
//                 Home{' '}
//               </a>{' '}
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">
//                 {' '}
//                 About{' '}
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">
//                 {' '}
//                 Services{' '}
//               </a>
//             </li>
//             <li className="nav-item dropdown">
//               <a
//                 className="nav-link dropdown-toggle"
//                 href="#"
//                 data-bs-toggle="dropdown"
//               >
//                 {' '}
//                 Hover me
//               </a>
//               <ul className="dropdown-menu fade-up">
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     {' '}
//                     Submenu item 1
//                   </a>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     {' '}
//                     Submenu item 2{' '}
//                   </a>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     {' '}
//                     Submenu item 3{' '}
//                   </a>
//                 </li>
//               </ul>
//             </li>
//           </ul>
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <a className="nav-link" href="#">
//                 {' '}
//                 Menu item{' '}
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">
//                 {' '}
//                 Menu item{' '}
//               </a>
//             </li>
//             <li className="nav-item dropdown">
//               <a
//                 className="nav-link dropdown-toggle"
//                 href="#"
//                 data-bs-toggle="dropdown"
//               >
//                 {' '}
//                 Dropdown right{' '}
//               </a>
//               <ul className="dropdown-menu dropdown-menu-end fade-down">
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     {' '}
//                     Submenu item 1
//                   </a>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     {' '}
//                     Submenu item 2{' '}
//                   </a>
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </div>{' '}
//         {/* navbar-collapse.// */}
//       </div>{' '}
//       {/* container-fluid.// */}
//     </nav>
//   );
// };

// const Navigation = () => (
//   <nav
//     id="navbar_main"
//     className="mobile-offcanvas show navbar navbar-expand-lg navbar-dark bg-primary"
//   >
//     <div className="container">
//       <div className="offcanvas-header">
//         <button className="btn-close float-end" />
//       </div>
//       <a className="navbar-brand" href="#">
//         Brand
//       </a>
//       <ul className="navbar-nav">
//         <li className="nav-item active">
//           {' '}
//           <a className="nav-link" href="#">
//             Home{' '}
//           </a>{' '}
//         </li>
//         <li className="nav-item">
//           <a className="nav-link" href="#">
//             {' '}
//             About{' '}
//           </a>
//         </li>
//         <li className="nav-item">
//           <a className="nav-link" href="#">
//             {' '}
//             Services{' '}
//           </a>
//         </li>
//       </ul>
//     </div>{' '}
//     {/* container-fluid.// */}
//   </nav>
// );

export default Navigation;
