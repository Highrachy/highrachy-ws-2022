// pages/robots.txt.js

export async function getServerSideProps({ res }) {
  const robotsTxt = `
User-agent: *
Allow: /

# Block internal / non-SEO routes
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /admin/
Disallow: /vendor/
Disallow: /editor/
Disallow: /user/
Disallow: /dashboard/
Disallow: /auth/
Disallow: /login
Disallow: /logout
Disallow: /register
Disallow: /forgot-password
Disallow: /reset-password
Disallow: /change-password
Disallow: /apply
Disallow: /application
Disallow: /*?*

# Sitemap
Sitemap: https://www.highrachy.com/sitemap.xml
  `.trim();

  res.setHeader('Content-Type', 'text/plain');
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
}

export default function Robots() {
  return null;
}
