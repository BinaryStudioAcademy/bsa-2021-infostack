import { IWorkspaceUser } from '../../interfaces/workspace/workspace-user';
import { Workspace } from '../../../data/entities/workspace';

export const mapWorkspaceToWorkspaceUsers = (
  workspace: Workspace,
): IWorkspaceUser[] => {
  return workspace.userWorkspaces.map(({ user, role, status }) => {
    const { id, fullName, teams } = user;

    return {
      id,
      fullName,
      role,
      teams: teams.map((team) => team.name),
      status,
    };
  });
};
