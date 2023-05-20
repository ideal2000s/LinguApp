import { ILearnTextTask } from './readListenTask';
import { ITranslatableTextTask } from './translatableTask';
import { ILearnVideoTask } from './videoTask';
import { ILearnEmbedTask } from './embedTask';
import { IPlayArrangeWordsTask } from './arrangeWordsTask';
import { IInlineDropdownTask } from './inlineDropdownTask';
import { IMultipleChoiceTask } from './selectTextTask';
import { ICheckTrueFalseTask } from './trueFalseTask';
import { ICheckFillInBlanksTask } from './fillInBlanksTask';
import { IFillSentenceGapTask } from './fillSentenceGapTask';
import { IMarkWordTask } from './markWordTask';
import { IMarkWordAudioTask } from './markWordAudioTask';
import { IPlayImageObjectTask } from './imageObjectTask';
import { IPlayAuditionTask } from './auditionTask';
import { IFillInTableTask } from './fillInTableTask';
import { IMinimalPairsTask } from './minimalPairsTask';
import { IPlayImageHotspotTask } from './imageHotspotTask';
import { IWordGamesTask } from './wordGamesTask';
import { IDictationTask } from './dictationTask';
import { IAssignmentTask } from './assignmentTask';
import { tTaskSessionAnswer } from './session';

export * from './readListenTask';
export * from './translatableTask';
export * from './videoTask';
export * from './embedTask';
export * from './arrangeWordsTask';
export * from './inlineDropdownTask';
export * from './selectTextTask';
export * from './trueFalseTask';
export * from './fillInBlanksTask';
export * from './fillSentenceGapTask';
export * from './markWordTask';
export * from './markWordAudioTask';
export * from './imageObjectTask';
export * from './auditionTask';
export * from './fillInTableTask';
export * from './minimalPairsTask';
export * from './imageHotspotTask';
export * from './wordGamesTask';
export * from './dictationTask';
export * from './assignmentTask';
export * from './base';
export * from './session';

export type tLessonTask = tLearnTaskType | tPlayTaskType | tCheckTaskType;

export type tLearnTaskType =
  | ILearnTextTask
  | ITranslatableTextTask
  | ILearnVideoTask
  | ILearnEmbedTask;

export type tPlayTaskType =
  | IPlayArrangeWordsTask
  | IInlineDropdownTask
  | IFillSentenceGapTask
  | IMarkWordTask
  | IMarkWordAudioTask
  | IPlayImageObjectTask
  | IPlayAuditionTask
  | IMinimalPairsTask
  | IPlayImageHotspotTask
  | IWordGamesTask
  | IDictationTask;

export type tCheckTaskType =
  | IInlineDropdownTask
  | IMultipleChoiceTask
  | ICheckTrueFalseTask
  | ICheckFillInBlanksTask
  | IFillInTableTask
  | IAssignmentTask;

export type tAnswer = tTaskSessionAnswer;

export interface ILessonTaskApiResponse {
  task: tLessonTask | null;
}
