import React from 'react';
import Head from 'next/head';

interface IProps {
  title: string;
  description: string;
  pageUrl?: string;
  imageUrl?: string;
  noFollow?: boolean;
}
const HeadPageMeta: React.FC<IProps> = ({
  title,
  description,
  pageUrl,
  imageUrl,
  noFollow = false,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
      {pageUrl && (
        <>
          <meta property="og:url" content={pageUrl} />
          <meta name="twitter:site" content={pageUrl} />
          <link rel="canonical" href={pageUrl} />
        </>
      )}
      {imageUrl && (
        <>
          <meta property="og:image" content={imageUrl} />
          <meta name="twitter:image" content={imageUrl} />
        </>
      )}
      {noFollow && <meta name="robots" content="noindex ,nofollow" />}
    </Head>
  );
};

export default HeadPageMeta;
