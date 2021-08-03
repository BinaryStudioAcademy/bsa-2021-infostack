import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { PageRepository } from '../data/repositories/page.repository';
import  UserRepository  from '../data/repositories/user.repository';
import { Page } from '../data/entities/page';
import { UserPermissionRepository } from '../data/repositories/user-permissions.repository';
import { PageContentRepository } from '../data/repositories/page-content.repository';
import { PermissionType } from '../common/enums/permission-type';

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

export const getPages = async (req: Request): Promise<Page[]> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const userId = jwt.decode(token) as string;
  const workspaceId = req.cookies['workspaceId'];

  const pageRepository = getCustomRepository(PageRepository);
  return pageRepository.findPages( userId, workspaceId);
};

export const getPage = async (workspaceId: string, pageId: string): Promise<Page> => {
  const pageRepository = getCustomRepository(PageRepository);
  return pageRepository.findOnePage( workspaceId, pageId);
};
