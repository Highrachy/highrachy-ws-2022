import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import '../sass/App.scss';
import { ToastContainer, Slide } from 'react-toastify';
import { DefaultSeo } from 'next-seo';
import UserProvider from 'context/user';
import XmasFall from '@/components/utils/XmasFall';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_SEO_DESCRIPTION,
  DEFAULT_SEO_TITLE,
  SITE_NAME,
  buildCanonicalUrl,
  isNoIndexPath,
  TWITTER_HANDLE,
} from '@/utils/seo';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const canonicalUrl = buildCanonicalUrl(router.asPath);
  const noindex = isNoIndexPath(router.pathname);

  return (
    <ThemeProvider
      attribute="data-bs-theme"
      enableSystem={false}
      disableTransitionOnChange
      defaultTheme="light"
    >
      <UserProvider>
        <XmasFall />
        <ToastContainer autoClose={10000} transition={Slide} theme="colored" />
        <NextNProgress color="#ed3237" />
        <DefaultSeo
          titleTemplate="%s | Highrachy"
          defaultTitle={DEFAULT_SEO_TITLE}
          description={DEFAULT_SEO_DESCRIPTION}
          canonical={canonicalUrl}
          noindex={noindex}
          nofollow={noindex}
          openGraph={{
            type: 'website',
            locale: 'en_GB',
            url: canonicalUrl,
            site_name: SITE_NAME,
            images: [
              {
                url: DEFAULT_OG_IMAGE,
                width: 1200,
                height: 630,
                alt: `${SITE_NAME} Real Estate`,
              },
            ],
          }}
          twitter={{
            handle: TWITTER_HANDLE,
            site: TWITTER_HANDLE,
            cardType: 'summary_large_image',
          }}
        />
        <Head>
          <meta name="theme-color" content="#ed3237" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <Script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
