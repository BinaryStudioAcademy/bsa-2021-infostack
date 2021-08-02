import { getCustomRepository } from 'typeorm';
import { IWorkspaceUser } from '../common/interfaces/workspace/workspace-user';
import { mapWorkspaceToWorkspaceUsers } from '../common/mappers/workspace/map-workspace-to-workspace-users';
import WorkspaceRepository from '../data/repositories/workspace.repository';

export const getUsers = async (
  workspaceId: string,
): Promise<IWorkspaceUser[]> => {
  const workspaceRepository = getCustomRepository(WorkspaceRepository);
  const workspace = await workspaceRepository.findByIdWithUsers(workspaceId);

  return mapWorkspaceToWorkspaceUsers(workspace);
};
