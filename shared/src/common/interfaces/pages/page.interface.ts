interface IPage {
  id: string;
  authorId: string;
  workspaceId: string;
  parentPageId: string | null;
  name: string;
  subPages: IPage[];
}

export type { IPage };