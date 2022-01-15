import { InvestmentIcon } from '@/components/common/Icons';
import { PropertyManagementIcon } from '@/components/common/Icons';
import { TechnologyIcon } from '@/components/common/Icons';
import { ConsultingIcon } from '@/components/common/Icons';

export const consulting = {
  content:
    'Project consulting including project advisory planning and documentation, project coordination and',
  icon: <ConsultingIcon />,
  title: 'Consulting',
};

export const technology = {
  content:
    'The world as it is today is managed by various spheres of technological gadgets and solutions.',
  icon: <TechnologyIcon />,
  title: 'Technology Solutions',
};

export const investment = {
  content:
    'We combine experience, expertise and dedication to give you returns on your real estate investments by focusing',
  icon: <InvestmentIcon />,
  title: 'Real Investment',
};

export const property = {
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quis voluptas tenetur, dignissimos soluta odio!',
  icon: <PropertyManagementIcon />,
  title: 'Property Management',
};

const services = { consulting, technology, investment, property };

export default services;
