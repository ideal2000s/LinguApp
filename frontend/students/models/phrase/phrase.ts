export interface IPhrase {
  id: number;
  body: string;
  frequency: number;
  wordTranslation: string;
  imageURL: string | null;
  audioURL: string | null;
  animationURL: string | null;
  colorRequired: boolean;
}

export type tLessonPhrases = IPhrase[] | null;
