import { IUserActivity } from './index';

interface IUserActivityRawResult {
  id: string;
  authorId: string;
  fullName: string;
  avatar: string;
  createdAtTimestamp: number;
  pageId: string;
  title: string;
  content: string;
  type: IUserActivity['type'];
  isNew: boolean;
}

export type { IUserActivityRawResult };
