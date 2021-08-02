import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { PageRepository } from '../data/repositories/page.repository';
import  UserRepository  from '../data/repositories/user.repository';
import { Page } from '../data/entities/page';
import { UserPermissionRepository } from '../data/repositories/user-permissions.repository';
import { PermissionOption } from '../data/entities/enums/permission-option';

export const createPage = async (userId: string, workspaceId: string, body: any):Promise<Page> => {
  const { parentPageId, ...pageContents } = body;

  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.createAndSave( userId, workspaceId, parentPageId, null, [pageContents]);
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findById(userId);
  const userPermissionRepository = getCustomRepository(UserPermissionRepository);
  await userPermissionRepository.createAndSave(user, page, PermissionOption.ADMIN);

  return page;
};

export const createVersionPage = async (req: Request): Promise<Page> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const userId = jwt.decode(token) as string;
  const workspaceId = req.cookies['workspaceId'];
  const pageContents = req.body;

  const pageRepository = getCustomRepository(PageRepository);
  return pageRepository.createAndSave( userId, workspaceId, null, null, pageContents);
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
