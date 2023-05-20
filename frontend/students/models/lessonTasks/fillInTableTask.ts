import { ILessonTaskBase, ILessonTaskItemBase, IBaseTaskItemSession } from './base';
import { tTaskSessionAnswer, ITaskSession } from './session';

export type tQuestionFormat = 'text' | 'audio';

export interface IFillInTableTask
  extends ILessonTaskBase<'Tasks::FillInTable', IFillInTableItem> {
  audioQuestionFormat: boolean;
  audioQuestionDemo?: string;
  column1Demo: string | null;
  column2Demo: string | null;
  columns: number;
  h1: string | null;
  h2: string | null;
  h3: string | null;
  hasDemo: boolean;
  videoURL: string | null;
  image: {
    width: number;
    height: number;
  };
  questionDemo: string | null;
  questionFormat: tQuestionFormat;
}

export interface IFillInTableItemOption {
  id: number;
  answers: string[];
}

export interface IFillInTableItem extends ILessonTaskItemBase<'TaskItems::FillInTable'> {
  options: IFillInTableItemOption[];
  question: string;
}

export interface IFillInTableTaskSession
  extends ITaskSession<IFillInTableTaskItemSession> {}

export interface IFillInTableTaskItemSession extends IBaseTaskItemSession {
  answers: Array<string>;
}

export type tFillInTableAnswer = tTaskSessionAnswer<IFillInTableTaskItemSession>;
