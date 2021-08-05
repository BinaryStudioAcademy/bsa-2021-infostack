import { getCustomRepository } from 'typeorm';
import { PageRepository } from '../data/repositories/page.repository';
import UserRepository from '../data/repositories/user.repository';
import { Page } from '../data/entities/page';
import { UserPermissionRepository } from '../data/repositories/user-permissions.repository';
import { PageContentRepository } from '../data/repositories/page-content.repository';
import { PermissionType } from '../common/enums/permission-type';
import TeamPermissionRepository from '../data/repositories/team-permission-repository';
import { IPageRequest } from '../common/interfaces/pages';
// import { IPage } from 'infostack-shared';

export const createPage = async (userId: string, workspaceId: string, body: IPageRequest ):Promise<Page> => {
  const { parentPageId, ...pageContent } = body;
  const { title, content } = pageContent;

  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.createAndSave( userId, workspaceId, parentPageId, null, [pageContent]);
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findById(userId);
  const pageContentRepository = getCustomRepository(PageContentRepository);
  await pageContentRepository.createAndSave(userId, title, content, page.id);
  const userPermissionRepository = getCustomRepository(UserPermissionRepository);
  await userPermissionRepository.createAndSave(user, page, PermissionType.ADMIN);

  return page;
};

export const getPages = async (userId: string, workspaceId: string): Promise<Page[]> => {

  const pageRepository = getCustomRepository(PageRepository);
  const userRepository = getCustomRepository(UserRepository);
  const teamPermissionRepository = getCustomRepository(TeamPermissionRepository);
  const userPermissionRepository = getCustomRepository(UserPermissionRepository);

  const userTeamsIds = await userRepository.findUserTeams(userId);
  const teamId = userTeamsIds.teams[0]?.id;

  const userTeamsPermissions = await teamPermissionRepository.findByTeamId(teamId);

  const userPermissions = await userPermissionRepository.findById(userId);

  const allPages = await pageRepository.findPages(workspaceId);

  const permittedPages: Page[] = allPages.filter(page =>
    userTeamsPermissions.some((perm) => perm.page.id === page.id) ||
    userPermissions.some((perm) => perm.page.id === page.id));

  const toBeDeleted = new Set<string>();
  const finalPages = permittedPages.reduce((acc, cur, _index, array) => {
    const childPages = array.filter((page) => page.parentPageId === cur.id);
    cur.childPages = childPages;
    childPages.forEach(child => toBeDeleted.add(child.id));
    acc.push(cur);
    return acc;
  }, []);

  const pagesToShow = finalPages.filter((page) => !toBeDeleted.has(page.id));
  return pagesToShow;
};

export const getPage = async (workspaceId: string, pageId: string): Promise<Page> => {
  const pageRepository = getCustomRepository(PageRepository);
  return pageRepository.findOnePage( workspaceId, pageId);
};
