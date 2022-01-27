import { InvestmentIcon } from '@/components/common/Icons';
import { PropertyManagementIcon } from '@/components/common/Icons';
import { TechnologyIcon } from '@/components/common/Icons';
import { ConsultingIcon } from '@/components/common/Icons';

export const servicesLeadText =
  'Our unique approach recognizes the value of trust and our commitment to you is consistency and reliability.';

export const consulting = {
  content:
    'Effectively consolidating cost, expertise and quality can be a challenge for most property owners and investors, Highrachy guides clients through development projects from conception to completion we establish, refine, and deliver your real estate projects on time and on budget with experienced consultants that manage every phase of the development process. From new builds to expansions or consolidations — Our team of specialists help you identify feasibility, obtain funds, and execute your next project.',
  icon: <ConsultingIcon />,
  image: '/assets/img/services/consulting.png',
  title: 'Project Management Consultancy',
  name: 'Project Management Consultancy and Real Estate Advisory',
};

export const technology = {
  content:
    'Using software and hardware solutions to concretize your real estate needs and concerns in the current thriving technology market.',
  icon: <TechnologyIcon />,
  image: '/assets/img/services/technology-solutions.png',
  title: 'Technology Solutions',
  name: 'Technology Solutions',
};

export const investment = {
  content:
    'Our team of professionals help individuals and organizations expand their wealth by providing profitable investments via dynamic products and projects.',
  icon: <InvestmentIcon />,
  image: '/assets/img/services/real-investment.png',
  title: 'Real Investment',
  name: 'Real Investment',
};

export const property = {
  content:
    'Highrachy helps to develop and maintain a high yield asset portfolio, minimize construction costs, address risks and regulatory issues, and reduce operating expenses. With our team of professionals, you can expect a refreshingly comprehensive approach to protecting and expanding your portfolio.',
  icon: <PropertyManagementIcon />,
  image: '/assets/img/services/property-development.png',
  title: 'Property Management',
  name: 'Property Development & Management',
};

export const services = { consulting, technology, property, investment };

export default services;
