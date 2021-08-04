import { getCustomRepository } from 'typeorm';
import { PageRepository } from '../data/repositories/page.repository';
import UserRepository from '../data/repositories/user.repository';
import { Page } from '../data/entities/page';
import { UserPermissionRepository } from '../data/repositories/user-permissions.repository';
import { PageContentRepository } from '../data/repositories/page-content.repository';
import { PermissionType } from '../common/enums/permission-type';
import TeamPermissionRepository from '../data/repositories/team-permission-repository';

export const createPage = async (userId: string, workspaceId: string, body: any):Promise<Page> => {
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

// export const createVersionPage = async (req: Request): Promise<Page> => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   const userId = jwt.decode(token) as string;
//   const workspaceId = req.cookies['workspaceId'];

//   const pageRepository = getCustomRepository(PageRepository);
//   return pageRepository.createAndSave( userId, workspaceId, null, null );
// };

export const getPages = async (userId: string, workspaceId: string): Promise<Page[]> => {

  const pageRepository = getCustomRepository(PageRepository);
  const userRepository = getCustomRepository(UserRepository);
  const teamPermissionRepository = getCustomRepository(TeamPermissionRepository);
  const userPermissionRepository = getCustomRepository(UserPermissionRepository);

  const userTeamsIds = await userRepository.findUserTeams(userId);
  const teamId = userTeamsIds.teams.length ? userTeamsIds.teams[0].id : null;

  const userTeamsPermissions = await teamPermissionRepository.findByTeamId(teamId);

  const userPermissions = await userPermissionRepository.findById(userId);

  const allPages = await pageRepository.findPages(workspaceId);

  interface IPageWithChildren extends Page {
    children?: Page[]
  }

  const permittedPages: IPageWithChildren[] = allPages.filter(page =>
    userTeamsPermissions.some((perm) => perm.page.id === page.id) ||
    userPermissions.some((perm) => perm.page.id === page.id));

  const toBeDeleted = new Set<string>();
  const finalPages = permittedPages.reduce((acc, cur, _index, array) => {
    const children = array.filter((page) => page.parentPageId === cur.id);
    cur.children = children;
    children.forEach(child => toBeDeleted.add(child.id));
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
