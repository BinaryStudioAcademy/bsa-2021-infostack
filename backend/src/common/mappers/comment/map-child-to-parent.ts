import { IComment } from '../../interfaces/comment';

export const mapChildToParent = (comments: IComment[]): IComment[] => {
  const commentMap = new Map();

  comments.forEach((c) => commentMap.set(c.id, c));
  comments.forEach((c) => {
    if (c.parentCommentId) {
      const parentComment = commentMap.get(c.parentCommentId);
      (parentComment.children = parentComment.children || []).push(c);
    }
  });

  return comments.filter((c) => c.parentCommentId === null);
};
