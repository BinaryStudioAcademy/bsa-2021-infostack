import { IUser } from '../user/user.interface';
import { IPageContent } from './page-content.interface';

interface IPage {
  id: string;
  authorId: string;
  parentPageId?: string;
  childPages?: IPage[];
  pageContents: IPageContent[];
  followingUsers?: IUser[];
}

export type { IPage };
