export interface IComment {
  id: string,
  text: string,
  pageId: string,
  author: {
    id: string;
    fullName: string;
    avatar: string;
  }
  children?: IComment[],
  parentCommentId?: string | null,
}
