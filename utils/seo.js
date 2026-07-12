export const SITE_URL = 'https://www.highrachy.com';
export const SITE_NAME = 'Highrachy';
export const DEFAULT_SEO_TITLE =
  'Highrachy - Real Estate & Project-Oriented Solutions';
export const DEFAULT_SEO_DESCRIPTION =
  'Highrachy is a 21st-century project-oriented real estate organization delivering value-driven property solutions across Africa.';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const TWITTER_HANDLE = '@highrachy';

export const toAbsoluteUrl = (value = '') => {
  if (!value) return SITE_URL;

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
};

export const normalizePath = (value = '/') => {
  if (!value) return '/';

  let path = value.split('?')[0].split('#')[0] || '/';

  if (!path.startsWith('/')) {
    path = `/${path}`;
  }

  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  return path || '/';
};

export const buildCanonicalUrl = (path = '/') =>
  toAbsoluteUrl(normalizePath(path));

export const isNoIndexPath = (pathname = '/') => {
  const path = normalizePath(pathname);

  return (
    path === '/404' ||
    path === '/forms' ||
    path.startsWith('/admin') ||
    path.startsWith('/api')
  );
};
