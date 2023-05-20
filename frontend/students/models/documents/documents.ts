export interface ICommentAuthor {
  id: number;
  name: string;
  avatarURL: string | null;
  type: 'User' | 'Student';
}

export interface IDocumentComment {
  id: number;
  content: string;
  createdAt: string;
  audioURL: string | null;
  author: ICommentAuthor;
}

export interface IDocument {
  id: number;
  content: string;
  audioURL: string | null;
  comments: Array<IDocumentComment>;
}

export interface IDocumentApiRequest {
  content?: string | null;
  audio?: Blob | null;
}

export interface IDocumentApiResponse {
  document: IDocument | null;
}
