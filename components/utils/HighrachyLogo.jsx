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
          <Image
            src="/logo_xmas.png"
            alt="Highrachy"
            width={isDesktop ? '169' : '142'}
            height={isDesktop ? '64' : '54'}
          />
        ) : (
          <ThemedImage
            src="/logo.png"
            darkSrc="/logo_dark.png"
            alt="Highrachy"
            width={isDesktop ? '169' : '142'}
            height={isDesktop ? '50' : '42'}
          />
        )}
      </a>
    </Link>
  );
};

export default HighrachyLogo;
