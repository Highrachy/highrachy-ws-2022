// pages/sitemap.xml.js

import Axios from 'axios';
import projects from '@/data/projects'; // adjust path if needed

const BASE_URL = 'https://www.highrachy.com';

// Public static pages
const STATIC_ROUTES = [
  '/',
  '/about-us',
  '/our-culture',
  '/projects',
  '/apartments',
  '/careers',
  '/contact-us',
  '/privacy-policy',
  '/terms-of-use',
];

export async function getServerSideProps({ res }) {
  let apartmentUrls = [];
  let careerUrls = [];
  let projectUrls = [];

  try {
    /* ---------------------------------
     * Apartments (API)
     * --------------------------------- */
    // const apartmentsRes = await Axios.get(
    //   `${process.env.NEXT_PUBLIC_API_URL}/api/apartments`
    // );

    // const apartments = apartmentsRes?.data?.data || [];
    // apartmentUrls = apartments.map(
    //   (apt) => `/apartments/${apt.attributes.slug}`
    // );

    /* ---------------------------------
     * Careers (API)
     * --------------------------------- */
    // const careersRes = await Axios.get(
    //   `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`
    // );

    // const jobs = careersRes?.data?.data || [];
    // careerUrls = jobs.map((job) => `/careers/${job.attributes.slug}`);

    /* ---------------------------------
     * Projects (FILE, TITLE-BASED)
     * --------------------------------- */
    console.log('projects', projects);
    projectUrls = projects.map(
      (project) => `/projects/${encodeURIComponent(project.title)}`
    );
  } catch (error) {
    console.error('Sitemap generation error:', error.message);
  }

  const urls = [
    ...STATIC_ROUTES,
    ...projectUrls,
    ...apartmentUrls,
    ...careerUrls,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
