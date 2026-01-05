import { OrganizationJsonLd } from 'next-seo';

const SITE_URL = 'https://www.highrachy.com';

export default function OrgSchema() {
  return (
    <OrganizationJsonLd
      type="Corporation"
      id={`${SITE_URL}/#organization`}
      name="Highrachy"
      legalName="Highrachy"
      url={SITE_URL}
      logo={`${SITE_URL}/logo.png`}
      description="Highrachy is a 21st-century project-oriented real estate organization delivering value-driven developments and sustainable communities."
      sameAs={[
        'https://www.facebook.com/Highrachy/',
        'https://twitter.com/highrachy',
        'https://www.instagram.com/highrachyhq/',
        'https://www.linkedin.com/company/highrachy-investment-and-technology-limited',
      ]}
      contactPoint={[
        {
          telephone: ' +234-905-555-5146',
          contactType: 'customer service',
          areaServed: 'NG',
          availableLanguage: ['English'],
        },
      ]}
    />
  );
}
