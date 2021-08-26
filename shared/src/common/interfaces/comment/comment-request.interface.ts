export interface ICommentRequest {
  text: string;
  mentionIds: string[];
  parentCommentId?: string;
}
