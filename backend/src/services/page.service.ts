import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { PageRepository } from '../data/repositories/page.repository';
import { Page } from '~/data/entities/page';

export const createPage = async (req:Request):Promise<Page> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const userId = jwt.decode(token) as string;
  const workspaceId = req.cookies['workspaceId'];
  const pageContents = req.body;

  const pageRepository = getCustomRepository(PageRepository);
  return pageRepository.createAndSave( userId, workspaceId, null, null, pageContents);
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

export const getPage = async (req: Request): Promise<Page> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const userId = jwt.decode(token) as string;
  const workspaceId = req.cookies['workspaceId'];
  const pageId = req.params.id;

  const pageRepository = getCustomRepository(PageRepository);
  return pageRepository.findOnePage( userId, workspaceId, pageId);
};
