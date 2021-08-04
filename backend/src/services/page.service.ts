import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { PageRepository } from '../data/repositories/page.repository';
import UserRepository from '../data/repositories/user.repository';
import { Page } from '../data/entities/page';
import { UserPermissionRepository } from '../data/repositories/user-permissions.repository';
import { PageContentRepository } from '../data/repositories/page-content.repository';
import { PermissionType } from '../common/enums/permission-type';
import TeamPermissionRepository from '../data/repositories/team-permission-repository';
import { IRequestWithUser } from '../common/models/user/request-with-user.interface';

export const createPage = async (userId: string, workspaceId: string, body: any):Promise<Page> => {
  const { parentPageId, title, content } = body;

  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.createAndSave( userId, workspaceId, parentPageId, null);
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findById(userId);
  const pageContentRepository = getCustomRepository(PageContentRepository);
  await pageContentRepository.createAndSave(userId, title, content, page.id);
  const userPermissionRepository = getCustomRepository(UserPermissionRepository);
  await userPermissionRepository.createAndSave(user, page, PermissionType.ADMIN);

  return page;
};

export const createVersionPage = async (req: Request): Promise<Page> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const userId = jwt.decode(token) as string;
  const workspaceId = req.cookies['workspaceId'];

  const pageRepository = getCustomRepository(PageRepository);
  return pageRepository.createAndSave( userId, workspaceId, null, null );
};

export const getPages = async (req: IRequestWithUser): Promise<Page[]> => {

  const { userId = 'c5fa3b2f-c4de-4dda-84e7-714ee852627e' , workspaceId = 'b6e959fd-09b3-42cd-8a30-90c31054198a' } = req; // it will work after req will have userId and workspaceId

  const pageRepository = getCustomRepository(PageRepository);
  const userRepository = getCustomRepository(UserRepository);
  const teamPermissionRepository = getCustomRepository(TeamPermissionRepository);
  const userPermissionRepository = getCustomRepository(UserPermissionRepository);

  // const teamId = '9e45c7d5-e608-44f0-b1e8-8ddf5e822902';

  const userTeamsIds = await userRepository.findUserTeams(userId);
  const teamId = userTeamsIds.teams.length ? userTeamsIds.teams[0].id : null; //hardcode for first teamId. How to make permissions from many teams

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
