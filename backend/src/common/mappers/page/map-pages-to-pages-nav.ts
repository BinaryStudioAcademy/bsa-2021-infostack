import { Page } from 'src/data/entities/page';
import { IPageNav } from 'src/common/interfaces/page';

export const mapPagesToPagesNav = (pages: Page[]): IPageNav[] => {
  return pages.map(({ id, pageContents, childPages }) => {
    const mappedChildren = mapPagesToPagesNav(childPages);
    return {
      id,
      title: pageContents[0]?.title,
      childPages: mappedChildren,
    };
  });
};
