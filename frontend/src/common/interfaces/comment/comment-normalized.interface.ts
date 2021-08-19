import { IComment } from './index';

export interface ICommentNormalized extends IComment {
  children?: string[];
}
