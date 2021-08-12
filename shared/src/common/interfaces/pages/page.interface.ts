import { IUser } from '../user/user.interface';
import { IPageContent } from './page-content.interface';
import { PermissionType } from '../../enums/index';

interface IPage {
  id: string;
  authorId: string;
  parentPageId?: string;
  childPages?: IPage[];
  pageContents: IPageContent[];
  permission?: PermissionType;
  followingUsers?: IUser[];
}

export type { IPage };
