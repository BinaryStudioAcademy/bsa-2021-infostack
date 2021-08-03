interface IContent {
  id: string;
  authorId: string;
  pageId: string;
  title: string;
  content: string | null;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string | null;
}

export type { IContent };
