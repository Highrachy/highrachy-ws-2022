import { NextSeo } from 'next-seo';

const SITE_URL = 'https://www.highrachy.com';
const SITE_NAME = 'Highrachy';

export default function SEOHead({
  title,
  description,
  canonical,
  image,
  noindex = false,
  nofollow = false,
}) {
  const seoTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} - Real Estate & Project-Oriented Solutions`;

  const seoDescription =
    description ||
    'Highrachy is a 21st-century project-oriented real estate organization delivering value-driven property solutions across Africa.';

  const seoCanonical = canonical || SITE_URL;

  const seoImage = image || `${SITE_URL}/og-image.jpg`;

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
        site: '@highrachy',
        handle: '@highrachy',
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
