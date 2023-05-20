import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { t, I18nContext } from 'i18n';
import linguLogo from 'students/views/shared/assets/lingu-logo.svg';

interface IProps {
  pageNameLocaleKey?: string;
  pageName?: string;
  language?: string;
  canonicalUrl?: string;
  description?: string;
}

const PageTitle: React.FC<IProps> = ({
  pageName,
  pageNameLocaleKey,
  language,
  canonicalUrl,
  description
}) => {
  useContext(I18nContext);

  const pageNameString = pageName || (pageNameLocaleKey && t(pageNameLocaleKey));

  useEffect(() => {
    if (language) {
      document.documentElement.lang = language;
    }
  }, [language]);

  return (
    <Helmet>
      <title>{pageNameString ? `${pageNameString} | Lingu` : document.title}</title>

      {description && <meta name="description" content={description} />}

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta
        property="og:title"
        content={pageNameString ? `${pageNameString} | Lingu` : document.title}
      />
      <meta property="og:type" content="website" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={window.location.origin + linguLogo} />
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  );
};

export default PageTitle;
