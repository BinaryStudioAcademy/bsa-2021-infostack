import { v4 as uuidv4 } from 'uuid';
import { IWorkspace, IWorkspaceCreation } from 'infostack-shared/common/interfaces';
import WorkspaceRepository from '../data/repositories/workspace.repository';
import UserWorkspaceRepository from '../data/repositories/user-workspace.repository';
import RefreshTokenRepository from '../data/repositories/refresh-token.repository';
import { UserRole } from '../data/entities/enums/user-role';

export const getAll = async (token: string): Promise<IWorkspace[]> => {
  const workspaceRepository = new WorkspaceRepository();
  const userWorkspaceRepository = new UserWorkspaceRepository();
  const refreshTokenRepository = new RefreshTokenRepository();
  const { userId } = await refreshTokenRepository.findOne({ token });
  const { workspacesId } = await userWorkspaceRepository.find({ userId });
  const workspaces = [] as IWorkspace[];
  for (const workspaceId of workspacesId) {
    const workspace = await workspaceRepository.findOne({ workspaceId });
    workspaces.push({ ...workspace, title: workspace.name });
  }
  return workspaces;
};

export const create = async (token: string, data: IWorkspaceCreation): Promise<IWorkspace> => {
  const workspaceRepository = new WorkspaceRepository();
  const userWorkspaceRepository = new UserWorkspaceRepository();
  const refreshTokenRepository = new RefreshTokenRepository();
  const { userId } = await refreshTokenRepository.findOne({ token });
  const id = uuidv4();
  workspaceRepository.create({ id, name: data.title });
  const workspace = await workspaceRepository.findOne({ id });
  userWorkspaceRepository.create({ userId, workspaceId: workspace.id, role: UserRole.ADMIN });
  return { ...workspace, title: workspace.name };
};

