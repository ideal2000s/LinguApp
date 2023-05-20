export type tTaskType =
  | 'Tasks::ArrangeWords'
  | 'Tasks::Audio'
  | 'Tasks::AudioDialogue'
  | 'Tasks::Audition'
  | 'Tasks::Dictation'
  | 'Tasks::Email'
  | 'Tasks::Embed'
  | 'Tasks::Essay'
  | 'Tasks::File'
  | 'Tasks::FillGap'
  | 'Tasks::FillInBlanks'
  | 'Tasks::FillInTable'
  | 'Tasks::ImageHotspot'
  | 'Tasks::ImageObject'
  | 'Tasks::InlineDropdown'
  | 'Tasks::MarkWord'
  | 'Tasks::MarkWordAudio'
  | 'Tasks::SMS'
  | 'Tasks::SelectImage'
  | 'Tasks::SelectText'
  | 'Tasks::SelectVideo'
  | 'Tasks::Text'
  | 'Tasks::TranslatableText'
  | 'Tasks::TrueFalse'
  | 'Tasks::Video'
  | 'Tasks::WordGames';

export type tLessonTaskItemType =
  | 'TaskItems::ArrangeWords'
  | 'TaskItems::Audio'
  | 'TaskItems::AudioDialogue'
  | 'TaskItems::Audition'
  | 'TaskItems::Dictation'
  | 'TaskItems::Email'
  | 'TaskItems::Embed'
  | 'TaskItems::Essay'
  | 'TaskItems::File'
  | 'TaskItems::FillGap'
  | 'TaskItems::FillInBlanks'
  | 'TaskItems::FillInTable'
  | 'TaskItems::ImageHotspot'
  | 'TaskItems::ImageObject'
  | 'TaskItems::InlineDropdown'
  | 'TaskItems::MarkWord'
  | 'TaskItems::MarkWordAudio'
  | 'TaskItems::SMS'
  | 'TaskItems::SelectImage'
  | 'TaskItems::SelectText'
  | 'TaskItems::SelectVideo'
  | 'TaskItems::Text'
  | 'TaskItems::TranslatableText'
  | 'TaskItems::TrueFalse'
  | 'TaskItems::Video'
  | 'TaskItems::WordGames';

export interface ILessonTaskBase<
  Type extends tTaskType = tTaskType,
  I extends ILessonTaskItemBase = ILessonTaskItemBase
> {
  id: number;
  lessonId: number;
  title: string;
  items: Array<I>;
  type: Type;
  subject: 'teach' | 'engage' | 'test';
  audioURL: string | null;
  imageURL: string | null;
  mobileImageURL: string | null;
  giphyImage: tGiphyImage;
  coverImg: boolean;
  introduction: string;
  url: string;
}

export interface ILessonTaskItemBase<
  Type extends tLessonTaskItemType = tLessonTaskItemType
> {
  id: number;
  type: Type;
  position?: number | null;
  audioURL?: string | null;
}

export interface ILessonTaskBaseItemAnswer {
  itemId: number;
}

export type tLessonTaskBaseAnswer<T extends ILessonTaskBaseItemAnswer> = T[];

export interface IBaseTaskItemSession {
  id: number;
  taskItemId: number;
  completed: boolean;
  attemptsCount: number;
}

export type tGiphyImage = {
  embedURL: string;
  originalURL: string;
  thumbnail: string;
  title: string;
  url: string;
} | null;
