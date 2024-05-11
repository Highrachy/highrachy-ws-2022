import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';
import Script from 'next/script';
import '../sass/App.scss';
import { ToastContainer, Slide } from 'react-toastify';
import { DefaultSeo } from 'next-seo';
import UserProvider from 'context/user';
import XmasFall from '@/components/utils/XmasFall';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="data-bs-theme">
      <UserProvider>
        <XmasFall />
        <ToastContainer autoClose={10000} transition={Slide} theme="colored" />
        <NextNProgress color="#ed3237" />
        <DefaultSeo
          defaultTitle="Welcome to Highrachy"
          description="Highrachy is a 21st century project-oriented organization setup
        primarily to meet your real estate needs."
        />
        <Head>
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
