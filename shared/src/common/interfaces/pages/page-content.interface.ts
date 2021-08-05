interface IContent {
  id: string;
  authorId: string;
  pageId: string;
  title: string;
  content: string | null;
}

export type { IContent };
