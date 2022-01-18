export const home = {
  title: 'Home',
  url: '',
  children: {},
};

export const services = {
  title: 'Services',
  url: 'services',
  children: {
    services: 'Our Services',
    consultancy: 'PM Consultancy and RE Advisory',
    'property-devlopment': 'Property Development & Management',
    'real-investment': 'Real Investment',
    technology: 'Technology',
  },
};

export const projects = {
  title: 'Projects',
  url: 'projects',
  children: {
    'our-projects': 'Our Projects',
    'our-approach': 'Our Approach',
  },
};

export const about = {
  title: 'About Us',
  url: 'about-us',
  children: {
    // 'about-us': 'About Us',
    'about-us': 'Our Culture',
    'our-team': 'Our Team',
    'contact-us': 'Contact Us',
    careers: 'Careers',
  },
};

const navigation = [home, services, projects, about];

export default navigation;
