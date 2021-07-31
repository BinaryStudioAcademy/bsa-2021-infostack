import { getCustomRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { IWorkspace, IWorkspaceCreation } from 'infostack-shared/common/interfaces';
import UserRepository from '../data/repositories/user.repository';
import WorkspaceRepository from '../data/repositories/workspace.repository';
import UserWorkspaceRepository from '../data/repositories/user-workspace.repository';
import { UserRole } from '../data/entities/enums/user-role';

export const getAll = async (token: string): Promise<IWorkspace[]> => {
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const { userId }: any = jwt.decode(token);
  const usersWorkspaces = await userWorkspaceRepository.findUserWorkspaces(userId);
  const workspaces = [] as IWorkspace[];
  for (const userWorkspace of usersWorkspaces) {
    const workspace = userWorkspace.workspace;
    workspaces.push({ ...workspace, title: workspace.name });
  }
  return workspaces;
};

export const create = async (token: string, data: IWorkspaceCreation): Promise<IWorkspace> => {
  const workspaceRepository = getCustomRepository(WorkspaceRepository);
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const userRepository = getCustomRepository(UserRepository);
  const { userId }: any = jwt.decode(token);
  const user = await userRepository.findById(userId);
  const id = uuidv4();
  const workspace = workspaceRepository.create({ id, name: data.title });
  await workspaceRepository.save(workspace);
  const userWorkspace = userWorkspaceRepository.create({ user, workspace, role: UserRole.ADMIN });
  await userWorkspaceRepository.save(userWorkspace);
  return { ...workspace, title: workspace.name };
};

