import { IPhrase } from '../phrase';

export interface IWordNodesItem {
  id?: number;
  question: string;
  list: string[];
  answer: string;
  phrase?: IPhrase;
}

export type tWordNodesData = IWordNodesItem[];
