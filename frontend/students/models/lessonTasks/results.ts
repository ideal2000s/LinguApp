import { tLessonTaskItemType, tQuestionFormat, tTaskType } from '.';

interface ILessonTasksResults<
  Type extends tTaskType = tTaskType,
  IItem extends ILessonTaskResultsItemBase = ILessonTaskResultsItemBase
> {
  type: Type;
  title: string;
  items: IItem[];
  id: number;
}

interface ILessonTaskResultsItemBase {
  id: number;
  type: tLessonTaskItemType;
  position: number;
}

// Fill in table task
export interface IFillInTableTaskResults
  extends ILessonTasksResults<'Tasks::FillInTable', IFillInTableResultItem> {
  audioQuestionFormat: boolean;
  columns: number;
  h1: string | null;
  h2: string | null;
  h3: string | null;
  questionFormat: tQuestionFormat;
}

export interface IFillInTableResultItem extends ILessonTaskResultsItemBase {
  question: string;
  audioURL: string | null;
  options: {
    id: number;
    answers: string[];
  }[];
  itemSession: {
    answer: string[];
  };
}

// Multiple choice
export interface IMultipleChoiceTaskResults
  extends ILessonTasksResults<'Tasks::SelectText', IMultipleChoiceResultsItem> {}

export interface IMultipleChoiceResultsItem extends ILessonTaskResultsItemBase {
  question: string;
  options: IMultipleChoiceResultsItemOption[];
  itemSession: {
    options: {
      answer: boolean | null;
      taskItemOptionId: number;
    }[];
  };
}

export interface IMultipleChoiceResultsItemOption {
  id: number;
  answer: string;
  correct: boolean;
}

// Fill in blanks / inline dropdown
export interface IFillInBlanksTaskResults
  extends ILessonTasksResults<
    'Tasks::FillInBlanks' | 'Tasks::InlineDropdown',
    IFillInBlanksResultsItem
  > {}

export interface IFillInBlanksResultsItem extends ILessonTaskResultsItemBase {
  question: string;
  solution: string[][];
  itemSession: {
    answer: string[];
  };
}

export interface IInlineDropdownTaskResults
  extends ILessonTasksResults<'Tasks::InlineDropdown', IInlineDropdownResultsItem> {}

export interface IInlineDropdownResultsItem extends ILessonTaskResultsItemBase {
  solution: string[];
  answers: string[][];
  itemSession: {
    answer: string[];
  };
  statement: string;
}

// TrueFalse
export interface ITrueFalseTaskResults
  extends ILessonTasksResults<'Tasks::TrueFalse', ITrueFalseResultsItem> {}

export interface ITrueFalseResultsItem extends ILessonTaskResultsItemBase {
  statement: string;
  correct: boolean;
  itemSession: {
    answer: boolean;
  };
}

export interface ITaskResultsResponse {
  tasks: (
    | ITrueFalseTaskResults
    | IInlineDropdownTaskResults
    | IFillInBlanksTaskResults
    | IMultipleChoiceTaskResults
    | IFillInTableTaskResults
  )[];
  taskItemsPublishedCount: number;
  taskItemsCorrectlyAnsweredCount: number;
}
