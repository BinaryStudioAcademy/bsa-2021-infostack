import jwt from 'jsonwebtoken';
import { createConnection } from "typeorm";
import { Page } from '../data/entities/page';

export const createPage = async (req): Promise<any> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const userId = jwt.decode(token);
  const workspaceId = req.cookies['workspaceId'];
  const { title, content } = req.body;
  
  return createConnection().then(async connection => {

    const page = new Page();
    page.authorId = userId;
    page.workspaceId = workspaceId;
    page.parentPageId = null;
    page.childPages = null;
    page.name = title;
    page.content = content;
    const newPage = await connection.manager.save(page);

    return newPage;

  }).catch(error => {throw new Error(error)});
}

export const createVersionPage = async (req): Promise<any> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const userId = jwt.decode(token);
  const workspaceId = req.cookies['workspaceId'];
  const { title, content } = req.body;
  
  return createConnection().then(async connection => {

    const page = new Page();
    page.authorId = userId;
    page.workspaceId = workspaceId;
    page.parentPageId = null;
    page.childPages = null;
    page.name = title;
    page.content = content;
    const newPage = await connection.manager.save(page);

    return newPage;

  }).catch(error => {throw new Error(error)});
}

export const getPages = async (req): Promise<any> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const userId = jwt.decode(token);
  const workspaceId = req.cookies['workspaceId'];
  
  return createConnection().then(async connection => {
    const pageRepository = connection.getRepository(Page);

    const Pages = await pageRepository.find({ where: { authorId: userId, workspaceId: workspaceId } });

    return Pages;

  }).catch(error => {throw new Error(error)});
}

export const getPage = async (req): Promise<any> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const userId = jwt.decode(token);
  const workspaceId = req.cookies['workspaceId'];
  const pageId = req.params.id;
  
  return createConnection().then(async connection => {
    const pageRepository = connection.getRepository(Page);

    const Pages = await pageRepository.find({ where: { authorId: userId, workspaceId: workspaceId, id: pageId } });

    return Pages;

  }).catch(error => {throw new Error(error)});
}