import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import {
  DEFAULT_OG_IMAGE,
  DEFAULT_SEO_DESCRIPTION,
  SITE_NAME,
  TWITTER_HANDLE,
  buildCanonicalUrl,
  toAbsoluteUrl,
} from '@/utils/seo';

export default function SEOHead({
  title,
  description,
  canonical,
  image,
  noindex = false,
  nofollow = false,
}) {
  const router = useRouter();
  const seoTitle = title;

  const seoDescription = description || DEFAULT_SEO_DESCRIPTION;

  const seoCanonical = canonical || buildCanonicalUrl(router.asPath);

  const seoImage = image ? toAbsoluteUrl(image) : DEFAULT_OG_IMAGE;

  return (
    <NextSeo
      title={seoTitle}
      description={seoDescription}
      canonical={seoCanonical}
      noindex={noindex}
      nofollow={nofollow}
      openGraph={{
        type: 'website',
        locale: 'en_GB',
        url: seoCanonical,
        site_name: SITE_NAME,
        title: seoTitle,
        description: seoDescription,
        images: [
          {
            url: seoImage,
            width: 1200,
            height: 630,
            alt: seoTitle,
          },
        ],
      }}
      twitter={{
        cardType: 'summary_large_image',
        site: TWITTER_HANDLE,
        handle: TWITTER_HANDLE,
      }}
      robotsProps={{
        nosnippet: false,
        notranslate: false,
        noimageindex: false,
        maxSnippet: -1,
        maxImagePreview: 'large',
        maxVideoPreview: -1,
      }}
    />
  );
}
