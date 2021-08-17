import { IPageContent } from './page-content.interface';
interface IPageContentWithAuthor extends IPageContent {
  author: { authorId: string; avatar: string; fullName: string };
}
export type { IPageContentWithAuthor };
