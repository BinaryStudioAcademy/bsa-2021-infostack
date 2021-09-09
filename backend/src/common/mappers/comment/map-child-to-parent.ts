import { IComment } from '../../interfaces';

export const mapChildToParent = (comments: IComment[]): IComment[] => {
  const mappedComments = new Map();

  comments.forEach((c) => mappedComments.set(c.id, c));
  comments.forEach((c) => {
    if (c.parentCommentId) {
      const parentComment = mappedComments.get(c.parentCommentId);
      (parentComment.children = parentComment.children || []).push(c);
    }
  });

  return comments.filter((c) => c.parentCommentId === null);
};
