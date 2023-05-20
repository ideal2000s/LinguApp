import { FC } from 'react';
import {
  ICheckFillInBlanksTask,
  tCheckTaskType,
  ICheckTrueFalseTask,
  IInlineDropdownTask,
  IMultipleChoiceTask,
  tAnswer,
  IMultipleChoiceTaskSession,
  IInlineDropdownTaskSession,
  ITrueFalseTaskSession,
  IFillInBlanksTaskSession,
  IFillInTableTask,
  IFillInTableTaskSession,
  IAssignmentTask,
  IAssignmentTaskSession
} from 'students/models';

import CheckTrueFalseTask from './TrueFalseTask';
import CheckMultipleChoiceTask from './MultipleChoiceTask';
import CheckInlineDropdownTask from './InlineDropdownTask';
import CheckFillInBlanksTask from './FillInBlanksTask';
import CheckFillInTableTask from './FillInTableTask';
import CheckAssignmentTask from './AssignmentTask';

export interface ICheckTaskProps<T, TS> {
  task: T;
  taskSession?: TS;
  className?: string;
  onNext: (answers: tAnswer) => void;
  onSkip: () => void;
  isCompleting: boolean;
}

export type tCheckComponentType =
  | FC<ICheckTaskProps<IMultipleChoiceTask, IMultipleChoiceTaskSession>>
  | FC<ICheckTaskProps<IInlineDropdownTask, IInlineDropdownTaskSession>>
  | FC<ICheckTaskProps<ICheckTrueFalseTask, ITrueFalseTaskSession>>
  | FC<ICheckTaskProps<ICheckFillInBlanksTask, IFillInBlanksTaskSession>>
  | FC<ICheckTaskProps<IFillInTableTask, IFillInTableTaskSession>>
  | FC<ICheckTaskProps<IAssignmentTask, IAssignmentTaskSession>>;

export const checkTaskMap = new Map<tCheckTaskType['type'], tCheckComponentType>([
  ['Tasks::SelectText', CheckMultipleChoiceTask],
  ['Tasks::InlineDropdown', CheckInlineDropdownTask],
  ['Tasks::TrueFalse', CheckTrueFalseTask],
  ['Tasks::FillInBlanks', CheckFillInBlanksTask],
  ['Tasks::FillInTable', CheckFillInTableTask],
  ['Tasks::Essay', CheckAssignmentTask],
  ['Tasks::Audio', CheckAssignmentTask],
  ['Tasks::File', CheckAssignmentTask]
]);
