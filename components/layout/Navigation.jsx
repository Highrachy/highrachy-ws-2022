import Image from 'next/image';
import Link from 'next/link';
import ActiveLink from '../utils/ActiveLink';

const NAVIGATION_LINKS = {
  home: 'Home',
  'about-us': 'About Us',
  expertise: 'Expertise',
  solutions: 'Solutions',
  projects: 'Projects',
  'contact-us': 'Contact Us',
};

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
      <div className="container">
        <Link href="/" passHref>
          <a className="navbar-brand">
            <Image src="/logo.png" alt="Highrachy" width="169" height="50" />
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            {Object.entries(NAVIGATION_LINKS).map(([key, value], index) => (
              <ActiveLink
                activeClassName="text-danger"
                key={index}
                href={value === 'Home' ? '/' : `/${key}`}
                passHref
              >
                <a
                  aria-current="page"
                  className={`nav-link ${key === 'contact-us' ? 'pe-0' : ''}`}
                >
                  {value}
                </a>
              </ActiveLink>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
