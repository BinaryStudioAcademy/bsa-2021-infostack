import { getCustomRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IWorkspace, IWorkspaceCreation } from 'infostack-shared/common/interfaces';
import UserRepository from '../data/repositories/user.repository';
import WorkspaceRepository from '../data/repositories/workspace.repository';
import UserWorkspaceRepository from '../data/repositories/user-workspace.repository';
import { UserRole } from '../data/entities/enums/user-role';

export const getAll = async (userId: string): Promise<IWorkspace[]> => {
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const usersWorkspaces = await userWorkspaceRepository.findUserWorkspaces(userId);
  const workspaces = [] as IWorkspace[];
  for (const userWorkspace of usersWorkspaces) {
    const workspace = userWorkspace.workspace;
    workspaces.push({ id: workspace.id, title: workspace.name });
  }
  return workspaces;
};

export const create = async (userId: string, data: IWorkspaceCreation): Promise<IWorkspace> => {
  const workspaceRepository = getCustomRepository(WorkspaceRepository);
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findById(userId);
  const id = uuidv4();
  const workspace = workspaceRepository.create({ id, name: data.title });
  await workspaceRepository.save(workspace);
  const userWorkspace = userWorkspaceRepository.create({ user, workspace, role: UserRole.ADMIN });
  await userWorkspaceRepository.save(userWorkspace);
  return { id: workspace.id, title: workspace.name };
};

