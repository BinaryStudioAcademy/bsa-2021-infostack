import { Page } from 'src/data/entities/page';
import { IPage } from 'src/common/interfaces/pages';

export const mapPageToIPage = (
  page: Page,
): IPage => {
  const {
    id,
    authorId,
    parentPageId,
    childPages,
    pageContents,
  } = page;

  const mappedChildren = childPages?.map(mapPageToIPage);
  const mappedpageContents = pageContents?.map((content) => ({
    ...content,
    createdAt: content.createdAt?.toISOString(),
    updatedAt: content.updatedAt?.toISOString(),
    deletedAt: content.deletedAt?.toISOString(),
  }));

  return {
    id,
    authorId,
    parentPageId,
    childPages: mappedChildren,
    pageContents: mappedpageContents,
  };
};
