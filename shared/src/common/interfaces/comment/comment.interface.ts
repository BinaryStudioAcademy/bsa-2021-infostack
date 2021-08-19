import { ICommentReaction } from '../comment-reaction';

export interface IComment {
  id: string;
  createdAt: string;
  text: string;
  pageId: string;
  author: {
    id: string;
    fullName: string;
    avatar: string;
    email: string;
  };
  reactions?: ICommentReaction[];
}
