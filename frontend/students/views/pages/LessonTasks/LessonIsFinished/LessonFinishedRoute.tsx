import React, { useMemo, lazy, Suspense } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { getLessonPathFromUrl, isLightFontNeeded } from 'students/views/shared/helpers';
import bgRight from 'students/views/shared/assets/bgLightBubbles/bgLightBubbleRight.svg';
import bgLeft from 'students/views/shared/assets/bgLightBubbles/bgLightBubbleLeft.svg';
import ProtectedRoute from 'students/views/shared/components/ProtectedRoute';
import { tAppDispatch, tAppState } from 'students/stores/rootStore';
import { lessonSelectors, goToLesson } from 'students/stores/lesson';
import { customMediaQuery } from 'students/views/shared/styled';
import { getBackgroundColorIfLoaded } from '../../Lessons/Lesson/LessonPage/helpers';
import Page from '../../Page';
import { LessonTaskHeader } from '../LessonTask';

const LessonIsFinishedView = lazy(() => import('./LessonIsFinished'));
const LessonFinishedAnswersList = lazy(() => import('./LessonFinishedAnswersList'));

type tProps = ConnectedProps<typeof connector>;

const LessonFinishedRoute: React.FC<tProps> = ({ lesson, goToLesson }) => {
  const { path, url } = useRouteMatch();
  const lessonPath = getLessonPathFromUrl(url);
  const { gradient, background } = getBackgroundColorIfLoaded(
    lesson?.color || null,
    !!lesson
  );
  const lightBgFont = useMemo(() => isLightFontNeeded(background), [background]);

  return (
    <Page
      background={background}
      gradient={gradient}
      bgImage={`url(${bgLeft}), url(${bgRight})`}
    >
      <LessonTaskHeader
        lessonTitle={lesson?.title}
        onClose={() => lesson && goToLesson(lesson.id)}
        lightFont={lightBgFont}
      />
      <SFinishedBody>
        <Suspense fallback="">
          <Switch>
            <ProtectedRoute
              authenticationPath={lessonPath}
              path={`${path}`}
              component={LessonIsFinishedView}
              exact
            />
            {/* TODO:  make route only if person has completed lesson session */}
            <ProtectedRoute
              authenticationPath={lessonPath}
              path={`${path}/results`}
              component={LessonFinishedAnswersList}
            />
          </Switch>
        </Suspense>
      </SFinishedBody>
    </Page>
  );
};

function mapStateToProps(state: tAppState) {
  return { lesson: lessonSelectors.selectLesson(state) };
}
function mapDispatchToProps(dispatch: tAppDispatch) {
  return bindActionCreators({ goToLesson }, dispatch);
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LessonFinishedRoute);

const SFinishedBody = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  ${customMediaQuery('tablet')} {
    align-items: center;
  }
`;
