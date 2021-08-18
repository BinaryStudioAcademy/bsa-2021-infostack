import { IWorkspaceUser } from '../../interfaces/workspace';
import { Workspace } from '../../../data/entities/workspace';

export const mapWorkspaceToWorkspaceUsers = (
  workspace: Workspace,
): IWorkspaceUser[] => {
  return workspace.userWorkspaces.map(({ user, role, status }) => {
    const { id, fullName, email, teams } = user;

    return {
      id,
      fullName,
      email,
      role,
      status,
      teams: teams
        .filter((team) => team.workspaceId === workspace.id)
        .map((team) => team.name),
    };
  });
};
