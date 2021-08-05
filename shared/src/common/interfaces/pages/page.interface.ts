import { IContent } from './page-content.interface';

interface IPage {
  id: string;
  authorId: string;
  workspaceId: string;
  parentPageId: string | null;
  childPages: IPage[] | null;
  pageContents: IContent[];
}

export type { IPage };
