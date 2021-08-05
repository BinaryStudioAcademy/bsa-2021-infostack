export interface ICommentResponse {
  id: string,
  text: string,
  authorId: string,
  pageId: string,
  parentCommentId?: string,
}
