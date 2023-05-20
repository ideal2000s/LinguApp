interface IWordWaterfallListItem {
  word: string;
  id: number;
}

export interface IWordWaterfallItem {
  id: number;
  question: {
    text: string;
    imageURL: string | null;
    animationURL: string | null;
    colorRequired: boolean;
  };
  list: IWordWaterfallListItem[];
  answer: string;
}

export type tWordWaterfallData = IWordWaterfallItem[];
