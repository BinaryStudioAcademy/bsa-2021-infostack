import { IPageRecent } from 'infostack-shared';
import { RecentPage } from '../../../data/entities/recent-pages';

export const mapToRecentPage = (recentPages: RecentPage[]): IPageRecent[] => {
  const cutRecentPages: RecentPage[] = [];
  if (recentPages.length <= 5) {
    for (const item of recentPages) {
      cutRecentPages.push(item);
    }
  } else {
    for (let i = 0; i < 5; i++) {
      cutRecentPages.push(recentPages[i]);
    }
  }

  const mappedRecentPages = cutRecentPages.map(
    ({ pageId, createdAt, page }) => ({
      visited: createdAt.toLocaleString(),
      pageId,
      title: page.pageContents.sort((a, b) =>
        b.updatedAt > a.updatedAt ? 1 : -1,
      )[0].title,
    }),
  );

  return mappedRecentPages as unknown as IPageRecent[];
};
