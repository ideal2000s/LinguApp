import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import styled, { ThemeContext, ThemeProvider } from 'styled-components';
import { StickyContainer } from 'react-sticky';
import { motion } from 'framer-motion';
import { Translate, t } from 'i18n';
import { ICatalogCourse, ILesson } from 'students/models';
import PageTitle from 'students/views/shared/components/PageTitle';
import {
  customMediaQuery,
  SPageContainer,
  SSecondaryButton
} from 'students/views/shared/styled';
import { useAnimateScenarios, useBreakPoint } from 'students/views/shared/hooks';
import { StatefulSpinner } from 'students/views/shared/components/Spinner';
import { lessonsCatalogActions } from 'students/stores/public';

import { FILTER_SEARCH } from './Config';
import { DesktopFilters, MobileFilters } from './Filters';
import { animationScenarios } from './animation/scenarios';
import LessonsCatalogContext from './LessonsCatalogContext';
import CourseCard from './components/CourseCard';
import CourseHeading from './components/CourseHeading';
import LessonCard from './components/LessonCard';
import ShowMoreButton from './components/ShowMoreButton';
import { Navbar, Footer, LessonsCatalogBg } from '../components';
import { useFilterEventListener } from './hooks';
import { getAllFilterConditions } from './helpers/filter';

const LessonsCatalog: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    coursesCatalog,
    lessonsCatalog,
    catalogItems,
    fetchCatalogMore,
    catalogIsLoading,
    resetAllFilters
  } = useContext(LessonsCatalogContext);

  const themeContext = useContext(ThemeContext);
  const linguLessonColor = themeContext.linguDarkFont;
  const moreItemsCanBeLoaded = Boolean(
    lessonsCatalog?.nextPage || coursesCatalog?.nextPage
  );
  const isMobile = useBreakPoint('md', true);
  const [catalogControls, animateCatalogControls] = useAnimateScenarios(
    animationScenarios
  );

  useEffect(() => {
    setSearchQuery(getAllFilterConditions(FILTER_SEARCH)[0]);
  }, []);

  useFilterEventListener(FILTER_SEARCH, ({ data }) => {
    setSearchQuery(data[0]);
  });

  function renderCatalogItems(): ReactElement {
    return (
      <>
        {catalogItems.map((item, idx) =>
          item.type === 'course' ? (
            <CourseCard key={`${idx} ${item.id}`} course={item as ICatalogCourse} />
          ) : (
            <LessonCard key={`${idx} ${item.id}`} lesson={item as ILesson} />
          )
        )}
      </>
    );
  }

  function renderNoResultsBlock(): ReactElement | null {
    if (catalogIsLoading || !lessonsCatalog || !coursesCatalog) {
      return null;
    }

    if (searchQuery) {
      return (
        <SNoResults>
          <SNoResultsSecondaryText>
            <Translate str="frontend.course.could_not_find_match_for" />
            <strong>{searchQuery}</strong>
          </SNoResultsSecondaryText>
        </SNoResults>
      );
    }

    return (
      <SNoResults>
        <SNoResultsText>
          <Translate str="frontend.course.no_results" />
        </SNoResultsText>

        <SNoResultsSecondaryText>
          <Translate str="frontend.course.try_adjusting_your_search" />
        </SNoResultsSecondaryText>

        <SClearFiltersButton onClick={resetAllFilters}>
          <Translate str="frontend.course.remove_all_filters" />
        </SClearFiltersButton>
      </SNoResults>
    );
  }

  return (
    <LessonsCatalogBg>
      <PageTitle
        pageName={t('frontend.course.lessons_catalog_page_title')}
        canonicalUrl={window.location.href}
      />

      <Navbar isLight />

      <SPageContainer>
        <ThemeProvider theme={{ ...themeContext, linguLessonColor }}>
          <CourseHeading
            title={t('frontend.course.lessons_catalog_page_title')}
            subTitle={t('frontend.course.lessons_catalog_page_subtitle')}
          />

          <StickyContainer>
            {isMobile ? (
              <MobileFilters
                subTitle={t('frontend.course.lessons_available', {
                  number: lessonsCatalog?.totalCount || 0
                })}
              />
            ) : (
              <SDesktopFiltersBlock
                subTitle={t('frontend.course.lessons_available', {
                  number: lessonsCatalog?.totalCount || 0
                })}
              />
            )}
            {!isMobile && (
              <SStatefulSpinner
                onStart={() => {
                  catalogControls.set({ opacity: 0 });
                }}
                onFinish={() => {
                  animateCatalogControls([0.5, 'appear']);
                }}
                actionsToSubscribe={[
                  lessonsCatalogActions.getCatalogItems.typePrefix,
                  lessonsCatalogActions.getCatalogMore.typePrefix
                ]}
              />
            )}

            <SContentBlock as={motion.div} animate={catalogControls}>
              {catalogItems.length ? (
                <>
                  {renderCatalogItems()}
                  <ShowMoreButton
                    onClick={fetchCatalogMore}
                    isLoading={catalogIsLoading}
                    noMore={!moreItemsCanBeLoaded}
                  />
                </>
              ) : (
                renderNoResultsBlock()
              )}
            </SContentBlock>
          </StickyContainer>
        </ThemeProvider>
      </SPageContainer>

      <Footer />
    </LessonsCatalogBg>
  );
};

export default LessonsCatalog;

const SContentBlock = styled.div`
  margin-bottom: 40px;

  ${customMediaQuery('tablet')} {
    margin-bottom: 116px;
  }
`;

const SDesktopFiltersBlock = styled(DesktopFilters)`
  margin-bottom: 24px;
`;

const SStatefulSpinner = styled(StatefulSpinner)`
  margin-top: 100px;
`;

const SNoResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50vh;

  ${customMediaQuery('tablet')} {
    height: 60vh;
  }

  ${customMediaQuery('mobile')} {
    height: 80vh;
  }
`;

const SNoResultsText = styled.h2`
  font-weight: 700;
  font-size: 1.375rem;
  color: #2d2d3a;
  margin: 0 0 8px;
`;

const SNoResultsSecondaryText = styled.p`
  font-size: 1.125rem;
  opacity: 0.8;
  text-align: center;
`;

const SClearFiltersButton = styled(SSecondaryButton)`
  font-size: 1rem;
  min-height: 2.75rem;
  max-height: 2.75rem;
  padding: 0 2rem;
`;
