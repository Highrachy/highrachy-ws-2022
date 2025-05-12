import { TrustIcon } from '@/components/common/Icons';
import { OriginalityIcon } from '@/components/common/Icons';
import { LoyaltyIcon } from '@/components/common/Icons';

const { PassionIcon } = require('@/components/common/Icons');
const { FamilyIcon } = require('@/components/common/Icons');

export const welcomeNote =
  'Highrachy is a 21st century project-oriented organization setup primarily to meet your real estate needs. Experience top notch processes and solutions that are deliberately designed to guarantee your real estate goals are met consistently.';
export const welcomeNoteLeadText =
  'Give yourself the gift of true value driven by quality for a better tomorrow with us.';

export const ourCultureLeadText = `Integrating all that is precious to people and communities, Highrachy develops and manages dynamic exclusively rated infrastructures with complete facilities that connect today with tomorrow's possibilities and embraces every moment of life's pursuit. We create new value, social value, and above all, real value.`;

export const theCulture = {
  Family: {
    title: 'Family',
    content: 'We support and care for each other',
    icon: <FamilyIcon />,
  },
  Loyalty: {
    title: 'Loyalty',
    content: 'We build and value long term relationships',
    icon: <LoyaltyIcon />,
  },
  Originality: {
    title: 'Originality',
    content: 'We encourage creativity and welcome new ideas',
    icon: <OriginalityIcon />,
  },
  Passion: {
    title: 'Passion',
    content: 'We love what we do, especially creating value for you.',
    icon: <PassionIcon />,
  },
  Trust: {
    title: 'Trust',
    content: 'Relationships make the world go round, Your trust is key to us.',
    icon: <TrustIcon />,
  },
};
