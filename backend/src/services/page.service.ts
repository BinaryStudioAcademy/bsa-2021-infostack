// import jwt from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import PageRepository from '../data/repositories/page-repository';
import { Request } from 'express';
// import UserRepository from '../data/repositories/user.repository';
import { Page } from '../data/entities/page';
import TeamRepository from '../data/repositories/team.repository';

export const getPages = async (req: Request): Promise<Page[]> => {
  const authHeader = req.headers['authorization'];
  // eslint-disable-next-line no-console
  console.log('authHeader', authHeader);
  // const token = authHeader && authHeader.split(' ')[1];
  const pageRepository = getCustomRepository(PageRepository);
  // const pages = [] as Page[];
  // const userRepository = getCustomRepository(UserRepository);
  const teamRepository = getCustomRepository(TeamRepository);
  // const userId: string = jwt.decode(token) as string;
  // const workspaceId = req.cookies['workspaceId'];
  // const user = await userRepository.findById(userId);
  const userId = 'c5fa3b2f-c4de-4dda-84e7-714ee852627e';
  // const userPages = await pageRepository.findPages(userId, workspaceId);
  const workspaceId = 'b6e959fd-09b3-42cd-8a30-90c31054198a';
  const allPages = await pageRepository.findPages(userId,  workspaceId);
  // eslint-disable-next-line no-console
  // console.log('allPages for workspaceId b6e959fd-09b3-42cd-8a30-90c31054198a', allPages);
  // const teamId = '9e45c7d5-e608-44f0-b1e8-8ddf5e822902';
  // const userTeamPermissions = await teamRepository.findUserTeamsPermissions(teamId);
  const userTeamIds = await teamRepository.findUserTeam(userId);
  // const userTeamPermissions = await teamRepository.findUserTeamsPermissions(teamId);
  // eslint-disable-next-line no-console
  console.log('userTeamIds', userTeamIds);
  // eslint-disable-next-line no-console
  // console.log('userTeamPermissions', userTeamPermissions);
  return allPages;
  // return pageRepository.findPages( userId, workspaceId );
};
