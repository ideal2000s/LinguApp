import { FC } from 'react';
import {
  ILearnEmbedTask,
  tLearnTaskType,
  ILearnTextTask,
  ILearnVideoTask,
  ITranslatableTextTask
} from 'students/models';

import LearnTextTask from './LearnTextTask';
import LearnVideoTask from './LearnVideoTask';
import LearnEmbedTask from './LearnEmbedTask';
import LearnTranslatableTextTask from './TranslatableTextTask';

export interface ILearnTaskProps<T> {
  task: T;
  onFinish: () => void;
  lightFont: boolean;
  isCompleting: boolean;
}

export type tLearnComponentType =
  | FC<ILearnTaskProps<ILearnVideoTask>>
  | FC<ILearnTaskProps<ILearnTextTask>>
  | FC<ILearnTaskProps<ILearnEmbedTask>>
  | FC<ILearnTaskProps<ITranslatableTextTask>>;

export const learnTaskMap = new Map<tLearnTaskType['type'], tLearnComponentType>([
  ['Tasks::Text', LearnTextTask],
  ['Tasks::TranslatableText', LearnTranslatableTextTask],
  ['Tasks::Video', LearnVideoTask],
  ['Tasks::Embed', LearnEmbedTask]
]);
