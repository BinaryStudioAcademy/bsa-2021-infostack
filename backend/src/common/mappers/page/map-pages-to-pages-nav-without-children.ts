import { Page } from 'src/data/entities/page';
import { IPageNav } from 'src/common/interfaces/page';

export const mapPagesToPagesNavWithoutChildren = (
  pages: Page[],
): IPageNav[] => {
  return pages.map(({ id, pageContents }) => {
    return {
      id,
      title: pageContents[0]?.title,
      childPages: [],
    };
  });
};
