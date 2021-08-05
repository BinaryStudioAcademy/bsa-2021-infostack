interface IPageContent {
  id: string;
  authorId: string;
  pageId: string;
  title: string;
  content?: string;
  createdAt: string;
  deletedAt?: string;
  updatedAt?: string;
}
export type { IPageContent };
