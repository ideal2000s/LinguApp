import React, { FC, useState, useEffect, ComponentType } from 'react';
import { Provider } from 'react-redux';
import { configureStore, createReducer } from '@reduxjs/toolkit';
import { ITaskSession, tLessonTask } from 'students/models/lessonTasks';
import { ILesson, tLessonPhrases } from 'students/models';
import withSRootStyle from 'students/views/shared/HOCs/withSRootStyle';
import LearnTaskContainer from 'students/views/pages/LessonTasks/TaskSubjects/Learn';
import CheckTaskContainer from 'students/views/pages/LessonTasks/TaskSubjects/Check';
import PlayTaskContainer from 'students/views/pages/LessonTasks/TaskSubjects/Play';
import {
  tSubjectComponentProps,
  tSubjectContainerType
} from 'students/views/pages/LessonTasks/TaskSubjects';
import apiServiceCreator from 'students/utils/apiService';

import 'students/styles.scss';

interface IPreview {
  remoteURL: string;
}

type tData = {
  lesson?: ILesson;
  lessonPhrases: tLessonPhrases;
  task: tLessonTask;
  taskSession?: ITaskSession | null;
};

const TASK_MAP = new Map<
  tLessonTask['subject'] | undefined,
  tSubjectContainerType | null
>([
  ['teach', LearnTaskContainer],
  ['test', CheckTaskContainer],
  ['engage', PlayTaskContainer],
  [undefined, null]
]);

const mockStore = configureStore({
  reducer: createReducer({ lesson: { gameplays: { gameplay: { id: 1 } } } }, {})
});

const Preview: FC<IPreview> = ({ remoteURL }) => {
  const [previewData, setPreviewData] = useState<tData | null>();
  const [phrases, setPhrases] = useState<tLessonPhrases>(null);

  useEffect(() => {
    if (remoteURL) {
      const asyncFetchData = async () => {
        const apiService = apiServiceCreator({
          authFailureAction: () => {
            /* empty */
          }
        });
        const { data } = await apiService(remoteURL, { noUrlPrefix: true });
        setPreviewData(data);
        setPhrases(data.lessonPhrases);
      };

      asyncFetchData();
    }
  }, [remoteURL]);

  if (previewData) {
    const mockRequest = (): Promise<unknown> =>
      new Promise(() => {
        /* empty */
      });
    const TaskToRender = TASK_MAP.get(
      previewData.task.subject
    ) as ComponentType<tSubjectComponentProps>;

    const bodyStyles = document.createElement('style');
    bodyStyles.innerHTML = `
      body {
        overflow-x: hidden;
      }
  
      body::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }
  
      body::-webkit-scrollbar-track {
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.1);
      }
  
      body::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.15);
      }
  
      body::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.3);
      }
  
      body::-webkit-scrollbar-thumb:active {
        background: rgba(0, 0, 0, 0.65);
      }
    `;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document
      .querySelector('div[data-react-class="components/Preview"]')
      .parentNode.appendChild(bodyStyles);

    return TaskToRender ? (
      <Provider store={mockStore}>
        <TaskToRender
          lesson={previewData?.lesson || null}
          lessonPhrases={phrases}
          task={previewData.task}
          taskSession={previewData.taskSession}
          isLoading={false}
          isCompleting={false}
          onNext={mockRequest}
          onFinish={mockRequest}
          onFinishAndNext={mockRequest}
          onExit={mockRequest}
        />
      </Provider>
    ) : null;
  }

  return null;
};

export default withSRootStyle(Preview);
