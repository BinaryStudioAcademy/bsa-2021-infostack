import { RoleType } from 'infostack-shared';
import { IWorkspaceUser } from '../common/interfaces/workspace/workspace-user';

export const getUsers = async (
  workspaceId: string,
): Promise<IWorkspaceUser[]> => {
  // TODO: remove mock
  return [
    { id: workspaceId, name: 'Some name', role: RoleType.ADMIN },
    { id: '2', name: 'Some name', role: RoleType.ADMIN, team: 'Team 1' },
  ];
};
