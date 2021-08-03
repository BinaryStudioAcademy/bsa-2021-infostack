import { getCustomRepository } from 'typeorm';
import PageRepository from '../data/repositories/page-repository';
import UserRepository from '../data/repositories/user.repository';
import { Page } from '../data/entities/page';
import UserPermissionRepository from '../data/repositories/user-permission.repository';
import TeamPermissionRepository from '../data/repositories/team-permission-repository';
import { IRequestWithUser } from '../common/models/user/request-with-user.interface';

export const getPages = async (req: IRequestWithUser): Promise<Page[]> => {

  const { userId = 'c5fa3b2f-c4de-4dda-84e7-714ee852627e' , workspaceId = 'b6e959fd-09b3-42cd-8a30-90c31054198a' } = req; // it will work after req will have userId and workspaceId

  const pageRepository = getCustomRepository(PageRepository);
  const userRepository = getCustomRepository(UserRepository);
  const teamPermissionRepository = getCustomRepository(TeamPermissionRepository);
  const userPermissionRepository = getCustomRepository(UserPermissionRepository);

  // const teamId = '9e45c7d5-e608-44f0-b1e8-8ddf5e822902';

  const userTeamsIds = await userRepository.findUserTeams(userId);
  const teamId = userTeamsIds.teams[0].id; //hardcode for first teamId. How to make permissions from many teams
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
