import { IBaseTaskItemSession, ILessonTaskBase, ILessonTaskItemBase } from './base';

interface ILanguage {
  code: string;
  name: string;
}

export interface ITranslatableTextTask
  extends ILessonTaskBase<'Tasks::TranslatableText', ITranslatableTextItem> {}
export interface ITranslatableTextItem
  extends ILessonTaskItemBase<'TaskItems::TranslatableText'> {
  content: string;
  translation: string;
  sourceLanguage: ILanguage;
  targetLanguage: ILanguage | null;
  fallbackTargetLanguageCode: string;
}

// ANSWER TYPES
export interface ITranslatableTextTaskItemSession extends IBaseTaskItemSession {}
