import { IPageRecent } from '../../../common/interfaces/page';
import { RecentPage } from '../../../data/entities/recent-pages';

export const mapToRecentPage = (recentPages: RecentPage[]): IPageRecent[] => {
  const cutRecentPages = [];
  if (recentPages.length <= 5) {
    for (const item of recentPages) {
      cutRecentPages.push(item);
    }
  } else {
    for (let i = 0; i < 5; i++) {
      cutRecentPages.push(recentPages[i]);
    }
  }

  return cutRecentPages.map(({ pageId, createdAt, page }) => ({
    visited: createdAt.toLocaleString(),
    pageId,
    title: page.pageContents[0].title,
  }));
};
