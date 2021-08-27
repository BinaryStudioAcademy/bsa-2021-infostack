import { Page } from 'src/data/entities/page';
import { IPage } from 'src/common/interfaces/page';

export const mapPageToIPage = (page: Page): IPage => {
  const {
    id,
    authorId,
    parentPageId,
    childPages,
    pageContents,
    followingUsers,
    pinnedUsers,
    draft,
  } = page;

  const mappedChildren = childPages?.map(mapPageToIPage);
  const mappedpageContents = pageContents?.map((content) => ({
    ...content,
    createdAt: content.createdAt?.toISOString(),
    updatedAt: content.updatedAt?.toISOString(),
    deletedAt: content.deletedAt?.toISOString(),
  }));
  const mappedFollowingUsers = followingUsers?.map(
    ({ id, fullName, email, avatar }) => {
      return {
        id,
        fullName,
        email,
        avatar,
      };
    },
  );

  const mappedPinnedUsers = pinnedUsers?.map(
    ({ id, fullName, email, avatar }) => {
      return {
        id,
        fullName,
        email,
        avatar,
      };
    },
  );

  const mappedDraft = {
    id: draft?.id,
    title: draft?.title,
    content: draft?.content,
    pageId: draft?.pageId,
  };

  return {
    id,
    authorId,
    parentPageId,
    childPages: mappedChildren,
    pageContents: mappedpageContents,
    followingUsers: mappedFollowingUsers,
    pinnedUsers: mappedPinnedUsers,
    draft: mappedDraft,
  };
};
