import { Page } from '../../../data/entities/page';
import { IPageContributor } from '../../interfaces/pages';

export const mapPageToContributors = ({
  author,
  pageContents,
}: Page): IPageContributor[] => {
  const contributors: Record<string, IPageContributor> = {};

  for (const pageContent of pageContents) {
    const { createdAt } = pageContent;
    const { id, fullName, avatar } = pageContent.author;

    if (!contributors[id]) {
      contributors[id] = {
        id,
        fullName,
        avatar,
        isAuthor: id === author.id,
        contributedAtTimestamp: createdAt.getTime(),
      };
    }
  }

  return Object.values(contributors);
};
