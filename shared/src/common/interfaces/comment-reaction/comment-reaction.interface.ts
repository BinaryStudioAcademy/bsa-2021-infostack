import { IUserAccount } from '../user/user-account.interface';

interface ICommentReaction {
  id?: string;
  reaction?: string;
  userId?: string;
  commentId?: string;
  unified?: string;
  user?: IUserAccount;
}

export type { ICommentReaction };
