import Head from 'next/head';

interface HeadInterface {
  title?: string | null;
  body?: string | null;
  image?: string | null;
}

const AppHead = ({ title, body, image }: HeadInterface) => {
  // --------------------------------------------------------------------------------
  // 📌  Use app header to pass data dynamically in pages via meta tags
  // --------------------------------------------------------------------------------

  const pageTitle = title || 'Wunder';
  const prevImg = image || '/png/wunder.png';
  let prevBody = body || 'Wunder is a social network for creative people.';
  // 📌 shorten body if its exceeds limit of 120 characters
  if (prevBody.length > 120) prevBody = prevBody.substring(0, 120) + '...';

  return (
    <Head>
      <title>{pageTitle}</title>
      <link rel="380" href="/favicon.ico" />
      <meta name="Wunder Web App" content="Created by Skylark Creative" />
      <meta name="image" property="og:image" content={prevImg} />
      <meta data-rh="true" property="og:description" content={prevBody} />

      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Head>
  );
};

export default AppHead;
