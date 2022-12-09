import React from 'react';
import Head from 'next/head';

const HeadDefaultMeta: React.FC = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="robots" content="noindex ,nofollow" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
      />
      <title>ESCAPE NOTE ADMIN</title>
      <meta property="og:site_name" content="ESCAPE NOTE" />
      <meta property="og:type" content="website" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="apple-mobile-web-app-title" content="ESCAPE NOTE" />
      <meta name="apple-mobile-web-app-status-bar-style" content="whilte" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link rel="shortcut icon" href="/favicon.ico" />

      <link rel="preconnect" href={process.env.NEXT_PUBLIC_API} />

      <script
        async
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP}`}
      />
    </Head>
  );
};

export default HeadDefaultMeta;
