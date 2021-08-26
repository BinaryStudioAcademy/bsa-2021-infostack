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
  parentCommentId: string | null;
  voiceRecord: string | null;
  reactions?: ICommentReaction[];
}
