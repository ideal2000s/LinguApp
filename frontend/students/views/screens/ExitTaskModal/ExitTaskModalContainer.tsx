import React from 'react';
import { useDispatch } from 'react-redux';
import ExitTaskModal from './ExitTaskModal';
import { lessonTaskActions } from 'students/stores/lessonTask';

const ExitTaskModalContainer: React.FC = () => {
  const dispatch = useDispatch();

  function exitHandler() {
    dispatch(lessonTaskActions.exitLessonTask());
  }

  return <ExitTaskModal onExit={exitHandler} />;
};

export default ExitTaskModalContainer;
