import { IComment } from './comment.interface';

export interface ICommentResponse extends IComment {
  children?: IComment[];
}
