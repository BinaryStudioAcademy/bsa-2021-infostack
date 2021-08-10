import { getCustomRepository } from 'typeorm';
import { IWorkspaceUser } from '../common/interfaces/workspace/workspace-user';
import { IWorkspace } from '../common/interfaces/workspace/workspace';
import { IWorkspaceCreation } from '../common/interfaces/workspace/workspace-creation';
import { mapWorkspaceToWorkspaceUsers } from '../common/mappers/workspace/map-workspace-to-workspace-users';
import WorkspaceRepository from '../data/repositories/workspace.repository';
import UserWorkspaceRepository from '../data/repositories/user-workspace.repository';
import UserRepository from '../data/repositories/user.repository';
import { RoleType } from '../common/enums/role-type';
import { HttpError } from '../common/errors/http-error';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';

export const getWorkspaceUsers = async (
  workspaceId: string,
): Promise<IWorkspaceUser[]> => {
  const workspaceRepository = getCustomRepository(WorkspaceRepository);
  const workspace = await workspaceRepository.findByIdWithUsers(workspaceId);

  return mapWorkspaceToWorkspaceUsers(workspace);
};

export const getWorkspace = async (workspaceId: string, userId: string): Promise<IWorkspace> => {
  const userWorkspace = await getCustomRepository(UserWorkspaceRepository)
    .findByUserIdAndWorkspaceIdDetailed(userId, workspaceId);
  const { workspace } = userWorkspace;

  return { id: workspace.id, title: workspace.name, role: userWorkspace.role };
};

export const getUserWorkspaces = async (userId: string): Promise<IWorkspace[]> => {
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const usersWorkspaces = await userWorkspaceRepository.findUserWorkspaces(
    userId,
  );
  const workspaces = [] as IWorkspace[];
  for (const userWorkspace of usersWorkspaces) {
    const workspace = userWorkspace.workspace;
    workspaces.push({ id: workspace.id, title: workspace.name });
  }
  return workspaces;
};

export const createWorkspace = async (
  userId: string,
  data: IWorkspaceCreation,
): Promise<IWorkspace> => {
  const workspaceRepository = getCustomRepository(WorkspaceRepository);
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const userRepository = getCustomRepository(UserRepository);
  const isTitleUsed = await workspaceRepository.findByName(data.title);
  if (isTitleUsed) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: HttpErrorMessage.WORKSPACE_ALREADY_EXISTS,
    });
  }

  const user = await userRepository.findById(userId);
  const workspace = workspaceRepository.create({ name: data.title });
  await workspaceRepository.save(workspace);
  const userWorkspace = userWorkspaceRepository.create({
    user,
    workspace,
    role: RoleType.ADMIN,
  });
  await userWorkspaceRepository.save(userWorkspace);
  return { id: workspace.id, title: workspace.name };
};
