import { IUser } from '../user';
import { IPageContent } from './page-content.interface';
interface IPageContentWithAuthor extends IPageContent {
  author: IUser;
}
export type { IPageContentWithAuthor };
