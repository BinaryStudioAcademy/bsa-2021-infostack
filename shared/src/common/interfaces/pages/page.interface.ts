interface IPage {
  id: string;
  authorId: string;
  workspaceId: string;
  parentPageId: string | null;
  title: string;
  subPages: IPage[] | null;
  content: string | null;
}

export type { IPage };
