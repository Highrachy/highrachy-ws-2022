import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import { isFestivePeriod } from '@/utils/helpers';
import ThemedImage from '../common/ThemedImage';

const HighrachyLogo = () => {
  const { width } = useWindowSize();
  const isDesktop = width > 991;
  return (
    <Link href="/" passHref>
      <a>
        {isFestivePeriod() ? (
          <ThemedImage
            src="/logo_xmas.png"
            darkSrc="/logo_xmas_dark.png"
            alt="Highrachy Logo"
            width={isDesktop ? '169' : '142'}
            height={isDesktop ? '61' : '51'}
          />
        ) : (
          <ThemedImage
            src="/logo.png"
            darkSrc="/logo_dark.png"
            alt="Highrachy Logo"
            width={isDesktop ? '169' : '142'}
            height={isDesktop ? '50' : '42'}
          />
        )}
      </a>
    </Link>
  );
};

export default HighrachyLogo;
