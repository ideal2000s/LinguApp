import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { tAppDispatch, tAppState } from 'students/stores/rootStore';
import {
  runLesson,
  startLessonSession,
  lessonSelectors,
  fetchLessonSessionIfAuthorized,
  resultsActions
} from 'students/stores/lesson';
import { authActions } from 'students/stores/auth';
import { userSelectors } from 'students/stores/user';

import LessonPage from './LessonPage';
import StudentOnboarding from 'students/views/screens/StudentOnboarding';
import { requestingSelectors } from 'students/stores/requesting';

export type tShowActionButtons = 'hide' | 'start' | 'continue';

const initialActionButtonsState: tShowActionButtons = 'hide';

type tProps = ConnectedProps<typeof connector>;
const LessonPageContainer: React.FC<tProps> = ({
  lesson,
  lessonSession,
  lessonSessionIsLoading,
  startLessonIsLoading,
  onboarding,
  runLesson,
  startLessonSession,
  needAuthCheck
}) => {
  const [showActionButtons, setShowActionButtons] = useState<tShowActionButtons>(
    initialActionButtonsState
  );
  const sessionResults = useSelector(lessonSelectors.selectSessionResults);
  const dispatch = useDispatch<tAppDispatch>();

  // avoid button re-appearing when exiting the lesson
  useEffect(() => {
    // apply initial state on mount
    setShowActionButtons(initialActionButtonsState);
  }, []);

  // clear lesson check section results
  useEffect(() => {
    if (sessionResults.tasks.length) {
      dispatch(resultsActions.clear());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!lessonSession && !lessonSessionIsLoading) {
      setShowActionButtons('start');
    }

    if (lessonSession && !lessonSessionIsLoading) {
      if (lessonSession?.status === 'active') {
        setShowActionButtons('continue');
      } else {
        setShowActionButtons('start');
      }
    }

    if (lessonSessionIsLoading) {
      setShowActionButtons('hide');
    }
  }, [lessonSession, lessonSessionIsLoading]);

  if (!lesson) return null;

  function startLesson() {
    if (lesson) {
      needAuthCheck(async () => {
        return runLesson(lesson.id);
      });
    }
  }

  if (onboarding.length) {
    return <StudentOnboarding />;
  }

  async function restartLesson() {
    if (lesson) {
      await startLessonSession(lesson.id);
      runLesson(lesson.id);
    }
  }

  return (
    <LessonPage
      lesson={lesson}
      lessonSession={lessonSession}
      startLesson={startLesson}
      restartLesson={restartLesson}
      status={showActionButtons}
      startLessonIsLoading={startLessonIsLoading}
    />
  );
};

const mapStateToProps = (state: tAppState) => {
  return {
    lesson: lessonSelectors.selectLesson(state),
    lessonSession: lessonSelectors.selectLessonSession(state),
    profile: userSelectors.selectProfile(state),
    onboarding: userSelectors.selectOnboarding(state),
    lessonSessionIsLoading: requestingSelectors.selectHasRequestingActions([
      fetchLessonSessionIfAuthorized.typePrefix
    ])(state),
    startLessonIsLoading: requestingSelectors.selectHasRequestingActions([
      startLessonSession.typePrefix
    ])(state)
  };
};

const mapDispatchToProps = {
  runLesson,
  startLessonSession,
  needAuthCheck: authActions.needAuthCheck
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LessonPageContainer);
