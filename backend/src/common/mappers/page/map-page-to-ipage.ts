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
  } = page;

  const mappedChildren = childPages?.map(mapPageToIPage);
  const mappedpageContents = pageContents?.map((content) => ({
    ...content,
    createdAt: content.createdAt?.toISOString(),
    updatedAt: content.updatedAt?.toISOString(),
    deletedAt: content.deletedAt?.toISOString(),
  }));
  const mappedFollowingUsers = followingUsers?.map((user) => {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
    };
  });

  return {
    id,
    authorId,
    parentPageId,
    childPages: mappedChildren,
    pageContents: mappedpageContents,
    followingUsers: mappedFollowingUsers,
  };
};
