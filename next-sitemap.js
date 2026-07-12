module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.highrachy.com',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/api/*', '/forms', '/404'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/forms', '/404'],
      },
    ],
    additionalSitemaps: ['https://www.highrachy.com/sitemap.xml'],
  },
};
