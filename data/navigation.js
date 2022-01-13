const home = {
  title: 'Home',
  link: '',
  children: {},
};

const services = {
  title: 'Services',
  link: 'services',
  children: {
    consultancy: 'PM Consultancy and RE Advisory',
    'property-devlopment': 'Property Development & Management',
    'real-investment': 'Real Investment',
    technology: 'Technology',
  },
};

const projects = {
  title: 'Projects',
  link: 'projects',
  children: {
    'our-projects': 'Our Projects',
    'our-approach': 'Our Approach',
  },
};

const about = {
  title: 'About Us',
  link: 'about-us',
  children: {
    'our-team': 'Our Team',
    'the-culture': 'Our Culture',
    'contact-us': 'Contact Us',
    career: 'Career',
  },
};

const navigation = [home, services, projects, about];

export default navigation;
