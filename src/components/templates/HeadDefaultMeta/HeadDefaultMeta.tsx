import React from 'react';
import Head from 'next/head';

const HeadDefaultMeta: React.FC = () => {
  const title = 'ESCAPE NOTE ADMIN';
  const color = '#ffffff';

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="robots" content="noindex ,nofollow" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
      />
      <title>{title}</title>
      <meta property="og:site_name" content={title} />
      <meta property="og:type" content="website" />

      <meta name="theme-color" content={color} />
      <meta name="apple-mobile-web-app-status-bar-style" content={color} />
      <meta name="msapplication-TileColor" content={color} />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/icons/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/icons/android-icon-192x192.png"
      />
      <link rel="apple-touch-icon" href="/icons/apple-icon.png" />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/icons/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/icons/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/icons/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/icons/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/icons/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/icons/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/icons/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/icons/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/apple-icon-180x180.png"
      />
      <link
        rel="apple-touch-startup-image"
        href="/icons/apple-icon-180x180.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        href="/icons/apple-icon-precomposed.png"
      />
      <meta
        name="msapplication-TileImage"
        content="/icons/ms-icon-144x144.png"
      />

      <link rel="preconnect" href={process.env.NEXT_PUBLIC_API} />

      <script
        async
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP}`}
      />
    </Head>
  );
};

export default HeadDefaultMeta;
