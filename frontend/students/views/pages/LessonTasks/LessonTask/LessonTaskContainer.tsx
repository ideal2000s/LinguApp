import React, { ComponentType, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { tAppState } from 'students/stores/rootStore';
import { lessonPhrasesActions, lessonSelectors } from 'students/stores/lesson';
import { lessonTaskSelectors, lessonTaskActions } from 'students/stores/lessonTask';
import { modalActions } from 'students/stores/modal';
import { subjectsMap, tSubjectComponentProps } from '../TaskSubjects';
import ExitTaskModalContainer from 'students/views/screens/ExitTaskModal';
import { useBeforeUnload } from 'students/views/shared/hooks';
import { tAnswer } from 'students/models';
import { requestingSelectors } from 'students/stores/requesting';
import { HeartBeatContextProvider } from 'students/views/shared/components/HeartBeat';
import IdleScreen from 'students/views/screens/IdleScreen';
import useHeartBeatPing from 'students/views/shared/components/HeartBeat/useHeartBeatPing';
import LessonTaskProgress from './LessonTaskProgress';

type tProps = ConnectedProps<typeof connector>;
const LessonTaskContainer: React.FC<tProps> = ({
  lessonTask,
  lessonTaskSession,
  lessonPhrases,
  fetchLessonTask,
  fetchLessonTaskSession,
  fetchLessonPhrases,
  nextLessonTask,
  finishLessonTask,
  finishAndNextLessonTask,
  openExitModal,
  exitLessonTask,
  lesson,
  lessonSession
}) => {
  const { taskId: taskIdString, lessonId: lessonIdString } = useParams<{
    taskId: string;
    lessonId: string;
  }>();
  const lessonId = parseInt(lessonIdString);
  const taskId = parseInt(taskIdString);

  const taskIsLoading = useSelector(
    requestingSelectors.selectHasRequestingActions([
      lessonTaskActions.fetchLessonTask.typePrefix,
      lessonTaskActions.fetchLessonTaskSession.typePrefix
    ])
  );

  const taskIsCompleting = useSelector(
    requestingSelectors.selectHasRequestingActions([
      lessonTaskActions.finishLessonTask.typePrefix,
      lessonTaskActions.nextLessonTask.typePrefix,
      lessonTaskActions.finishAndNextLessonTask.typePrefix
    ])
  );

  const pingAction = useHeartBeatPing();

  useEffect(() => {
    fetchLessonTask({ taskId, lessonId });
    fetchLessonTaskSession({ taskId, lessonId }).then(() => {
      pingAction();
    });
    fetchLessonPhrases(lessonId);
  }, [
    taskId,
    lessonId,
    fetchLessonTask,
    fetchLessonTaskSession,
    fetchLessonPhrases,
    pingAction
  ]);

  useBeforeUnload(pingAction);

  async function handleFinish(answers?: tAnswer) {
    if (!taskIsLoading && lessonSession && lessonTaskSession) {
      pingAction();

      return await finishLessonTask({
        taskSessionId: lessonTaskSession.id,
        lessonSessionId: lessonSession.id,
        answers
      });
    }
    return null;
  }

  async function nextTask() {
    if (!taskIsLoading && lessonSession) {
      return await nextLessonTask({
        lessonSessionId: lessonSession.id
      });
    }
    return null;
  }

  async function handleFinishAndNext(answers?: tAnswer) {
    if (!taskIsLoading && lessonSession && lessonTaskSession) {
      pingAction();

      return await finishAndNextLessonTask({
        taskSessionId: lessonTaskSession.id,
        lessonSessionId: lessonSession.id,
        answers
      });
    }
    return null;
  }

  function handleExit() {
    pingAction();

    return openExitModal('exitTaskModal');
  }

  if (!lessonTask) return null;

  const SubjectComponent = subjectsMap.get(
    lessonTask.subject
  ) as ComponentType<tSubjectComponentProps>;
  return SubjectComponent ? (
    <>
      <LessonTaskProgress isLoading={taskIsLoading} taskSession={lessonTaskSession} />
      <HeartBeatContextProvider>
        <SubjectComponent
          lesson={lesson}
          task={lessonTask}
          taskSession={lessonTaskSession}
          lessonPhrases={lessonPhrases}
          isLoading={taskIsLoading}
          isCompleting={taskIsCompleting}
          onFinish={handleFinish}
          onFinishAndNext={handleFinishAndNext}
          onNext={nextTask}
          onExit={handleExit}
        />
        <ExitTaskModalContainer />
        <IdleScreen lesson={lesson} onExit={exitLessonTask} />
      </HeartBeatContextProvider>
    </>
  ) : null;
};

function mapStateToProps(state: tAppState) {
  return {
    lessonTask: lessonTaskSelectors.selectLessonTask(state),
    lessonTaskSession: lessonTaskSelectors.selectSortedLessonTaskSession(state),
    lesson: lessonSelectors.selectLesson(state),
    lessonSession: lessonSelectors.selectLessonSession(state),
    lessonPhrases: lessonSelectors.selectLessonPhrases(state)
  };
}

const {
  fetchLessonTask,
  fetchLessonTaskSession,
  finishLessonTask,
  finishAndNextLessonTask,
  nextLessonTask
} = lessonTaskActions;

const mapDispatchToProps = {
  fetchLessonTask,
  fetchLessonTaskSession,
  fetchLessonPhrases: lessonPhrasesActions.fetchLessonPhrases,
  finishLessonTask,
  finishAndNextLessonTask,
  nextLessonTask,
  openExitModal: modalActions.open,
  exitLessonTask: lessonTaskActions.exitLessonTask
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LessonTaskContainer);
