import { getCustomRepository } from 'typeorm';
import PageRepository from '../data/repositories/page-repository';
import UserRepository from '../data/repositories/user.repository';
import { Page } from '../data/entities/page';
import UserPermissionRepository from '../data/repositories/user-permission.repository';
import TeamPermissionRepository from '../data/repositories/team-permission-repository';
import { IPage } from 'infostack-shared';

export const getPages = async (userId: string,  workspaceId: string): Promise<Page[]> => {

  const pageRepository = getCustomRepository(PageRepository);
  const userRepository = getCustomRepository(UserRepository);
  const teamPermissionRepository = getCustomRepository(TeamPermissionRepository);
  const userPermissionRepository = getCustomRepository(UserPermissionRepository);

  const userTeamsIds = await userRepository.findUserTeams(userId);
  const teamId = userTeamsIds.teams.length ? userTeamsIds.teams[0].id : null;

  const userTeamsPermissions = await teamPermissionRepository.findByTeamId(teamId);

  const userPermissions = await userPermissionRepository.findById(userId);

  const allPages = await pageRepository.findPages(workspaceId);

  const permittedPages: IPage[] = allPages.filter(page =>
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
