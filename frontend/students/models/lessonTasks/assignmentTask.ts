import {
  ILessonTaskBase,
  ILessonTaskItemBase,
  IBaseTaskItemSession,
  tGiphyImage
} from './base';
import { tTaskSessionAnswer, ITaskSession } from './session';

export interface IAssignmentReviewerTeam {
  id: number;
  name: string;
  about: string;
  lessonsCount: number;
  followersCount: number;
  imageURL: string;
}

export interface IAssignmentTask
  extends ILessonTaskBase<
    'Tasks::Essay' | 'Tasks::Audio' | 'Tasks::File',
    IAssignmentItem
  > {
  reviewer: IAssignmentReviewerTeam | null;
  videoURL: string | null;
}

export enum MessengerInputType {
  Text = 'text',
  Audio = 'audio',
  File = 'file'
}

export enum MessengerSenderType {
  Out = 'out',
  Into = 'into'
}

export interface IAssignmentItemMessage {
  id?: number;
  from: MessengerSenderType;
  type: MessengerInputType;
  title: string | null;
  text: string | null;
  imageURL: string | null;
  audioURL: string | null;
  videoURL?: string | null;
  mobileImageURL?: string | null;
  giphyImage?: tGiphyImage;
  coverImg?: boolean;
}

export interface IAssignmentItem
  extends ILessonTaskItemBase<
    'TaskItems::Essay' | 'TaskItems::Audio' | 'TaskItems::File'
  > {
  messages: IAssignmentItemMessage[];
  minimumWords?: number;
  minimumDuration?: number;
  type: 'TaskItems::Essay' | 'TaskItems::Audio' | 'TaskItems::File';
}

export interface IAssignmentTaskSession
  extends ITaskSession<IAssignmentTaskItemSession> {}

export interface IAssignmentTaskItemSession extends IBaseTaskItemSession {}

export type tAssignmentAnswer = tTaskSessionAnswer<IAssignmentTaskItemSession>;
