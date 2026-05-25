import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords }) {
  const fullTitle = title ? `${title} | Desii Gabru` : 'Desii Gabru | Premium Men\'s Grooming';
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || 'Premium cyber-luxury grooming for the modern Desi man.'} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
