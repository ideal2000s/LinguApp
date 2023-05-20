import React, { FC, useCallback, useContext, useEffect } from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { I18nContext } from 'i18n';
import { tAppState } from 'students/stores/rootStore';
import { lessonsCatalogActions, publicPageSelectors } from 'students/stores/public';
import { preferencesActions, userSelectors } from 'students/stores/user';
import { requestingSelectors } from 'students/stores/requesting';
import { useInitialFiltersState } from './hooks';
import { useEventDispatcher } from 'students/views/shared/bundles/events';
import { IProfile } from 'students/models';

import LessonsCatalogContext from './LessonsCatalogContext';

type tProps = ConnectedProps<typeof connector>;

const LessonsCatalogProvider: FC<tProps> = ({
  children,
  catalog,
  getCatalogItems,
  getCatalogMore,
  getSupportedLanguages,
  getTargetLanguages,
  getSkills
}) => {
  const { locale } = useContext(I18nContext);
  const { courseCatalog, lessonCatalog, catalogItems } = catalog;
  const catalogIsLoading = useSelector(
    requestingSelectors.selectHasRequestingActions([
      lessonsCatalogActions.getCatalogItems.typePrefix,
      lessonsCatalogActions.getCatalogMore.typePrefix
    ])
  );
  const {
    dispatchEvent: dispatchFilterEvent,
    addListener: addFilterListener
  } = useEventDispatcher();
  const userProfile = useSelector(userSelectors.selectProfile);

  const fetchCatalog = useCallback(() => {
    getCatalogItems(window.location.search);
  }, [getCatalogItems]);

  useInitialFiltersState(userProfile as IProfile, fetchCatalog);

  const fetchCatalogMore = useCallback(() => {
    getCatalogMore(window.location.search);
  }, [getCatalogMore]);

  const resetAllFilters = useCallback(() => {
    window.history.pushState({}, '', location.origin);
    fetchCatalog();
  }, [fetchCatalog]);

  useEffect(() => {
    addFilterListener?.('*', () => {
      fetchCatalog();
    });
  }, [addFilterListener, fetchCatalog]);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog, locale]);

  useEffect(() => {
    getTargetLanguages();
    getSupportedLanguages();
  }, [getTargetLanguages, getSupportedLanguages]);

  useEffect(() => {
    getSkills();
  }, [getSkills]);

  return (
    <LessonsCatalogContext.Provider
      value={{
        lessonsCatalog: lessonCatalog,
        coursesCatalog: courseCatalog,
        catalogItems: !catalogIsLoading ? catalogItems : [],
        dispatchFilterEvent,
        addFilterListener,
        catalogIsLoading,
        fetchCatalog,
        fetchCatalogMore,
        resetAllFilters
      }}
    >
      {children}
    </LessonsCatalogContext.Provider>
  );
};

const mapStateToProps = (state: tAppState) => ({
  catalog: publicPageSelectors.selectCatalog(state)
});

const mapDispatchToProps = {
  getCatalogItems: lessonsCatalogActions.getCatalogItems,
  getCatalogMore: lessonsCatalogActions.getCatalogMore,
  getSkills: lessonsCatalogActions.getSkills,
  getTargetLanguages: preferencesActions.getTargetLanguages,
  getSupportedLanguages: preferencesActions.getSupportedLanguages
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LessonsCatalogProvider);
