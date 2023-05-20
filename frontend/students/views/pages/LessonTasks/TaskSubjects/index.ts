import { FC } from 'react';
import {
  tLessonTask,
  ILesson,
  tAnswer,
  ITaskSession,
  tLessonPhrases
} from 'students/models';
import LearnTaskContainer from './Learn';
import PlayTaskContainer from './Play';
import CheckTaskContainer from './Check';
import { ILearnSubjectComponentProps } from './Learn/LearnTaskContainer';
import { IPlaySubjectComponentProps } from './Play/PlayTaskContainer';
import { ICheckSubjectComponentProps } from './Check/CheckTaskContainer';

export type tSubjectContainerType =
  | FC<ILearnSubjectComponentProps>
  | FC<IPlaySubjectComponentProps>
  | FC<ICheckSubjectComponentProps>;

export const subjectsMap = new Map<
  tLessonTask['subject'] | undefined,
  tSubjectContainerType | null
>([
  ['teach', LearnTaskContainer],
  ['engage', PlayTaskContainer],
  ['test', CheckTaskContainer],
  [undefined, null]
]);

export type tSubjectComponentProps = {
  lesson: ILesson | null;
  lessonPhrases: tLessonPhrases | null;
  task: tLessonTask;
  taskSession?: ITaskSession | null;
  isLoading?: boolean;
  isCompleting?: boolean;
  onFinish: (answers?: tAnswer) => Promise<unknown | null>;
  onFinishAndNext: (answers?: tAnswer) => Promise<unknown | null>;
  onNext: () => Promise<unknown | null>;
  onExit: () => void;
};
