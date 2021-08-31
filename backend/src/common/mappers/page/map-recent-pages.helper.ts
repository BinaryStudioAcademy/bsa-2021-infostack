import { RecentPage } from '../../../data/entities/recent-pages';

export const mapToRecentPage = (recentPages: RecentPage[]) => {
  const cutRecentPages = [];
  if (recentPages.length <= 5) {
    for (let item of recentPages) {
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
