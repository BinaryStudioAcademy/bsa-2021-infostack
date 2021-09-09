import { IPageStatistic } from '../../interfaces';
import { RecentPage } from '../../../data/entities';

export const mapToRecentPage = (
  recentPages: RecentPage[],
): IPageStatistic[] => {
  const slicedRecentPages: RecentPage[] = recentPages.slice(0, 5);

  const mappedRecentPages = slicedRecentPages.map(
    ({ pageId, createdAt, page }) => ({
      date: createdAt.toLocaleString(),
      pageId,
      title: page.pageContents.sort((a, b) =>
        b.updatedAt > a.updatedAt ? 1 : -1,
      )[0].title,
    }),
  );

  return mappedRecentPages;
};
