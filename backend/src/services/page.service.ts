import { getCustomRepository } from 'typeorm';
import PageRepository from '../data/repositories/page.repository';
import UserRepository from '../data/repositories/user.repository';
import { Page } from '../data/entities/page';
import UserPermissionRepository from '../data/repositories/user-permission.repository';
import { PageContentRepository } from '../data/repositories/page-content.repository';
import { PermissionType } from '../common/enums/permission-type';
import TeamPermissionRepository from '../data/repositories/team-permission.repository';
import { IPageRequest, IPageFollowed } from '../common/interfaces/pages';

export const createPage = async (
  userId: string,
  workspaceId: string,
  body: IPageRequest,
): Promise<Page> => {
  const { parentPageId, ...pageContent } = body;
  const { title, content } = pageContent;

  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.save({
    authorId: userId,
    workspaceId,
    parentPageId,
    pageContent: [pageContent],
  });

  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findById(userId);
  const pageContentRepository = getCustomRepository(PageContentRepository);
  await pageContentRepository.save({
    title,
    content,
    authorId: userId,
    pageId: page.id,
  });

  const userPermissionRepository = getCustomRepository(
    UserPermissionRepository,
  );

  await userPermissionRepository.save({
    user,
    page,
    option: PermissionType.ADMIN,
  });

  return page;
};

export const getPages = async (
  userId: string,
  workspaceId: string,
): Promise<Page[]> => {
  const pageRepository = getCustomRepository(PageRepository);
  const userRepository = getCustomRepository(UserRepository);
  const teamPermissionRepository = getCustomRepository(
    TeamPermissionRepository,
  );
  const userPermissionRepository = getCustomRepository(
    UserPermissionRepository,
  );

  const userTeamsIds = await userRepository.findUserTeams(userId);
  const teamId = userTeamsIds.teams[0]?.id;

  const userTeamsPermissions = await teamPermissionRepository.findByTeamId(
    teamId,
  );

  const userPermissions = await userPermissionRepository.findById(userId);

  const allPages = await pageRepository.findPages(workspaceId);

  const permittedPages: Page[] = allPages.filter(
    (page) =>
      userTeamsPermissions.some((perm) => perm.page.id === page.id) ||
      userPermissions.some((perm) => perm.page.id === page.id),
  );

  const toBeDeleted = new Set<string>();
  const finalPages = permittedPages.reduce((acc, cur, _index, array) => {
    const childPages = array.filter((page) => page.parentPageId === cur.id);
    cur.childPages = childPages;
    childPages.forEach((child) => toBeDeleted.add(child.id));
    acc.push(cur);
    return acc;
  }, []);

  const pagesToShow = finalPages.filter((page) => !toBeDeleted.has(page.id));
  return pagesToShow;
};

export const getPage = async (
  workspaceId: string,
  pageId: string,
): Promise<Page> => {
  const pageRepository = getCustomRepository(PageRepository);
  return pageRepository.findOnePage(workspaceId, pageId);
};

export const getPagesFollowedByUser = async (
  userId: string,
): Promise<IPageFollowed[]> => {
  const userRepository = getCustomRepository(UserRepository);
  const pageContentRepository = getCustomRepository(PageContentRepository);
  const { followingPages } = await userRepository.findById(userId);
  if (followingPages.length > 0) {
    const pages = await Promise.all(followingPages.map(async page => {
      const content = await pageContentRepository.findByPageId(page.id);
      return {
        id: page.id,
        title: content.title,
      };
    }));

    return pages;
  } else {
    return [];
  }
};

export const followPage = async (
  userId: string,
  pageId: string,
): Promise<void> => {
  const pageRepository = getCustomRepository(PageRepository);
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findById(userId);
  const page = await pageRepository.findById(pageId);
  page.followingUsers.push(user);
  user.followingPages.push(page);
  await userRepository.save(user);
  await pageRepository.save(page);
};

export const unfollowPage = async (
  userId: string,
  pageId: string,
): Promise<void> => {
  const pageRepository = getCustomRepository(PageRepository);
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findById(userId);
  const page = await pageRepository.findById(pageId);
  page.followingUsers.splice(page.followingUsers.indexOf(user), 1);
  user.followingPages.splice(user.followingPages.indexOf(page), 1);
  await userRepository.save(user);
  await pageRepository.save(page);
};
