import React from 'react';
import Head from 'next/head';

import seoConfig from '@utils/config/seo';

interface ISeo {
  description?: string;
  title: string;
  image?: string;
  slug?: string;
  article?: string;
}

const SEO: React.FC<ISeo> = ({ description, title, image, slug, article }) => {
  const {
    originalTitle,
    originalDescription,
    siteName,
    currentURL,
    originalImage
  } = seoConfig;
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />

      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#2b5797"
      />
      <meta name="apple-mobile-web-app-title" content={originalTitle} />
      <meta name="application-name" content={originalTitle} />
      <meta name="msapplication-TileColor" content="#2b5797" />
      <meta name="theme-color" content="#2b5797" />

      <title>
        {title === originalTitle ? title : `${title} | ${originalTitle}`}
      </title>
      <meta
        name="description"
        content={`${description || originalDescription}`}
      />
      <meta name="image" content={`${image || originalImage}`} key="ogtitle" />
      {article ? (
        <meta property="og:type" content="article" key="ogtype" />
      ) : (
        <meta property="og:type" content="website" key="ogtype" />
      )}
      <meta
        property="og:title"
        content={`${title || originalTitle}`}
        key="ogtitle"
      />
      <meta
        property="og:description"
        content={`${description || originalDescription}`}
        key="ogdesc"
      />
      <meta
        property="og:image"
        content={`${image || originalImage}`}
        key="ogimage"
      />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
      <meta
        property="twitter:card"
        content="summary_large_image"
        key="twcard"
      />
      <meta
        name="twitter:title"
        content={`${title || originalTitle}`}
        key="twtitle"
      />
      <meta
        name="twitter:description"
        content={`${description || originalDescription}`}
        key="twdescription"
      />
      <meta
        name="twitter:image"
        content={`${image || originalImage}`}
        key="twimage"
      />
      <meta property="og:url" content={`${currentURL}/${slug}`} key="ogurl" />
    </Head>
  );
};

export default SEO;
