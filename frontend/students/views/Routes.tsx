import React, { FC, Suspense, lazy, useEffect, useCallback, useContext } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { I18nContext, locales } from 'i18n';
import CookiePopup from 'students/views/shared/components/CookiePopup/CookiePopupLazy';

const Lessons = lazy(() => import('./pages/Lessons'));
const Page404 = lazy(() => import('./pages/Page404'));
const Games = lazy(() => import('./pages/Games'));
const Course = lazy(() => import('./pages/Public/CoursePage'));
const LessonsCatalog = lazy(() => import('./pages/Public/LessonsCatalog'));

const ProfileValidationModal = lazy(
  () => import('students/views/screens/Auth/components/ProfileValidationModal')
);

const NoLicenseModal = lazy(
  () => import('students/views/screens/Auth/components/NoLicenseModal')
);

const PATH_NAMESPACE = '';

const Routes: FC = () => {
  usePredefineLocale();

  return (
    <Suspense fallback="">
      <Switch>
        <Route path={`${PATH_NAMESPACE}/`} exact component={LessonsCatalog} />

        <Route path={`${PATH_NAMESPACE}/lessons/games`} component={Games} />
        <Route path={`${PATH_NAMESPACE}/lessons`} component={Lessons} />
        <Route path={`${PATH_NAMESPACE}/404`} component={Page404} />
        <Route path={`${PATH_NAMESPACE}/courses/:slug`} component={Course} />

        <Redirect to={`${PATH_NAMESPACE}/404`} />
      </Switch>

      <CookiePopup />
      <ProfileValidationModal />
      <NoLicenseModal />
    </Suspense>
  );
};

export default Routes;

function usePredefineLocale(): void {
  const localeParam = new URLSearchParams(useLocation().search).get('locale');
  const { locale, setLocale } = useContext(I18nContext);

  const configureLocale = useCallback(
    (locale: string) => {
      const foundLocale = locales.find(({ lKey }) => lKey === locale);

      if (foundLocale) {
        setLocale(foundLocale.lKey);
      } else {
        // Set English locale as a fallback
        setLocale('en');
      }
    },
    [setLocale]
  );

  useEffect(() => {
    if (localeParam && locale !== localeParam) {
      configureLocale(localeParam);
    }
  }, [localeParam, configureLocale, locale]);
}
