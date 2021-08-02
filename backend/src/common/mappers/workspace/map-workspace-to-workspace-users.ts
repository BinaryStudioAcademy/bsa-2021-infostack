import { IWorkspaceUser } from '../../interfaces/workspace/workspace-user';
import { Workspace } from '../../../data/entities/workspace';

export const mapWorkspaceToWorkspaceUsers = (
  workspace: Workspace,
): IWorkspaceUser[] => {
  return workspace.userWorkspaces.map(({ user, role }) => {
    return {
      id: user.id,
      fullName: user.fullName,
      role,
      teams: user.teams.map((team) => team.name),
    };
  });
};
