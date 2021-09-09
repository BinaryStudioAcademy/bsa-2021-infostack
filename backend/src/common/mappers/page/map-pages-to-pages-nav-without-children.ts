import { Page } from 'src/data/entities';
import { IPageNav } from '~/common/interfaces';

export const mapPagesToPagesNavWithoutChildren = (
  pages: Page[],
): IPageNav[] => {
  return pages.map(({ id, pageContents }) => ({
    id,
    title: pageContents[0]?.title,
    childPages: [],
  }));
};
