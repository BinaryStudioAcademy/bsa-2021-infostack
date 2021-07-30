import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { IWorkspace, IWorkspaceCreation } from 'infostack-shared/common/interfaces';
import UserRepository from '../data/repositories/user.repository';
import WorkspaceRepository from '../data/repositories/workspace.repository';
import UserWorkspaceRepository from '../data/repositories/user-workspace.repository';
import { UserRole } from '../data/entities/enums/user-role';

export const getAll = async (token: string): Promise<IWorkspace[]> => {
  const userWorkspaceRepository = new UserWorkspaceRepository();
  const userId = jwt.decode(token) as string;
  const usersWorkspaces = await userWorkspaceRepository.findUserWorkspaces(userId);
  const workspaces = [] as IWorkspace[];
  for (const userWorkspace of usersWorkspaces) {
    const workspace = userWorkspace.workspace;
    workspaces.push({ ...workspace, title: workspace.name });
  }
  return workspaces;
};

export const create = async (token: string, data: IWorkspaceCreation): Promise<IWorkspace> => {
  const workspaceRepository = new WorkspaceRepository();
  const userWorkspaceRepository = new UserWorkspaceRepository();
  const userRepository = new UserRepository();
  const userId = jwt.decode(token) as string;
  const id = uuidv4();
  workspaceRepository.create({ id, name: data.title });
  const workspace = await workspaceRepository.findOne({ id });
  const user = await userRepository.findOne({ id: userId });
  userWorkspaceRepository.create({ user, workspace, role: UserRole.ADMIN });
  return { ...workspace, title: workspace.name };
};

