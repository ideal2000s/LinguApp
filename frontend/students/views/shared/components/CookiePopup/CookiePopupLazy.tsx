import React, { lazy, Suspense } from 'react';
import useCookieAgreePopup from '../../hooks/useCookieAgreePopup';
const CookiePopup = lazy(() => import('./CookiePopup'));

const CookiePopupLazy: React.FC = () => {
  const [show] = useCookieAgreePopup();
  return <Suspense fallback="">{show ? <CookiePopup /> : null}</Suspense>;
};

export default CookiePopupLazy;
